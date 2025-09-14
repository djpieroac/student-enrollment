import express from 'express'
import * as userController from './user.controller'

const router = express.Router()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createdUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router
