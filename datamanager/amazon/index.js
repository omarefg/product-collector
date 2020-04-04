const puppeteer = require('puppeteer');
const argv = require('yargs').argv
const fs = require('fs');
const base_url = 'https://www.amazon.com.mx';

async function start(search) {
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.goto(`${base_url}/s?k=${search}`);
        const products = [];

        const results = await page.evaluate(() => {
            const list = document.querySelectorAll('.s-result-list > div');
            const results = [];
            for (let i = 0; i < (3 < list.length ? 3 : list.length); i++) {
                const image = list[i].querySelector('img');
                const product_page = list[i].querySelector('a.a-link-normal');
                results.push({
                    image: image ? image.getAttribute('src') : null,
                    page: product_page ? product_page.getAttribute('href') : null
                });
            }
            return results;
        });

        for (let i = 0; i < results.length; i++) {
            await page.goto(base_url + results[i].page);
            console.log(base_url + results[i].page);
            await page.waitFor(1000);
            const product_name = await page.evaluate(() => document.querySelector('#productTitle') ? document.querySelector('#productTitle').innerText : null );
            const product_brand = await page.evaluate(() => document.querySelector('#bylineInfo') ? document.querySelector('#bylineInfo').innerText : null );
            const product_price = await page.evaluate(() => document.querySelector('#priceblock_ourprice') ? document.querySelector('#priceblock_ourprice').innerText : null );

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
        fs.writeFileSync(`database/product-${ Math.round(new Date() / 1000)}.json`, JSON.stringify(products));
    } catch (e){
        console.log('-----error-----');
        console.log(e)
    } finally {
        await browser.close();
    }
}

if(argv.search && argv.search != '') {
    console.log(`to search "${argv.search}"`);
    start(argv.search.replace(' ', '+'));
} else {
    console.log('run the command with search argument')
}

const currencyToNumber = currency => Number(currency.replace(/[^0-9.-]+/g,""));
