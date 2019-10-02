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
// const zrem = promisify(client.zrem).bind(client)

// store a serialised status string in the redis store. key is intended to be the 'name' or other identifier of the observed endpoint.
const addResponse = (key, status) => {
  zadd (key, Date.now(), status)
}

// retrieve the last howMany records from the store
const getTail= (key, howMany) =>
  zrevrange (key, -howMany, -1, 'withscores')

// retrieve records by range, start & end being Unix second timestamps
const getRange = async (key, start, end) =>
  zrangebyscore (key, start, end, 'withscores')

const getSince = async (key, start = 0) =>
  getRange (key, start, Date.now(), 'withscores')

module.exports = { addResponse, getTail, getRange, getSince }
