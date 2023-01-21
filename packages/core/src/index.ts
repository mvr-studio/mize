require('dotenv').config()
import http from 'http'
import { send, serve, RequestHandler } from 'micro'

const API_ROUTES_DIR =
  process.env.MIZE_MODE === 'dev' ? '/src/api' : '/dist/api'

const match = require('fs-router')(process.cwd() + API_ROUTES_DIR, {
  ext: ['.ts', '.js']
})
const API_KEY = process.env.MIZE_API_KEY

const serverHandler: RequestHandler = (req, res) => {
  let matched = match(req)
  if (API_KEY && req.headers?.authorization !== `Mize ${API_KEY}`)
    return send(res, 401, { error: 'Unauthorized' })
  if (!matched) return send(res, 404, { error: 'Not found' })
  return matched(req, res)
}

export const server = new http.Server(serve(serverHandler))

// server.listen(process.env.PORT || 3000)
