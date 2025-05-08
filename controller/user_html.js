const express = require('express')
const User = require('../model/user_model.js')

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
 

async function getUserByIdHandler(req,res){
    // Server Error Response (500 Status Code)
    // const user = users.find(user => user[0].id === id)
    const user = await User.findById(req.params.id)

    // Client Error Response 
    if(!user) return res.status(404).json({error:'User not found!...'})
    
    return res.json(user)
}

async function updateUserByIdHandler(req,res){
    // To Edit a user with id

    await User.findByIdAndUpdate(req.params.id,{lastName:'Rasal'}) // updating user information through id.
    return res.json({status:"Patch request resolved."})
}

async function deleteUserByIdHandler(req,res){
    // To Delete a user with id

    await User.findByIdAndDelete(req.params.id) // deleting user information through id.
    return res.json({status:"User deleted."})
}


async function RegisterHandler(req,res){
    res.render("users/create_user")
}

async function createUserHandler(req,res){
    const body = req.body
    
    // To check whether all fields are entered properly or not.
    // if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
    //     return res.status(400).json({msg:"All fields are required."})
    // }

    // To Create a user.
    const result = await User.create(
        {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            job_Title: body.job_Title
        }
    )

    console.log("Result"+result)
    const allDbUsers = await User.find({})
    // return res.status(201).json({msg:"Success"})
    return res.render("users/home",{users:allDbUsers})
}

module.exports = {
        getUserhHandler,
        getUserByIdHandler,
        updateUserByIdHandler,
        deleteUserByIdHandler,
        createUserHandler,
        RegisterHandler
    }  