import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { authBearer } from './middlewares/auth.middleware'
import errorMiddleware from './middlewares/error.middleware'
import routes from './routes/routes'

// Configuración de variables de entorno
config()

const app = express()
const port = process.env.PORT || '4001'
const frontendUrl = process.env.APP_FRONTEND_URL || 'http://localhost:3000'

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
)
app.use(morgan('dev'))

// Auth middleware
app.use(authBearer)

// Rutas
app.use('/api', routes)

// Middleware de manejo de errores (debe ir después de las rutas)
app.use(errorMiddleware)

// Not Found Middleware
app.use((_req, res) => {
  res.status(404).json({
    message: 'Route not found',
    status: 404,
  })
})

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Frontend URL configured as: ${frontendUrl}`)
})
