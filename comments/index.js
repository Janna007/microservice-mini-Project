const express=require('express')
const bodyParser=require('body-parser')
const {randomBytes}=require('crypto')
const cors=require('cors')
const axios=require('axios')

const app=express()

app.use(bodyParser.json())
app.use(cors())

commentsByPostId={}

app.get('/posts/:id/comments',(req,res)=>{
   
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments',async (req,res)=>{
       const {content}=req.body
       const commentId=randomBytes(4).toString('hex')
       
       const comments=commentsByPostId[req.params.id] || []
       comments.push({id :commentId ,content})
       commentsByPostId[req.params.id]=comments

       await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{id :commentId ,content,postId:req.params.id}
       })

       res.status(200).send(comments)

       
})

app.post('/events',(req,res)=>{
    console.log('Recieved Event',req.body.type)
    res.send({})
})


app.listen(4001,()=>{
    console.log('server is running on port number 4001')
})