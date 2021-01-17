const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const { v4: { createCloudevent, createEventStream } } = require('@1mill/cloudevents')

app.use(cors({
	optionsSuccessStatus: 200,
	origin: '*', // ! Accepting connections for any front-end client
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(async(err, req, res, next) => {
	res.status(400).json({ error: err })
})

const rapids = createEventStream({
	id: process.env.CLOUDEVENT_ID,
	mechanism: process.env.CLOUDEVENT_MECHANISM,
	password: process.env.CLOUDEVENT_PASSWORD,
	protocol: process.env.CLOUDEVENT_PROTOCOL,
	urls: process.env.CLOUDEVENT_URLS.split(','),
	username: process.env.CLOUDEVENT_USERNAME,
})

app.options('/')
app.post('/', async (req, res) => {
	try {
		const cloudevent = createCloudevent({ ...req.body.cloudevent })

		await rapids.emit({ cloudevent })

		const { time, id, source, type } = cloudevent
		console.log({ time, id, source, type })

		res.status(200).json({ cloudevent })
	} catch (err) {
		console.error(err)
		res.status(400).json({ error: err.message })
	}
})
app.listen(process.env.PORT, () => {
	console.info(`Starting on port ${process.env.HOST}:${process.env.PORT}`)
})
