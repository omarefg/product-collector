const child_process = require('child_process');
const { config } = require('./config');

const amqp = require('amqplib/callback_api');

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    process.exit(0);
});

amqp.connect(`amqp://${config.rabbitMQ}`, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'datamanager';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            try {
                const data = JSON.parse(msg.content.toString());

                const command = `node ${process.cwd()}/index.js ${data.target} ${data.country._id} "${data.criteria._id}"`;
                console.log(systemSync(command));
            } catch(error) {
                console.log(error);
            }
        }, {
            noAck: true
        });
    });
});


function systemSync(cmd) {
    console.log(`calling: ${cmd}`);
    try {
      return child_process.execSync(cmd).toString();
    } 
    catch (error) {
      console.error(error)
    }
};
  