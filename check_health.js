
const fetch = require('node-fetch');

const endpoints = require ('./health_endpoints.js');
const { addResponse, getTail, getRange } = require('./redisClient.js')

// TODO: Promisify
const basicGet = (endpoint, cb) =>  {
  cb = cb || endpoint.serialise
  fetch (endpoint.url, endpoint.options)
    .then (cb);
}

// From the parameter passed (endpoint object, or name thereof), identify the endpoint and call basicGet upon it.
const testOne = key =>  {
  const endpoint =
    (key.url) ?
      key
    :
      endpoints.find(endpoint=> endpoint.name===key);
    if (!endpoint)
      throw newError (`Unknown endpoint ${key}`)

  basicGet (endpoint, async response=> {
    // console.log('adding', endpoint.name)
    const serialised = await endpoint.serialise(response)
    addResponse (endpoint.name, serialised)
  });
}

const testAll = ()=> {
  endpoints.forEach (testOne)
}

setInterval (testAll, 30000)
