const scrap = require('./scrap');
const MongoLib = require('../lib/mongo');
const { config } = require('../config');
const sendData = require('../auth')

const mongoDB = new MongoLib();

async function start(country_id, criteria_id) {
    const date = new Date();

    try {
        
        const criteria_object = await mongoDB.get('criteria', criteria_id, {fields: {_id:0}});
        const country = await mongoDB.getOne('countries', {_id: country_id});
        const criteria_key = Object.keys(criteria_object)[0];
        const criteria_val = criteria_object[criteria_key];
        
        const search = criteria_val.keyWord.replace(' ', '+');
        const products = await scrap(country.amazon.base_url, country.amazon.search_route + search);

        await sendData({
            source: "PCAMZ",
            date: date,
            id: criteria_key,
            catalogue: "products",
            criteria: criteria_val,
            target: {
                endpoint: config.target,
                token: null
            },
            data: {
                site_id: "AmazonMX",
                query: criteria_val.keyWord,
                results: products
            }
        });

    } catch (e){
        console.log('-----error-----');
        console.log(e)
    } finally {
        return 1;
    }
}

module.exports = async (country, criteria) => {
    return await start(country, criteria);
}