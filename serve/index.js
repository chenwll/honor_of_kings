const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

// 设置密钥，但是应该放在环境变量中
app.set('secret','12home34')
app.use(cors());
app.use(express.json())
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/',express.static(__dirname+ '/web'))
app.use('/uploads',express.static(__dirname+ '/uploads'))


require('./plugins/db')(app);
require('./routers/admin')(app);
require('./routers/web')(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
