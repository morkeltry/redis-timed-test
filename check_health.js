
const fetch = require('node-fetch');

const endpoints = require ('./health_endpoints.js');
const { addResponse, getTail, getRange } = require('./redisClient.js')

const basicGet = (endpoint, cb) =>  {
  cb = cb || endpoint.serialise
  fetch (endpoint.url, endpoint.options)
    .then (cb);
}

const addResultsToStore = ()=>{}

const testOne = key =>  {
  const endpoint =
    (key.url) ?
      key
    :
      endpoints.find(endpoint=> endpoint.name===key);
    if (!endpoint)
      throw newError (`Unknown endpoint ${key}`);

  basicGet (endpoint, async response=> {
    console.log('adding', endpoint.name)
    const serialised = await endpoint.serialise(response)
    console.log(typeof endpoint.name, serialised );
    addResponse (endpoint.name, serialised);
  });
}

const testAll = ()=> {
  endpoints.forEach (testOne)
}

setInterval ( async()=> {
  testAll()
}, 1500 )
