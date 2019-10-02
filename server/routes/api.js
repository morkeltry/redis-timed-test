const { getTail, getRange, getSince } = require('../../redisClient')

// NB - mutates array!
// This JSON processor converts, eg [A,a,B,b,C,c,D,d] to [{timestamp: a, status: A}, timestamp: b, status: B}, {timestamp: c, status: C}, timestamp: d, status: D}]
const pairOff = arr => {
  if (arr.length < 2)
    return []
  const pair = arr.splice(0,2)
  return pairOff(arr).concat( {
    timestamp : pair[1],
    status : pair[0]
  })
}

// wrap and innerFunc (call to redis) in a server response
const withHandler = (innerFunc, paramNames, jsonProcessor= pairOff ) => (req, res) => {
  // optional URL params - the only route currently with optional params is /recent
  const defaults = { count : 50 }
  // quick and dirty input validation - if it's number, it passes
  const params = paramNames.map (name=> (1*req.params[name] || defaults[name]) )

  innerFunc (req.params.endpoint, ...params)
    .then (jsonProcessor)
    .then (results=> {
      res.type('application/json')
      res.status(200)
      res.send(results)
    })
    .catch (err=> {
      console.log('ERROR: ', err)
    });
}

const getResults = {
  recent : withHandler (getTail, ['count']),
  range : withHandler (getRange, ['start', 'end']),
  since : withHandler (getSince, ['start'])
}

module.exports = getResults;
