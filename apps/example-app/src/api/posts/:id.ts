/*
  URL: http://localhost:3000/posts/2?limit=10
  Response:
    {
      "params": {
        "id": "2"
      },
      "query": {
        "limit": "10"
      }
    }
*/
import { MizeRequestHandler, send } from '@getmize/core'

const handler: MizeRequestHandler = (req, res) => {
  send(res, 200, { params: req.params, query: req.query })
}

export default handler
