const googleTrends = require('google-trends-api');
const fs = require('fs');

async function start(country, product, firstRun) {
  const date = new Date();
  const startTime = new Date();
  const searchParameters = {
    keyword: product,
    geo: country,
  }

  startTime.setDate(startTime.getDate()-8)
  startTime.setHours(0);
  startTime.setMinutes(0);
  startTime.setSeconds(0);
  startTime.setMilliseconds(0);

  if (firstRun) searchParameters.startTime = startTime;

  try {
    const interestOverTime = JSON.parse(await googleTrends.interestOverTime(searchParameters));
    
    const interestByRegion = JSON.parse(await googleTrends.interestByRegion(searchParameters));

    const relatedQueries = JSON.parse(await googleTrends.relatedQueries(searchParameters));

    const relatedTopics = JSON.parse(await googleTrends.relatedTopics(searchParameters));

    const result = {
      source: 'PCGTrends',
      date: date,
      //TODO: get id from criteria or product
      id: "PCP900000000",
      data :{
          site_id: "GoogleTrends",
          query: product,
          results: {
            interestOverTime,
            interestByRegion,
            relatedQueries,
            relatedTopics,
          },
      }
  }
  fs.writeFileSync(`database/GTrends-${country}-product-${ Date.now() }.json`, JSON.stringify(result));

  } catch(e) {
    console.error(e);
  }
}

module.exports = (country, product, arguments) => {
  start(country, product, arguments.firstRun === undefined);
}