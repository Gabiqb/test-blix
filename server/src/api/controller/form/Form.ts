import fs, { existsSync } from 'fs'
import path from 'path'
import { NextFunction, Request, Response, Router } from 'express'

const router = Router()

router.get('/formData', async (_, res, nex) => {
    try {
        const data = fs.readFileSync(path.join(process.cwd(), '/src/api/data/data.json'))
        console.log(data)
        res.send(data)
    } catch (e) {
        res.status(404).json('No data')
    }
})

router.post('/formData', async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    // data validation here should be
    fs.writeFile(path.join(process.cwd(), '/src/api/data/data.json'), JSON.stringify(body), (err) => {
        console.log(err)
    })
    res.send(body)
})
export default router
