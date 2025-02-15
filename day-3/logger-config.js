// @see https://github.com/PacktPublishing/Accelerating-Server-Side-Development-with-Fastify/blob/main/Chapter%2011/best-setup.js

export const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  timestamp: () => {
    const dateString = new Date(Date.now()).toISOString()
    return `,"@timestamp":"${dateString}"`
  },
  redact: {
    censor: '***',
    paths: [
      'req.headers.authorization',
      'req.body.password',
      'req.body.email'
    ]
  },
  serializers: {
    req: function (request) {
      const shouldLogBody = request.routeOptions.config.logBody === true
      return {
        method: request.method,
        url: request.raw.url,
        routeUrl: request.routerPath,
        version: request.headers?.['accept-version'],
        user: request.user?.id,
        headers: request.headers,
        body: shouldLogBody ? request.body : undefined,
        hostname: request.hostname,
        remoteAddress: request.ip,
        remotePort: request.socket?.remotePort
      }
    },
    res: function (reply) {
      return {
        statusCode: reply.statusCode,
        responseTime: reply.getResponseTime()
      }
    }
  }
};

