const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

const uri = `https://www.publix.com/pd/publix-chicken-tender-sub/BMO-DSB-100011?ch=18.2.1.&oeo=true`;
const cookie = `PublixStore=446%7COrmond%2BTowne%2BSquare`;

const options = {
  uri: uri, 
  method: 'GET',
  headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
          'Cookie': cookie,
          'Accept': '/',
          'Connection': 'keep-alive'
  }
};

request(options, 
(error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const wholeSub = $('#content_1_3fourthswidth2colright_1_ProductQuantity_radio2Content');
    const onSale = !wholeSub.children('span').text().includes("$8.99");
    const yes = chalk.bold.green(`YES THEY ARE!!!`);
    const no = chalk.bold.red(`Not this week my dude :(`)

    onSale 
      ? console.log(yes)
      : console.log(no);
  } else {
    console.log(error);
  }
});