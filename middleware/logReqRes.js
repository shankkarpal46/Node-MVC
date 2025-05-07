const fs = require('fs') // since file system is used to store data, instead of database .

function logReqRes(filename){
    return (req,res,next) => {
        fs.appendFile(filename,`\n ${Date.now()}: ${req.method}: ${req.path}`,(err,data)=>{
            console.log(err)
            next()
        })
    }
}

module.exports = {logReqRes}