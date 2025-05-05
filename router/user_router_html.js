const express = require('express')
const router_html = express.Router()
const getUserhHandler = require('../controller/user_html')

// GET /users - HTML Document Render 
router_html.route("/").get(getUserhHandler)

module.exports = router_html