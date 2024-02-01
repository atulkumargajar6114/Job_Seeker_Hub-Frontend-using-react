import React from "react";
import Base from "../../components/Base";
import AddJob from "../../components/AddJob";
import { Container } from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import { getCurrentUserDetail } from "../../auth";
import { deletePostService, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const Userdashboard = () => {

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail());
    loadPostData()
   
  }, []);


  function loadPostData(){
     
    loadPostUserWise(getCurrentUserDetail().id)
      .then(data => {
        console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading user posts");
      });
  }

  //function to delete post

  function deletePost(post){
    //going to delete post
    console.log(post)
    deletePostService(post.postId).then(res=>{
      console.log(res)
      toast.success("post is deleted..")
      let newPosts=posts.filter(p=>p.postId!=post.postId)
      setPosts([...newPosts])
    }).catch(error=>{
      console.log(error)
      toast.error("error in deleteing post")
    })
  }

  return (
    <Base>
      <Container>
        <AddJob />
        <h1 className="my-3">Jobs Count : ({posts.length})</h1>

        {
          posts.map((post,index)=>{
            return (
              <Post post={post} key={index} deletePost={deletePost} />
            )
          })
        }

      </Container>
    </Base>
  );
};

export default Userdashboard;
