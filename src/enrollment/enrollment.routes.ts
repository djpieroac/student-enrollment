import express from 'express'
import * as enrollmentController from './enrollment.controller'

const router = express.Router()

router.get('/', enrollmentController.getEnrollments)
router.get('/:id', enrollmentController.getEnrollmentById)
router.post('/', enrollmentController.createdEnrollment)
router.put('/:id', enrollmentController.updateEnrollment)
router.delete('/:id', enrollmentController.deleteEnrollment)

export default router
