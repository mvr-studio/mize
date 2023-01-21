#!/usr/bin/env node
import meow from 'meow'
import createApp from './create-app.js'

const cli = meow(
	`
	Usage
	  $ create-mize-app [name]

	Examples
	  $ create-mize-app my-api
`
)

createApp({ appName: cli.input[0] })
