import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

function PostList() {
    const [posts,setPosts] =useState({})

    const fetchPosts=async ()=>{
      try {
         const response=await axios.get("http://localhost:4002/posts")
       
         setPosts(response?.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    useEffect(()=>{
        fetchPosts()
    },[])

    const renderedPosts=Object.values(posts).map((post)=>{       //give all values in an object as an array 
        return (
            <div className='card' style={{width:'30%',marginBottom:'20px'}} key={post.id}>
                <div className='card-body'>
                    <h3> {post.title} </h3>
                    <CommentList comments={post?.Comments}/>
                    <CommentCreate  postId={post.id}/>
                </div>
                 </div>
          )
    })     

    return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}

    </div>
    )
 
}

export default PostList