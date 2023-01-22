/*
  URL: http://localhost:3000/hello
  Response:
    {
      "name": "John Doe"
    }
*/
import { MizeRequestHandler, send } from '@getmize/core'

const handler: MizeRequestHandler = (_, res) => {
  send(res, 200, { name: 'John Doe' })
}

export default handler
