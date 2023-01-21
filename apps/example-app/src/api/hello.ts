import { RequestHandler, send } from 'micro'

const handler: RequestHandler = (_, res) => {
	send(res, 200, { name: 'John Doe' })
}

export default handler
