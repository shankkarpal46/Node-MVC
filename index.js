const express = require('express')
const fs = require('fs') // since file system is used to store data, instead of database .

const mongoose = require('mongoose')
const app = express()

const router_api = require('./router/user_router.js')

const router_html = require('./router/user_router_html.js')

const PORT = 8000

app.use("/api/users",router_api)

app.use("/users",router_html)

app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`))

// By default browser allows GET request.
