import express from 'express'
import * as degreeController from './degree.controller'

const router = express.Router()

router.get('/', degreeController.getDegrees)
router.get('/:id', degreeController.getDegreeById)
router.post('/', degreeController.createDegree)
router.put('/:id', degreeController.updateDegree)
router.delete('/:id', degreeController.deleteDegree)

export default router
