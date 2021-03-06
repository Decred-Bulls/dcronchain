// Required for 'typedi' module
import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import proxy from 'express-http-proxy'
const consola = require('consola')
const cache = require('route-cache')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

import { Container } from 'typedi'

// Important to import like this for Service() decorators to be executed
import './services'
import routes from './routes'

// Set console as Logger
Container.set('Logger', console)

function forceSsl(req: Request, res: Response, next: NextFunction) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://dcronchain.com', req.url].join(''))
  }
  return next()
}

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const host: string = nuxt.options.server.host
  const port: string = nuxt.options.server.port

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Enforce SSL in production
  if (process.env.NODE_ENV === 'production') {
    app.use(forceSsl)
  }

  app.use(
    '/api/proxy/',
    cache.cacheSeconds(21600), // 6 hours
    proxy('https://raw.githubusercontent.com')
  )

  // Setup routes
  // app.use('/api', routes)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(Number(port), host, () => {})
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
start()
