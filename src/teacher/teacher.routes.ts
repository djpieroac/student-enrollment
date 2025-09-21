import express from 'express'
import * as teacherController from './teacher.controller'

const router = express.Router()

router.get('/', teacherController.getTeachers)
router.get('/:id', teacherController.getTeacherById)
router.post('/', teacherController.createdTeacher)
router.put('/:id', teacherController.updateTeacher)
router.delete('/:id', teacherController.deleteTeacher)

export default router
