# http-simulator

A http server written in node.js that returns a random http status code and html. You can also pass a specific http status code.

## Random http status

```
http://127.0.0.1:7777/
```
Returns a random http status code, one of `[200, 307, 500, 502, 503, 504]`. There is also a special case of simulating a http timeout, where the server drops the request and never sends back a response. The status code `307` is a temporary redirect which returns a `Location` header which the client should follow.


## Specific http status

```
http://127.0.0.1:7777/:code
```

Returns the passed http status code. Must be one of `[200, 307, 500, 502, 503, 504, 555]`. The special case *(555)* simulates a http timeout, where the server drops the request and never sends back a response. The status code `307` is a temporary redirect which returns a `Location` header which the client should follow.
