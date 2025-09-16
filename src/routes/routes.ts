import express from 'express'
import authRoutes from '../auth/auth.routes'
import userRoutes from '../users/user.routes'
import profilesRoutes from '../profiles/profile.router'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/profiles', profilesRoutes)

export default router
