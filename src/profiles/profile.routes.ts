import express from 'express'
import * as profileController from './profile.controller'

const router = express.Router()

router.get('/', profileController.getProfiles)
router.get('/:id', profileController.getProfileById)
router.post('/', profileController.createdProfile)
router.put('/:id', profileController.updateProfile)
router.delete('/:id', profileController.deleteProfile)

export default router
