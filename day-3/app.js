import { fastify } from 'fastify'
import { loggerConfig } from './logger-config.js'

const app = fastify({
  disableRequestLogging: true,
  logger: loggerConfig
})

// Using a preHandler to also have access to the parsed body
// @see https://github.com/fastify/fastify/issues/1686#issuecomment-498563121
app.addHook('preHandler', async function onRequestLogHook(req) {
  req.log.info({ req }, 'incoming request 🔮')
})

app.get('/formatter', { handler: formatError })
app.get('/root', { handler: helloHandler, config: { logBody: true } })
app.post('/sensitive', { handler: sensitiveHandler, config: { logBody: true } })

async function helloHandler(req, reply) {
  return { hello: 'world' }
}

async function formatError(req, reply) {
  const obj = { big: 'object' }
  req.log.debug(`Incorrect: ${JSON.stringify(obj)}`)
  req.log.debug('Correct: %o', obj)
  return { hello: 'world' }
}

async function sensitiveHandler(req, reply) {
  return { hello: 'world' }
}

await app.inject('/formatter')
await app.inject('/root')
await app.inject({ url: '/sensitive', method: 'POST', body: { name: 'non-sensitive', password: 'hide-me-please' } })

