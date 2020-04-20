const { config } = require('./config');
const MongoLib = require('./lib/mongo');
const amqp = require('amqplib/callback_api');

const queue = 'datamanager';

async function sendData(channel)
{
    try {
        const mongoDB = new MongoLib();
        
        countries = await mongoDB.getAll('countries', {amazon: {$ne: false}});
        keywords = await mongoDB.getAll('keywords');

        for (let country of countries) {
            for (let keyword of keywords) {
                await sendDataToQueue(channel, country, keyword, 'Amazon');
            }   
        }

        await sendDataToQueue(channel, {"_id":"MLM","default_currency_id":"MXN","name":"Mexico","amazon":{"base_url":"https://www.amazon.com.mx","search_route":"/s?k="},"ISO3166_alpha":"MX"}, {"_id":"5e9db2d01ef50b003344ba0e","date":"2020-01-01","keyword":"xbox","country":"CO","categoryName":"Categoria","origin":"google-trends","visits":1420}, 'ML');
        console.log('the end...');
        process.exit(0);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
}

async function sendDataToQueue(channel, country, keyword, target)
{
    const msg = JSON.stringify({country, keyword, target});
    return await new Promise((resolve, reject) => {
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
        setTimeout(() => resolve(true),1000);
    })
}

function start()
{
    amqp.connect(`amqp://${config.rabbitMQ}`, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        
        channel.assertQueue(queue, {
            durable: false
        });

        sendData(channel);
    });
});
}

start();