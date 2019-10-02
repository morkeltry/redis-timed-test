## endpoint healthcheck

This app makes empty requests to an array of endpoints, interprets from the responses whether they are up or down, serialises the info used to make that decision in a short unique string and stores it in a redis store.

#### caveats
The app is in an unfinished state!
So, for example, the strings stored ar emessy and arbitrary. Though they should fulfil the function of storing uptime information.
There is very little error checking, even on results from remote APIs. Generally, responses returning an HTTP code will have meaningful results stored. However, the app performs a simple string search on the results fot 'pass', 'fail', 'up, 'down', which is by no means foolproof!
Request timeouts are *not* yet handled. I would check these by means of Promise.race with a setTimeout, but it is not implemented yet.

#### your local redis store
The app had a bug in starting the local redis server, which gave different results to the client. I didn't prioritise looking into this given the short timeframe.
As a workaround, start the redis server separately before the app.
Port/ URL is as default (`127.0.0.1:6379`)

#### good stuff
redis is super efficient. 'ZSETs' (sorted sets) even more so. The big advantage is in the complexity to search for the ends of the range to be returned - advantageous if the dataset is large.
The endpoint fetches were designed to be DRY and so extensible to add more endpoints with minimal extra effort. This also didn't take much extra effort to implement.
Other than the comments and this README, the app was almost within the two hours! (I would have kept to exactly two, but the final feature - (`withHandler`) was the one where I hit bugs, and they took a while to squash ;)
