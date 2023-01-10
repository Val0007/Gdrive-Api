const con = require("./con")


async function getFilesFromDept(query,res){
    return new Promise(async (res,rej)=>{
        const result = await con.execute(query,(err,rows)=>{
            if(err){
                console.log(err)
                rej("Error")
            }
            res(rows)
        })
    })

}

module.exports = {
    getFilesFromDept
}