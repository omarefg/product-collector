const chalk = require('chalk');
const debug = require('debug')('app:scripts:keywords');
const MongoLib = require('../../lib/mongo');
const { keywordsMock } = require('../../utils/mocks/keywordsMock');

async function seedKeywords() {
  try {
    const mongoDB = new MongoLib();

    const promises = keywordsMock.map(async keyword => {
      await mongoDB.create('keywords', keyword);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} keywords have been created succesfully`));
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedKeywords();
