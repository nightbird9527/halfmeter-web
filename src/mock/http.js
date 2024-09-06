import http from 'http';
import chalk from 'chalk';
import * as interfaceMap from './interfaceMap';
import {SuccessModel, ErrorModel} from './resModel';

const PORT = 3001;
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true,
    'Cache-Control': 'no-cache,no-store', // clear cache
  });

  if (req.method === 'POST') {
    let postData = '';
    req.addListener('data', (chunk) => {
      postData += chunk;
    });
    req.addListener('end', () => {
      console.log(`request url => ${req.url}`);
      postData = JSON.parse(postData);
    });

    const originData = interfaceMap[req.url] ? interfaceMap[req.url] : {};
  }
});

server.listen(PORT, () => {
  console.log(chalk.bgCyan(`Mock server is running at localhost:${PORT}`));
});
