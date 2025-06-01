const express = require('express')
const router_html = express.Router()
const multer = require('multer')
let upload = multer({dest:'uploads/'})

const {
    getUserhHandler,
    getUserDetailByIdHandler,
    updateUserByIdHandler,
    deleteUserByIdHandler,
    createUserHandler,
    RegisterHandler,
    User_UpdateView,
    User_DeleteView
    } = require('../controller/user_html')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },

    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

upload = multer({storage:storage})

// GET /users - HTML Document Render 
router_html.route("/").get(getUserhHandler)

// Middleware used to extract data from the body, else it would be undefined. 


// GET /api/users - List all users
router_html.route("/").get(getUserhHandler)

router_html.use('/uploads',express.static('uploads'))
router_html.use(express.urlencoded({extended:false}))
//POST Method
router_html.route("/register").get(RegisterHandler)
router_html.route("/create_user").post(upload.single('profileimage'),createUserHandler)


// fetching user through id.
router_html.route("/user_details/:id").get(getUserDetailByIdHandler)


// updating user through id.
router_html.route("/update_user/:id").get(User_UpdateView)
router_html.route("/updating_user/:id").post(updateUserByIdHandler)


// deleting user through id.
router_html.route("/delete_user/:id").get(User_DeleteView)
router_html.route("/deleting_user/:id").post(deleteUserByIdHandler)

module.exports = router_html