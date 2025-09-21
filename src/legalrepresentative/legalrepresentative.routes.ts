import express from 'express'
import * as legalRepresentativeController from './legalrepresentative.controller'

const router = express.Router()

router.get('/', legalRepresentativeController.getLegalRepresentatives)
router.get('/:id', legalRepresentativeController.getLegalRepresentativeById)
router.post('/', legalRepresentativeController.createdLegalRepresentative)
router.put('/:id', legalRepresentativeController.updateLegalRepresentative)
router.delete('/:id', legalRepresentativeController.deleteLegalRepresentative)

export default router
