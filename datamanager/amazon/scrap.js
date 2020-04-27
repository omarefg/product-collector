const puppeteer = require('puppeteer');

const currencyToNumber = currency => Number(currency.replace(/[^0-9.-]+/g,""));

async function run(base_url="https://www.amazon.com.mx", search="/s?k=tapabocas")
{
    const browser = await puppeteer.launch({args: ['--no-sandbox',]});
    try {
        const page = await browser.newPage();
        await page.goto(base_url + search);
        await page.waitForSelector('.s-asin', {timeout: 5000});
        const list = await page.$$('.s-result-list > .s-asin:not(.AdHolder)');
        const results = [];
        let i = 0, j = 0;
        do {
            if(!!list[i].$('.a-price')) {
                if(await list[i].$('.sg-row')) {
                    results.push(await list[i].$eval(
                        '.sg-row:nth-child(2)',
                        node => ({
                            page: node.querySelector('a.a-link-normal').getAttribute('href'),
                            image: node.querySelector('img').getAttribute('src')
                        })
                    ));
                } else {
                    results.push(await list[i].$eval(
                        '.a-section',
                        node => ({
                            page: node.querySelector('h2 > a.a-link-normal').getAttribute('href'),
                            image: node.querySelector('img').getAttribute('src')
                        })
                    ));
                }
                j++;
            }
            i++;
        } while(j < (3 < list.length ? 3 : list.length) && i < list.length)

        for (let i = 0; i < results.length; i++) {
            await page.goto(base_url + results[i].page);
            console.log(base_url + results[i].page);
            await page.waitForSelector('#productTitle', {timeout: 5000});

            const data = await page.evaluate(
                () => ({
                    name: document.querySelector('#productTitle').innerText,
                    brand: document.querySelector('#bylineInfo').innerText,
                    price: document.querySelector('#priceblock_ourprice,#priceblock_saleprice').innerText
                })
            );
            
            results[i] = Object.assign(results[i], data, {
                model:data.name,
                currency: 'MXN',
                condition: 'new',
                price: currencyToNumber(data.price)
            });
        }

        return results;

    } catch (e) {
        throw new Error(e)
    } finally {
        browser.close();
    }
}

module.exports = run;