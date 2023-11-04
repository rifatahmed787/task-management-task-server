import config from './config/index'
import app from './app'

// getting-started.js
import mongoose from 'mongoose'
import { Server } from 'http'

process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      console.log('Connected')

      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to connect database', error)
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        console.log(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

// process.on('SIGTERM', () => {
//   console.log('SIGTERM recieved')
//   if (server) {
//     server.close()
//   }
// })
