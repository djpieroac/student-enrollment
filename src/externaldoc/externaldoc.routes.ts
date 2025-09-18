import express from 'express'
import * as externalDocController from './externaldoc.controller'

const router = express.Router()

router.get('/', externalDocController.getExternalDocs)
router.get('/:id', externalDocController.getExternalDocById)
router.post('/', externalDocController.createExternalDoc)
router.put('/:id', externalDocController.updateExternalDoc)
router.delete('/:id', externalDocController.deleteExternalDoc)

export default router
