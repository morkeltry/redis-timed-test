const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient()
// const client = redis.createClient({ url: process.env.REDIS_URL })
const { start } = require('./startRedisServer')



// Promisify Redis functions so we don't need to use callbacks

const zadd = promisify(client.zadd).bind(client)
const zrange = promisify(client.zrange).bind(client)
const zrevrange = promisify(client.zrevrange).bind(client)
const zrangebyscore = promisify(client.zrangebyscore).bind(client)
const del = promisify(client.del).bind(client)

// start()
//   .then (()=>  {
//     console.log('started')
//    // Do things
//   })


const addResponse = (key, status) => {
  zadd (key, Date.now(), status)
}

const getTail= (key, howMany) => {
  console.log('zrevrange:',key, -howMany, -1, 'withscores')
  return zrevrange (key, -howMany, -1, 'withscores')
}

const getRange = async (key, start, end) =>
  zrangebyscore (key, start, end, 'withscores')

const getSince = async (key, start = 0) =>
  getRange (key, start, Date.now(), 'withscores')

module.exports = { addResponse, getTail, getRange, getSince }
