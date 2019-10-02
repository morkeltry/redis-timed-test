const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient()
// const client = redis.createClient({ url: process.env.REDIS_URL })
const { start } = require('./startRedisServer')

start();


module.exports = async () => {

}
