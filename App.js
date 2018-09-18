const express = require('express')
const app = express();//express对象的一个实例

app.use(express.static('public'))
const cors = require('cors') //解决跨域

app.use(cors())
app.listen(4000,function () {
  console.log('启动成功')
})
