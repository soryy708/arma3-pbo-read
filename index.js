const fs = require('fs');
const util = require('util');
const armaClassParser = require('arma-class-parser');
const js2xml = require('js2xmlparser');
const js2yaml = require('js-yaml');

class BinarizedPboError extends Error {
    constructor(...args) {
        super(...args);
    }
}

function parsePboString(pbo) {
    if (pbo.indexOf('class EditorData') === -1) {
        throw new BinarizedPboError();
    }
    pbo = pbo.split(/\0{16}/u)[2] || pbo.split(/\0{16}/u)[1]; // Missionfile .pbo appears to have regions split by 32 bytes of 0
    const content = pbo.slice(pbo.indexOf('class EditorData'), pbo.lastIndexOf('};') + '};'.length);
    const parsed = armaClassParser.parse(content);
    return parsed;
}

async function parsePbo(path) {
    const pbo = await util.promisify(fs.readFile)(path, 'utf8');
    return parsePboString(pbo);
}

(async()=>{
    if (process.argv.length <= 3) {
        console.error('Insufficient parameters');
        return;
    }

    const format = process.argv[2];

    const pboPath = process.argv[3];
    if (!pboPath) {
        console.error('Please specify path to unbinarized mission file PBO');
        return;
    }

    const parsed = await parsePbo(pboPath);

    switch(format) {
        case 'json':
            console.log(JSON.stringify(parsed));
            break;
        case 'jsonp':
            console.log(JSON.stringify(parsed, null, 2));
            break;
        case 'xml':
            console.log(js2xml.parse('body', parsed, {
                format: {
                    pretty: false,
                },
            }));
            break;
        case 'xmlp':
            console.log(js2xml.parse('body', parsed, {
                format: {
                    indent: '  ',
                },
            }));
            break;
        case 'yaml':
            console.log(js2yaml.safeDump(parsed));
            break;
    }

})()
    .catch(err => {
        console.error(err.stack);
    });
