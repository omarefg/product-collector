const puppeteer = require('puppeteer');
const fs = require('fs');
const MongoLib = require('../lib/mongo');
const { config } = require('../config');
const sendData = require('../auth')

const mongoDB = new MongoLib();

async function start(country_id, criteria_id) {
    const date = new Date();
    const browser = await puppeteer.launch({
        args: [
          // Required for Docker version of Puppeteer
          '--no-sandbox',
          '--disable-setuid-sandbox',
          // This will write shared memory files into /tmp instead of /dev/shm,
          // because Docker’s default for /dev/shm is 64MB
          '--disable-dev-shm-usage'
        ]
      });
    try {
        
        const criteria_object = await mongoDB.get('criteria', criteria_id, {fields: {_id:0}});
        const country = await mongoDB.getOne('countries', {_id: country_id});
        const criteria_key = Object.keys(criteria_object)[0];
        const criteria_val = criteria_object[criteria_key];
        
        const search = criteria_val.keyWord.replace(' ', '+');

        const page = await browser.newPage();
        console.log(`${country.amazon.base_url}${country.amazon.search_route}${search}`);
        await page.goto(`${country.amazon.base_url}${country.amazon.search_route}${search}`);
        const products = [];
        page.waitFor(2000);

        const results = await page.evaluate(() => {
            const list = document.querySelectorAll('.s-result-list > .s-asin:not(.AdHolder)');
            const results = [];
            let i = 0, j = 0;
            do {
                if(!!list[i].querySelector('.a-price')) {
                    const image = list[i].querySelector('.sg-row:nth-child(2)').querySelector('img');
                    const product_page = list[i].querySelector('.sg-row:nth-child(2)').querySelector('a.a-link-normal');
                    results.push({
                        image: image ? image.getAttribute('src') : null,
                        page: product_page ? product_page.getAttribute('href') : null
                    });
                    j++;
                }
                i++;
            } while(j < (3 < list.length ? 3 : list.length));
            return results;
        });

        for (let i = 0; i < results.length; i++) {
            await page.goto(country.amazon.base_url + results[i].page);
            console.log(country.amazon.base_url + results[i].page);
            await page.waitFor(1000);
            const product_name = await page.evaluate(() => document.querySelector('#productTitle') ? document.querySelector('#productTitle').innerText : null );
            const product_brand = await page.evaluate(() => document.querySelector('#bylineInfo') ? document.querySelector('#bylineInfo').innerText : null );
            const product_price = await page.evaluate(() => {
                let price = document.querySelector('#priceblock_ourprice') ? document.querySelector('#priceblock_ourprice').innerText : null
                if(price) return price;
                return document.querySelector('#priceblock_saleprice').innerText;
            });

            let result = {
                brand: product_brand,
                price: currencyToNumber(product_price),
                name: product_name,
                model: product_name,
                currency: 'MXN',
                condition: 'new',
                ...results[i]
            };
            console.log(result);
            products.push(result);
        }

        await sendData({
            source: "PCAMZ",
            date: date,
            id: criteria_key,
            catalogue: "products",
            criteria: criteria_val,
            target: {
                endpoint: config.backendProductsApi,
                token: null
            },
            data: {
                site_id: "AmazonMX",
                query: criteria_val.keyWord,
                results: products
            }
        });

        await browser.close();
    } catch (e){
        console.log('-----error-----');
        console.log(e)
        await browser.close();
    }

    return 1;
}

const currencyToNumber = currency => Number(currency.replace(/[^0-9.-]+/g,""));

module.exports = async (country, criteria) => {
    return await start(country, criteria);
}