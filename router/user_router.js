const express = require('express')
const router_api = express.Router()
const {
    getHandleUsers,
    getUserByIdHandler,
    updateUserByIdHandler,
    deleteUserByIdHandler,
    createUserHandler
} = require('../controller/user_api.js')

// Middleware used to extract data from the body, else it would be undefined. 
router_api.use(express.urlencoded({extended:false}))


// GET /api/users - List all users
// We have to use POSTMAN for POST, PATCH and DELETE request.
router_api.route("/").get(getHandleUsers).post(createUserHandler)


// routing the api having same URL.
router_api.route("/:id")
.get(getUserByIdHandler)
.patch(updateUserByIdHandler)
.delete(deleteUserByIdHandler)

module.exports = router_api