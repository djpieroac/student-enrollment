import express from 'express'
import authRoutes from '../auth/auth.routes'
import degreeRoutes from '../degrees/degree.routes'
import externaldocRoutes from '../externaldoc/externaldoc.routes'
import legalRepresentativeRoutes from '../legalrepresentative/legalrepresentative.routes'
import profilesRoutes from '../profiles/profile.routes'
import sectionRoutes from '../sections/section.routes'
import stundetRoutes from '../student/student.routes'
import teacherRoutes from '../teacher/teacher.routes'
import userRoutes from '../users/user.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/degrees', degreeRoutes)
router.use('/profiles', profilesRoutes)
router.use('/sections', sectionRoutes)
router.use('/external-docs', externaldocRoutes)
router.use('/students', stundetRoutes)
router.use('/teachers', teacherRoutes)
router.use('/legal-representative', legalRepresentativeRoutes)

export default router
