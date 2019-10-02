const serialiseJsonResponse = async response =>  {
  let result = ``;
  result += response.status;
  result += await response.json().status || '';

  if (response.status == 200)
    up = true;
  if (response.status > 200)
    up = false;

  result = up?
    'UP: '+result
    : 'DOWN: '+result ;

  console.log(result)
  return result;
}

const serialiseTextResponse = async response =>  {
  let result = ``;
  let up;
  result += response.status;
  const text = await response.text();
  const statusMsg = text.slice(text.indexOf('status'),text.indexOf('status')+12)
    .toUpperCase();
  result += statusMsg || '';

  if (response.status == 200)
    up = true;
  if (response.status > 200)
    up = false;

  if (statusMsg
    && (statusMsg.includes('pass') || statusMsg.includes('up'))
    && (!statusMsg.includes('down') || statusMsg.includes('fail')))
      up = true
        else
      up = false;

  result = up?
    'UP: '+result
    : 'DOWN: '+result ;

  console.log(result)
  return result;
}

module.exports = [
  {
    url : "https://u0e8utqkk2.execute-api.eu-west-2.amazonaws.com/dev/email-service/health",
    serialise : serialiseJsonResponse
    // Will always report as being up
    // Requires a GET request
    // Returns HTTP status code 200
    // Returns JSON with body: {"status": "up"}
  },
  {
    url : "https://u0e8utqkk2.execute-api.eu-west-2.amazonaws.com/dev/payment-gateway/health",
    serialise : serialiseTextResponse
    // Will always report as being down
    // Requires a GET request
    // Returns HTTP status code 500
    // Returns XML with body: <health><status>down</status></health>
  },
  {
    url : "https://u0e8utqkk2.execute-api.eu-west-2.amazonaws.com/dev/microservice-controller/health",
    options : { method : "post" },
    serialise : serialiseTextResponse
    // Will report as being up and down every 5 minutes
    // Requires a POST request
    // Returns HTTP status code 200 or 500
    // Returns text with body status: pass or status: fail
  },
  {
    url : "https://u0e8utqkk2.execute-api.eu-west-2.amazonaws.com/dev/transaction-monitor/health",
    serialise : serialiseJsonResponse
    // Will report as being up and down every now and again
    // Requires a GET request
    // When the service is UP it will respond with JSON and a 200 status code: {"status": "up"}
    // When the service is DOWN it will timeout. The message and details are controlled by our hosting provider (AWS or Azure).
  }
]
