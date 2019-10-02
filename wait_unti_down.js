// This file is unnecessary - used only to get sample output from this endpoint.
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
  basicGet (endpoint, async res=> {
    if (res.status!== 200){
      // console.log(res);
      // console.log(res.body);
      const json = await res.json()
      // const text = await res.text()
      console.log(json);
      // console.log(text);
    }
  });
}, 45000)
