const express = require('express')
const User = require('../model/user_model.js')

// GET /users - HTML Document Render 
async function getUserhHandler(params) {
    const allDbUsers = await User.find({})
    const html = `
        <ul>
            ${allDbUsers.map(user=>`<li>${user.firstName} - ${user.email}</li>`).join("")} 
        </ul>
    ` 
    res.send(html)
}
    
module.exports = getUserhHandler