const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors());
app.use(express.json())
app.use('/uploads',express.static(__dirname+ '/uploads'))

require('./plugins/db')(app);
require('./routers/admin')(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
