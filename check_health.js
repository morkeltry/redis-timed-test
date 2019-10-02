
const fetch = require('node-fetch');

const endpoints = require ('./health_endpoints.js');

const basicGet = (endpoint, cb) =>  {
  cb = cb || endpoint.serialise
  fetch (endpoint.url, endpoint.options)
    .then (cb);
}

const testAll = ()=> {
  endpoints.forEach (testOne)
}

const testOne = key =>  {
  const endpoint =
    (key.url) ?
      key
    :
      endpoints.find(endpoint=> endpoint.name===key);
    if (!endpoint)
      throw newError (`Unknown endpoint ${key}`);

  basicGet (endpoint, endpoint.serialise);
}

testAll();
