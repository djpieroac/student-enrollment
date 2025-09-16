import express from 'express'
import authRoutes from '../auth/auth.routes'
import profilesRoutes from '../profiles/profile.routes'
import userRoutes from '../users/user.routes'
import degreeRoutes from '../degrees/degree.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/degrees', degreeRoutes)
router.use('/profiles', profilesRoutes)

export default router
