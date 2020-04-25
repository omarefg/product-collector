const puppeteer = require('puppeteer');
const fs = require('fs');
const MongoLib = require('../lib/mongo');

const mongoDB = new MongoLib();

async function start(country_id, keyword_id) {
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
        
        const keyword = await mongoDB.get('keywords', keyword_id);
        const country = await mongoDB.getOne('countries', {_id: country_id});
        const search = keyword.keyword.replace(' ', '+');

        const page = await browser.newPage();
        console.log(`${country.amazon.base_url}${country.amazon.search_route}${search}`);
        await page.goto(`${country.amazon.base_url}${country.amazon.search_route}${search}`);
        const products = [];
        page.waitFor(2000);

        const results = await page.evaluate(() => {
            const list = document.querySelectorAll('.s-result-list > .s-asin');
            const results = [];
            for (let i = 0; i < (3 < list.length ? 3 : list.length); i++) {
                const image = list[i].querySelector('.sg-row:nth-child(2)').querySelector('img');
                const product_page = list[i].querySelector('.sg-row:nth-child(2)').querySelector('a.a-link-normal');
                results.push({
                    image: image ? image.getAttribute('src') : null,
                    page: product_page ? product_page.getAttribute('href') : null
                });
            }
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
                currency: 'MXN',
                ...results[i]
            };
            console.log(result);
            products.push(result);
        }
        //TODO push to normalizer API
        const result = {
            criteria: keyword,
            source: "AmazonMX",
            data: products,
            date: date,
            target: {
                endpoint: "",
                token: ""
            }
        }

        console.log('....',result);

        fs.writeFileSync(`database/Amazon-${country._id}-product-${ Date.now() }.json`, JSON.stringify(result));
        await browser.close();
    } catch (e){
        console.log('-----error-----');
        console.log(e)
        await browser.close();
    }

    return 1;
}

const currencyToNumber = currency => Number(currency.replace(/[^0-9.-]+/g,""));

module.exports = async (country, keyword) => {
    return await start(country, keyword);
}