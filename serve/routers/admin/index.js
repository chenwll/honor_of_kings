const resourceMiddleware = require("../../middleware/resouce");
module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')

    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resouce')

    router.post('/', async (req,res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    router.put('/:id', async (req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    router.get('/', authMiddleware(),async (req,res) => {
        const queryOptions ={}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })

    router.delete('/:id', async (req,res) => {
        const model  = await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    router.get('/:id', async (req,res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),async (req,res,next) =>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)

    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload', authMiddleware(),upload.single('file'), async (req,res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1.根据用户名找用户

        const user = await AdminUser.findOne({ username }).select('+password')
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }
        assert(user, 422, '用户不存在')

        // 2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if(!isValid){
        //     return res.status(422).send({
        //         message:'密码错误',
        //     })
        // }

        // 3.返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    // 错误处理函数
    app.use(async (err,req, res,next) =>{
        res.status(err.statusCode||500).send({
            message:err.message
        })
    })
}
