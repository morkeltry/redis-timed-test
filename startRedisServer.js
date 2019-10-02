require('dotenv').config()

/**
 * Start a local Redis server. Requires Redis installed on your machine.
 */

const RedisServer = require('redis-server')
const fs = require('fs')
const redisBinaryPath = process.env.LOCAL_REDIS_BINARY || '/usr/bin/redis-server'

const server = new RedisServer({
  port: 6379,
  bin: redisBinaryPath
})

if (!fs.existsSync(redisBinaryPath)) {
  console.log(`Redis not found in ${redisBinaryPath}. You need the Redis binary installed, eg by running sudo apt-get install redis-server.`)
  process.exit(1)
}

let isRunning = false
const start = async () => {
  try {
    await server.open()
    isRunning = true
    console.log(`Ready for connection to the Redis server bound to ${server.config.port}.`)
  } catch (e) {
    console.log('Error: ' + e.message)
    process.exit(1)
  }
}

// TODO: Add 'SIGTERM', 'SIGINT' once working
['exit', 'SIGUSR1', 'SIGUSR2', 'uncaughtException' ].forEach((eventType) => {
  process.on(eventType, async () => {
    if (isRunning) {
      isRunning = false
      console.log('Shutting down')
      await server.close()
    }
  })
})

module.exports = { start };
