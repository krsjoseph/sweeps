
import express = require('express');
import bodyParser = require('body-parser');
import fowarder from './Fowarder';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/', async function (req, res) {
  try {
    const spaceship = await fowarder.toSpaceship(req.body.events)
    const monitor = await fowarder.toMonitor(req.body.events)
    const skyAnalytics = await fowarder.toSkyAnalytics(req.body.events)
    res.json({ message: 'Events Sent Succesully' })
  } catch (error) {
    console.log(error)
  }
});



app.listen(1337, function () {
  console.log('Listening!');
});


function flattenObject(ob) {

}
