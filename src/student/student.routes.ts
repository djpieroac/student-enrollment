import express from 'express'
import * as studentController from './student.controller'

const router = express.Router()

router.get('/', studentController.getStudents)
router.get('/:id', studentController.getStudentById)
router.post('/', studentController.createdStudent)
router.put('/:id', studentController.updateStudent)
router.delete('/:id', studentController.deleteStudent)

export default router
