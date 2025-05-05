const fs = require('fs')

async function logResReq(filename){
    return (req,res,next) => {
        fs,appendFile(filename,`\n ${Date.now()}: ${req.method}: ${req.path}`,(err,data)=>{
            console.log(err)
            next()
        })
    }
}

module.exports = logResReq