# Assignment 2

After cloning the repo

`cd assignment-2`

Then run
`npm run watch` and `npm run dev`

You can use [postman](https://www.postman.com/downloads/) to send the requests

or
curl in the terminal

```
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

Things I didn't code in due to time constraints.

- Error and logging service
- Tracking for if sending the events failed or not.
- Retry attempts if request failed (Retry 3-5 times)

I'd also refactor the Fowarder class to take only the events array then handle evetything within the class.
