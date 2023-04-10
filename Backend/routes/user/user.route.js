
const express = require("express")

const app = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userModal } = require("./user.modal")

app.post("/",async(req,res)=>{
    const {name,email,bio,created_at,updated_at}=req.body
    const existed = await userModal.findOne({email})
    
    if(existed!==null){
        res.send("Email already exits")
    }

    else{
      
            const user = new userModal({name,email,bio,created_at,updated_at})
            await user.save()
            res.send("User Created")
        
    } 
    
})  

app.get("/:id", async (req, res) => {
    const id = req.params.id
    const user = await userModal.findOne({_id:id})
    if(user.length!==0){
        res.send(user)
    }else{
        res.send("user Not Found")
    }
    
})



app.delete("/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await userModal.findOne({_id:noteID})
    if(userID !== note.userID){
        res.send("Not authorised")
    }
    else{
        await userModal.findByIdAndDelete({_id : noteID})
        res.send({"msg" : "Note deleted successfully"})
    }
})





module.exports=app