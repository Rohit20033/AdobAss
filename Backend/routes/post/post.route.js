
const express = require("express")
const {postModal} = require("./post.modal")


const app = express.Router()

app.post("/",async(req,res)=>{
    const {user_id,content,bio,created_at,updated_at}=req.body
    

   
      
            const user = new postModal({user_id,content,bio,created_at,updated_at})
            await user.save()
            res.send("User Created")
        
    
}) 


app.get("/:id", async (req, res) => {
    const id = req.params.id
    const user = await postModal.findOne({_id:id})
    if(user.length!==0){
        res.send(user)
    }else{
        res.send("user Not Found")
    }
    
})

app.patch("/:id/like", async (req, res) => {
    const id = req.params.id
   
    const note = await postModal.findOne({_id:id})

    
        await postModal.findByIdAndUpdate({_id : id}, req.body)
        res.send({"msg" : "Note updated successfully"})

})

app.patch("/:id/unlike", async (req, res) => {
    const id = req.params.id
     
    
   
    const note = await postModal.findOne({_id:id})
     
    const {user_id,content,bio,created_at,updated_at}=req.body
    let date= Date.now
    
        await postModal.findByIdAndUpdate({_id : id},{user_id,content,bio,created_at,updated_at:date})
        res.send({"msg" : "Note updated successfully"})

})

app.get("/analytics/posts", async (req, res) => {
    const user = await postModal.find()
   let total = user.length
   res.send({total})

})

app.get("/analytics/posts/top-liked", async (req, res) => {
    const user = await postModal.find().sort({ likes: -1 }).limit(5);
   res.send({user})

})

app.delete("/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    const note = await postModal.findOne({_id:noteID})

  
        await postModal.findByIdAndDelete({_id : noteID})
        res.send({"msg" : "Note deleted successfully"})
    
})


module.exports=app