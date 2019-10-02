
const fetch = require('node-fetch');

const testMe = "https://u0e8utqkk2.execute-api.eu-west-2.amazonaws.com/dev/transaction-monitor/health";
let count = 0;

const basicGet = (endpoint, cb) =>  {
  fetch (endpoint.url, endpoint.options)
    .then (cb);
}

const endpoint = {url:testMe};

setInterval (()=> {
// setTimeout (()=> {
  console.log(++count);
  basicGet (endpoint, res=> {
    if (res.status!== 200){
      console.log(res);
      console.log(res.body);
      console.log(res.json());
      console.log(res.text());
    }
  });
}, 45000)
