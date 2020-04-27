const { config } = require('./config');
const MongoLib = require('./lib/mongo');
const amqp = require('amqplib/callback_api');

const queue = 'datamanager';

async function sendData(channel)
{
    try {
        const mongoDB = new MongoLib();
        
        const countries = await mongoDB.getAll('countries', {amazon: {$ne: false}});
        const criterias = await mongoDB.getAll('criteria');

        for (let country of countries) {
            for (let criteria of criterias) {
                await sendDataToQueue(channel, country, criteria, 'Amazon');
            }   
        }

        await sendDataToQueue(channel,{"_id":"MLM","default_currency_id":"MXN","name":"Mexico","amazon":{"base_url":"https://www.amazon.com.mx","search_route":"/s?k="},"ISO3166_alpha":"MX"}, {"_id":"5ea1bb3ba89c152430df6446","PCP900000000":{"keyWord":"iphone","categoryId":"PCC102020","filters":{"conditions":["new","used","refurbished"],"models":["iphone[ ]?11","iphone[ ]?11[ ]?pro","iphone[ ]?11[ ]?pro[ ]?max","iphone[ ]?x"],"variants":["64[ ]?gb","128[ ]?gb","256[ ]?gb"]}}}, 'ML');
        console.log('the end...');
        process.exit(0);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
}

async function sendDataToQueue(channel, country, criteria, target)
{
    const msg = JSON.stringify({country, criteria, target});
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