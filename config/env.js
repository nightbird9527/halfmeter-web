const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const paths = require('./paths');

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    throw new Error(
        'The NODE_ENV environment variable is required but was not specified.'
    );
}

const dotenvFilePaths = [
    `${paths.dotenv}.${NODE_ENV}.local`,
    NODE_ENV !== 'test' && `${paths.dotenv}.local`,
    `${paths.dotenv}.${NODE_ENV}`,
    paths.dotenv,
].filter(Boolean);
dotenvFilePaths.forEach(dotenvFilePath => {
    if (fs.existsSync(dotenvFilePath)) {
        const dotenvResult = dotenv.config({ path: dotenvFilePath });
        if (dotenvResult.error) {
            throw dotenvResult.error
        }
        dotenvExpand.expand(dotenvResult);
    }
})

