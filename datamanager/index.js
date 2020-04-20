const proccess = require('process');
const argv = require('yargs').argv;

const searchers = {
    'Amazon': {
        name: 'Amazon scrapping',
        script: './amazon/index.js'
    },
    'ML':{
        name: 'Mercado Libre search',
        script: './mercadoLibre/index.js'
    },
    'GTrends':{
        name: 'Google Trends search',
        script: './trends/index.js'
    }
};

if(argv._.length < 3){
    console.log(`run the script like: node index.js Target CountryID KeywordID`);
    console.log(`Targets are: Amazon, ML, GTreends`);
    console.log(`CountryID is the id in the countries table`);
    console.log(`KeywordID is the id in the keywords table`);
    proccess.exit(1);
}

if (searchers[argv._[0]]) {
    exec(searchers[argv._[0]], argv._[1], argv._[2], argv);
} else {
    console.error(`Not "${argv._[0]}" found in searchers`);
}

function exec (searcher, country, keyword, arguments) {
    if (searcher.script) {
        console.info(`Starting script for ${searcher.name} in country: ${country} and keyword ${keyword}`);
        require(searcher.script)(country, keyword, arguments);
    } else {
        console.error(`The ${searcher.name} has not script defined`);
    }
}

/*
keywords = [
{
    keyword: 'iphone', id: 00000
}   ,
{
    keyword: 'android', id: 00001
}
]

keywords.forEach(function(keyword){
    RTCPeerConnection('job', {keyword, country: 'MX'});
})

child.process('node productcolletor/index.js', [...aargs])
*/