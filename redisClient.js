const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient()
// const client = redis.createClient({ url: process.env.REDIS_URL })
const { start } = require('./startRedisServer')



// Promisify Redis functions so we don't need to use callbacks

const zadd = promisify(client.zadd).bind(client)
const zrange = promisify(client.zrange).bind(client)
const zrangebyscore = promisify(client.zrangebyscore).bind(client)
const del = promisify(client.del).bind(client)

// start()
//   .then (()=>  {
//     console.log('started')
//    // Do things
//   })


const addResponse = (key, status) =>
  zadd (key, Date.now(), status)

const getTail = async () => {

}

const getRange = async () => {

}

console.log('will attempt ZADD')
zadd ('ting', 454, 'status')
  .then (console.log)
addResponse ('abcde','defgh')
  .then (console.log)


module.exports = { addResponse, getTail, getRange }
