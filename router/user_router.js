const express = require('express')
const router_api = express.Router()
// router_api.use(express.json())
const {
    getHandleUsers,
    getUserByIdHandler,
    updateUserByIdHandler,
    deleteUserByIdHandler,
    createUserHandler,
    RegisterHandler
} = require('../controller/user_api.js')

// Middleware used to extract data from the body, else it would be undefined. 
router_api.use(express.urlencoded({extended:false}))

// GET /api/users - List all users
router_api.route("/").get(getHandleUsers)

//POST Method
router_api.route("/create_user").post(createUserHandler)

// fetching user through id.
router_api.route("/:id").get(getUserByIdHandler)

// updating user through id.
router_api.route("/update_user/:id").patch(updateUserByIdHandler)

// deleting user through id.
router_api.route("/delete_user/:id").delete(deleteUserByIdHandler)

module.exports = router_api