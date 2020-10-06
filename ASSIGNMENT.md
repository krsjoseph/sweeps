## Assignment 1: Cloudflare Worker

Take the following HTML file:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Assignment 1</title>
    <script>
      const name = 'your name';
      const quote = 'your favorite quote';
    </script>
  </head>
  <body>
    <script src="{{worker_address}}"></script>
  </body>
</html>
```

1. Replace the values of `name` and `quote` with your name and favorite quote.
2. Create a free [Cloudflare Worker](https://workers.cloudflare.com/) account, and setup [Wrangler](https://developers.cloudflare.com/workers/tooling/wrangler).
3. Generate a new Worker using Wrangler and publish it to a free subdomain of your choice at `*.workers.dev`.
4. Set the `src` attribute of the `script` element to your Worker address.
5. Program your Worker to do the following:
   1. Check if the cookies `name` and `quote` are set on your Worker domain.
   2. If they are set, respond with JavaScript code that does the following:
      - Log the two cookies to the browser console
      - Set the two cookies as first-party cookies using `document.cookie`, and prefix the cookie names with `local_` (eg. `name` should be `local_name`).
   3. If the cookies are not set, respond with JavaScript code that does the following:
      - Read the `name` and `quote` variables, and `POST` their values to your Worker.
      - Answer the `POST` Request with an HTTP Response that sets both variables as two separate cookies on your Worker domain, with the furthest possible expiry date. Also, print the visitor IP address to the browser console.

## Assignment 2: HTTP Forwarder

You're launching a spaceship to a short mission in space and you want to track its progress, but you have multiple dashboard services you'd like to send the data to, and they all expect a different data scheme.

Create a Node.js based HTTP server that processes HTTP requests containing JSON. The server should read the `events` array, adapts the scheme of each event to the different services, and initiate new HTTP requests to the services endpoints.

Your server should process the following request:

```sh
curl --request POST \
  --url http://localhost:1337/ \
  --data '{
	"events": [
		{
			"t": "lift-off",
			"engines": 4,
			"fuel": 78,
			"successful": true,
			"temperature": {
				"engine": 80,
				"cabin": 31
			},
			"timestamp": 1595244264059,
			"lat-lon": [
				-16.270183,
				168.110748
			]
		},
		{
			"t": "landing",
			"engines": 1,
			"fuel": 26,
			"successful": true,
			"temperature": {
				"engine": 80,
				"cabin": 31
			},
			"timestamp": 1595524813145,
			"lat-lon": [
				51.769455,
				182.818610
			],
			"successful": true
		}
	]
}'
```

Each object in the `events` array should be sent as a separate request to each of the following 3 services. Adapt the data scheme according to each service restrictions:

1. Spaceship:
   - Endpoint: `https://sweeps.proxy.beeceptor.com/spaceship/r`
   - HTTP Method: `POST`
   - Restrictions:
     - No nested data. For example, convert properties like `"temperature": { "engine": 80, "cabin": 31 }` to `"temperature.engine": 80, "temperature.cabin": 31`, and `"lat-lon": [51.769455, 182.818610]` to `"lat-lon": "51.769455,182.818610"`
2. M0nit0r:
   - Endpoint: `https://sweeps.proxy.beeceptor.com/m0nit0r.com/track_ship/{{timestamp}}`
   - HTTP Method: `PUT`
   - Restrictions:
     - The `timestamp` property should not be sent in the request body, but should be used for building the URL (for example, `https://sweeps.proxy.beeceptor.com/m0nit0r.com/track_ship/1595245629`)
     - Timestamp should be sent in seconds format, not milliseconds.
3. SkyAnalytics:
   - Endpoint: `https://sweeps.proxy.beeceptor.com/skyanalytics/get`
   - HTTP Method: `POST`
   - Restrictions:
     - All property names should be capitalized, except `t`
     - The `lat-lon` array should be replaced by an International Mapcode representation. Use the [Mapcode REST API](https://www.mapcode.com/rest-api) to convert the Latitude/Longitude codes on the fly.

### Example:

The cURL command above should make your Node.js server initiate 6 HTTP requests overall: 2 events sent to 3 services. The first event, when sent to SkyAnalytics, should look like this:

```http
POST /skyanalytics/get HTTP/1.1
Host: sweeps.proxy.beeceptor.com
Content-Length: 177

{
	"t": "lift-off",
	"Engines": 4,
	"Fuel": 78,
	"Successful": true,
	"Temperature": {"engine": 80, "cabin": 31},
	"Timestamp": 1595244264059,
	"Lat-lon": "CYZ7V.DYDG"
}
```

## Deliverables

Send us a link to Git repository that contains the code of your Cloudflare Worker, the HTML file, and your Node.js HTTP Forwarder.
