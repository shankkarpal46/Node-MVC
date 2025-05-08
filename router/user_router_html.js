const express = require('express')
const router_html = express.Router()
const {
    getUserhHandler,
    getUserByIdHandler,
    updateUserByIdHandler,
    deleteUserByIdHandler,
    createUserHandler,
    RegisterHandler
    } = require('../controller/user_html')

// GET /users - HTML Document Render 
router_html.route("/").get(getUserhHandler)

const {
    
} = require('../controller/user_api.js')

// Middleware used to extract data from the body, else it would be undefined. 
router_html.use(express.urlencoded({extended:false}))

// GET /api/users - List all users
router_html.route("/").get(getUserhHandler)

//POST Method
router_html.route("/register").get(RegisterHandler)
router_html.route("/create_user").post(createUserHandler)

// fetching user through id.
router_html.route("/:id").get(getUserByIdHandler)

// updating user through id.
router_html.route("/update_user/:id").patch(updateUserByIdHandler)

// deleting user through id.
router_html.route("/delete_user/:id").delete(deleteUserByIdHandler)

module.exports = router_html