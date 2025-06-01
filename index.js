const express = require('express')
const app = express()
app.use(express.json())

const path = require('path')

const {logReqRes} = require('./middleware/logReqRes.js') 

const router_api = require('./router/user_router.js')

const router_html = require('./router/user_router_html.js')

const PORT = 8000

app.set('view engine',"ejs")
app.set("views",path.resolve("./view"))

app.use(logReqRes("log.txt"))


app.use(express.json())
app.use("/api/users",router_api)

app.use('/uploads',express.static('uploads'))
app.use(express.urlencoded({extended: false}))
app.use("/users",router_html)

app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`))

// By default browser allows GET request.
