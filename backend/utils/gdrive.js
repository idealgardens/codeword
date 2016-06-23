var google = require('googleapis')
var drive = google.drive({ version: 'v2' })

var key = require(__dirname + './../../../creds.json') // to load creds from external
// const keys = {
//   'client_email': process.env.GOOGLE_EMAIL,
//   'private_key': process.env.GOOGLE_KEY
// }

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets'
]

var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, scopes, null)

export const authorize = () => {
	if (!key) {
		console.log('Authentication is required to perform action')
		return Promise.reject('Authentication is required to perform action')
	}
	const { client_email, private_key } = key
	if (!client_email || !private_key) {
		console.log('Email and Private Key are required')
		return Promise.reject('Email and Private Key are required')
	}
	// key = require(credsPath) // to load creds from external
	// jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, scopes, null)
	console.log('auth:', key)
  return new Promise((resolve, reject) => {
    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      resolve(tokens)
    })
  })
}

export function getFiles (req, res) {
	authorize().then(tokens => {
		console.log('tokens:', tokens)
		// Make an authorized request to list Drive files.
		drive.files.list({ auth: jwtClient }, (err, resp) => {
			// handle err and response
			if (err) {
				console.log('err:', err)
				return res.status(500).send('Error')
			}
			console.log('response', resp)
			res.json(resp)
			// res.json({ message: 'Success' })
		})
	})
	.catch(error => res.status(500).json(error))
}
