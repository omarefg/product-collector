const proccess = require('process');
const argv = require('yargs').argv;

const searchers = {
    'Amazon': {
        name: 'Amazon scrapping',
        script: './amazon/index.js'
    },
    'ML':{
        name: 'Mercado Libre search',
    },
    'GTrends':{
        name: 'Google Trends search',
        script: './trends/index.js'
    }
};

if(argv._.length < 3){
    console.log(`run the script like: node index.js Amazon MX "PS4 for"`);
    proccess.exit(1);
}

if (searchers[argv._[0]]) {
    exec(searchers[argv._[0]], argv._[1], argv._[2], argv);
} else {
    console.error(`Not "${argv._[0]}" found in searchers`);
}

function exec (searcher, country, product, arguments) {
    if (searcher.script) {
        console.info(`Starting script for ${searcher.name} in country: ${country} and product ${product}`);
        require(searcher.script)(country, product, arguments);
    } else {
        console.error(`The ${searcher.name} has not script defined`);
    }
}