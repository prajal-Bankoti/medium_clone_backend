const app=require("./index")
require('dotenv').config()

const connect =require("./configs/db")
let port = process.env.Port||7000
app.listen(port,async function(){
    await connect()
    console.log("listing port "+port)
})
