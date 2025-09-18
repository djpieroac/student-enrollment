import express from 'express'
import * as sectionController from './section.controller'

const router = express.Router()

router.get('/', sectionController.getSections)
router.get('/:id', sectionController.getSectionById)
router.post('/', sectionController.createSection)
router.put('/:id', sectionController.updateSection)
router.delete('/:id', sectionController.deleteSection)

export default router
