const express = require('express')
const User = require('../model/user_model.js')
const multer = require('multer')

// GET /users - HTML Document Render 
async function getUserhHandler(req,res) {
    const allDbUsers = await User.find({})
    const html = `
        <ul>
            ${allDbUsers.map(user=>`<li>${user.firstName} - ${user.email}</li>`).join("")} 
        </ul>
    ` 
    // res.send(html)
    res.render("users/home",{users:allDbUsers})
}
 

async function getUserDetailByIdHandler(req,res){
    // Server Error Response (500 Status Code)
    // const user = users.find(user => user[0].id === id)
    const user = await User.findById(req.params.id)

    // Client Error Response 
    if(!user) return res.status(404).json({error:'User not found!...'})
    
    return res.render("users/user_details",{user:user})
}

async function User_UpdateView(req,res){
    const user = await User.findById(req.params.id)
    res.render("users/update_user",{user:user})
}


async function updateUserByIdHandler(req,res){
    // To Edit a user with id

    console.log(req.body)
    console.log(req.file)
    const updatedData = await User.findByIdAndUpdate(req.params.id,{
        firstName:req.body.firstName,    
        lastName:req.body.lastName,
        email:req.body.email,
        profileimage:req.file.originalname,
        job_Title:req.body.job_Title,
        gender:req.body.gender
    },// updating user information through id.
    {
        new:true
    })// to check whether the data is updated or not. 
    
    if (!updatedData){
        return res.status(404).send('User not found.')
    }

    const allDbUsers = await User.find({})
    res.render("users/home",{users:allDbUsers})
}

async function User_DeleteView(req,res){
    const id = req.params.id   
    const user = await User.findById(id)

    // Client Error Response 
    if(!user) return res.status(404).json({error:'User not found!...'})
    
    return res.render("users/delete_user",{uid:id,user:user})
}

async function deleteUserByIdHandler(req,res){
    // To Delete a user with id

    await User.findByIdAndDelete(req.params.id) // deleting user information through id.

    allDbUsers = await User.find({})

    res.redirect("/users")
}

async function RegisterHandler(req,res){
    res.render("users/create_user")
}

async function createUserHandler(req,res){
    const body = req.body

    const file = req.file.originalname

    // To Create a user.
    if(!req.file){
        return res.status(400).send('No file uploaded or invalid file type.')
    }
    else{
        // To check whether all fields are entered properly or not.
        if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
            return res.status(400).json({msg:"All field are required."})
        }
        console.log(req)
        console.log(req.file)

        const result = await User.create(
            {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                profileimage:file,
                gender: body.gender,
                job_Title: body.job_Title
            }
        )

        console.log("Result" + result)
        // return res.status(201).json({msg:"Success"})
        res.redirect("/users")
    }
}

module.exports = {
        getUserhHandler,
        getUserDetailByIdHandler,
        updateUserByIdHandler,
        deleteUserByIdHandler,
        createUserHandler,
        RegisterHandler,
        User_UpdateView,
        User_DeleteView
    }  