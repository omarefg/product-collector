const chalk = require('chalk');
const debug = require('debug')('app:scripts:categories');
const MongoLib = require('../../lib/mongo');
const { categoriesMock } = require('../../utils/mocks/categoriesMock');

async function seedCategories() {
  try {
    const mongoDB = new MongoLib();

    const promises = categoriesMock.map(async category => {
      await mongoDB.create('categories', category);
    });
    await Promise.all(promises);
    debug(chalk.green(`${promises.length} categories have been created succesfully`));
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    debug(chalk.red('error'));
    process.exit(1);
  }
}

seedCategories();
