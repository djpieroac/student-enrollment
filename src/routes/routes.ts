import express from 'express'
import authRoutes from '../auth/auth.routes'
import profilesRoutes from '../profiles/profile.routes'
import userRoutes from '../users/user.routes'
import degreeRoutes from '../degrees/degree.routes'
import sectionRoutes from '../sections/section.routes'
import externaldocRoutes from '../externaldoc/externaldoc.routes'
import stundetRoutes from '../student/student.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/degrees', degreeRoutes)
router.use('/profiles', profilesRoutes)
router.use('/sections', sectionRoutes)
router.use('/external-docs', externaldocRoutes)
router.use('/students', stundetRoutes)

export default router
