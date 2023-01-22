/*
  URL: http://localhost:3000/posts
  Body:
    {
      "test": "content"
    }
  Response:
    {
      "body": {
        "test": "content"
      }
    }
*/
import { json, MizeRequestHandler, send } from '@getmize/core'

export const POST: MizeRequestHandler = async (req, res) => {
  const body = await json(req)
  send(res, 200, { body })
}
