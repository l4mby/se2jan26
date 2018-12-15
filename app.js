
const express = require('express'),
    bodyParser = require('body-parser');

const { check } = require('./checker');
const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));




// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 3})
})

app.post('/count',async (req, res) => {
	let reqb = req.body;

	let result = await check(reqb.url, reqb.invocationParameters, reqb.expectedResultData, reqb.expectedResultStatus);

	if(result)
		res.status(200).send(JSON.stringify(result));
	else
		res.status(404).end();
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
