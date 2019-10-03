## endpoint healthcheck

This app makes empty requests to an array of endpoints, interprets from the responses whether they are up or down, serialises the info used to make that decision in a short unique string and stores it in a redis store.

### install
* Clone the repo , `cd` into its directory and and run `npm i`
* Ensure `redis-server` is installed and able to be started at the default URL (`localhost:6379`). See note below

### run
* `npm run start`
* System performs a health check on all endpoints every 30s. Ideally it will perform at least 50 checks. You can change the interval at the end of `check_health.js`.
* Test the routes:
```
localhost:endpoint/recent
localhost:endpoint/recent/count
localhost:endpoint/range/start/end
localhost:endpoint/since/start

```
where `endpoint` is one of `'email-service'`, `'payment-gateway'`, `'microservice-controller'`, `'transaction-monitor'`,
`count` is a number of records to return and `start` and `end` are Unix timestamps in seconds.
NB 1: The `localhost:endpoint/all` route is not yet implemented.
NB 2: There is no internal error handling to handle the case where the redis server times out. If routes timeout, it is likely the redis server is not responding.

#### caveats
The app is in an unfinished state!
So, for example, the status strings stored and returned are messy and arbitrary. Though they should fulfil the function of storing uptime information.
There is very little error checking, even on results from remote APIs. Generally, responses returning an HTTP code will have meaningful results stored. However, the app performs a simple string search on the results fot 'pass', 'fail', 'up, 'down', which is by no means foolproof!
Request timeouts are *not* yet handled. I would check these by means of Promise.race with a setTimeout, but it is not implemented yet.

#### your local redis store
The app had a bug in starting the local redis server, which gave different results to the client. I didn't prioritise looking into this given the short timeframe.
As a workaround, redis-server is started form `package.json`.
Port/ URL is as default (`127.0.0.1:6379`)

#### good stuff
redis is super efficient. 'ZSETs' (sorted sets) even more so. The big advantage is in the complexity to search for the ends of the range to be returned - advantageous if the dataset is large.
The endpoint fetches were designed to be DRY and so extensible to add more endpoints with minimal extra effort. This also didn't take much extra effort to implement.
Other than the comments and this README, the app was almost within the two hours! (I would have kept to exactly two, but the final feature - (`withHandler`) was the one where I hit bugs, and they took a while to squash ;)
