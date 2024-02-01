import React from "react";
import Base from "../components/Base";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/userContext";
import { useEffect } from "react";
import { loadPost, updatePost as doUpdatePost } from "../services/post-service";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Container,
  Col,
  Row,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { useRef } from "react";

function UpdateBlog() {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //load blog from database
    loadPost(blogId)
      .then((data) => {
        console.log(data);
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading the job");
      });
  }, []);

  useEffect(() => {
    console.log("first");
    if (post) {
      if (post.user.id !== object.user.data.id) {
        toast.error("This is not your post");
        navigate("/");
      }
    }
  }, [post]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };

  const updatePost = (event) => {
    event.preventDefault();
    console.log(post);
    doUpdatePost(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((res) => {
        console.log(res);
        toast.success("Job Updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating post");
      });
  };

  const updateHtml = () => {
    return (
      <Container>
        <Row>
          <Col md={6} className="mt-3">
            <img src="https://assets-global.website-files.com/62666115cfab453aacbd513c/635aadaf64eaf3c96f777834_how-to-update-old-blog%20posts.jpg" style={{width:'600px',height:'600px'}}/>
          </Col>
          <Col md={6}>
            <div className="wrapper" style={{ width: "650px" }}>
              {/* {JSON.stringify(post)} */}
              <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                  {/* {JSON.stringify(post)} */}
                  <h3 className="text-center">Update Job from here !!</h3>
                  <Form onSubmit={updatePost}>
                    <div className="my-3">
                      <Label for="title">Job title</Label>
                      <Input
                        type="text"
                        id="title"
                        placeholder="Enter here"
                        className="rounded-0"
                        name="title"
                        value={post.title}
                        onChange={(event) => handleChange(event, "title")}
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
                        onChange={(newContent) =>
                          setPost({ ...post, content: newContent })
                        }
                      />
                    </div>

                    {/* file field */}
                    <div className="mt-3">
                      <Label for="image">Select company image</Label>
                      <Input id="image" type="file" onChange={""} />
                    </div>

                    <div className="my-3">
                      <Label for="category">Job Category</Label>
                      <Input
                        type="select"
                        id="category"
                        className="rounded-0"
                        name="categoryId"
                        onChange={(event) => handleChange(event, "categoryId")}
                        value={post.categoryId}
                      >
                        <option disabled={0}>--Select category--</option>

                        {categories.map((category) => (
                          <option
                            value={category.categoryId}
                            key={category.categoryId}
                          >
                            {category.categoryTitle}
                          </option>
                        ))}
                      </Input>
                    </div>

                    <Container className="text-center">
                      <Button
                        type="submit"
                        color="primary"
                        className="rounded-0"
                      >
                        Update Job
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

  return (
    <Base>
      <Container>{post && updateHtml()}</Container>
    </Base>
  );
}

export default UpdateBlog;
