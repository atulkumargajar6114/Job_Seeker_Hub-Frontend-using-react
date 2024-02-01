import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service";
import { getCurrentUserDetail } from "../auth";
import { toast } from "react-toastify";
const AddJob = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);

  const [user,setUser]=useState(undefined)

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [image,setImage]=useState(null)

  // const config={
  //     placeholder:"Start typing..."
  // }

  useEffect(() => {
    setUser(getCurrentUserDetail())
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //field changed function
  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentFieldChanged = (data) => {
    setPost({ ...post, 'content': data });
  };

  //create Post Function
  const createPost = (event) => {
    event.preventDefault();
    // console.log(post);
    if (post.title.trim() === "") {
      toast.error("post title is required!!");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("post content is required!!");
      return;
    }
    if (post.categoryId === "") {
      toast.error("select some category");
      return;
    }

    //submit the form on server
    post['userId']=user.id

    doCreatePost(post)
      .then((data) => {
        uploadPostImage(image,data.postId).then(data=>{
          toast.success("Image uploaded !!");
        }).catch(error=>{
          toast.error("error in uploading image")
          console.log(error)
        })

        toast.success("Post Created");
        // console.log(post);'
        setPost({
          title:'',
          content:'',
          categoryId:''
        })
      })
      .catch((error) => {
        toast.error("Post not created due to some error !!")
        // console.log(error)
      });
  };

  //handling file change event
  const handleFileChange=(event)=>{
      console.log(event.target.files[0])
      setImage(event.target.files[0])
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="mt-5" >
          <img src="https://tjn-blog-images.s3.amazonaws.com/wp-content/uploads/2015/06/20004720/find-new-job.jpg" style={{width:'',height:'550px'}}/>

        </Col>
        <Col md={6} className="mt-3">
        <div className="wrapper" style={{width:'600px'}}>
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3 className="text-center">Add New Job</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Job title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <Label for="content">Job Content</Label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here"
                className="rounded-0"
                style={{ height: "100px" }}
              /> */}
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={contentFieldChanged}
              />
            </div>
              
              {/* file field */}
              <div className="mt-3">
                <Label for="image">Select company image</Label>
                <Input  id="image" type="file" onChange={handleFileChange}/>
              </div>








            <div className="my-3">
              <Label for="category">Job Category</Label>
              <Input
                type="select"
                id="category"
                className="rounded-0"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
              >
                <option disabled={0}>--Select category--</option>

                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" color="primary" className="rounded-0">
                Add Job
              </Button>
              <Button color="danger" className="rounded-0 ms-2">
                Reset Job
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddJob;
