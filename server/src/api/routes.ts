import { Router } from 'express'
import Form from './controller/form/Form'

const router = Router()

router.use('/form', Form)
export default router
