import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  // handleChange
  const handleChange = (event, property) => {
    //dyanamic setting the value
    setData({ ...data, [property]: event.target.value });
  };

  // resetting the form
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  // submit the form
  const submitForm = (event) => {
    event.preventDefault();
    // if(error.isError){
    //   toast.error("Form data is invalid ,correct all details then submit");
    //   setError({
    //     ...error,isError:false
    //   })
    //   return;
    // }
    console.log(data);
    //data validate
    // Form validation
    if (!data.name || !data.email || !data.password || !data.about) {
      toast.error("Please fill out all the fields.");
      return;
    }

    //call server api for sending the data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("user is registered successfully !! user id "+resp.id);
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.error(error);
        console.log("Error log");
        //handle error  in proper way
        setError({
          errors:error,
          isError:true
        })
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          {/* {JSON.stringify(data)} */}
          <Col md={6}>
            <img src="https://www.arca24.com/en/wp-content/uploads/2022/02/form-register-arca24.jpg" alt="signup" style={{width:'600px' ,height:'600px'}}/>
          </Col>

          <Col md={6}>
            <Card color="secondary" outline>
              <CardHeader className="text-center">
                <h3>Fill Information to Register !!</h3>
              </CardHeader>
              <CardBody>
                {/* Creating form */}
                <Form onSubmit={submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={error.errors?.response?.data?.name?true:false}
                    />
                  </FormGroup>
                  <FormFeedback>
                    {error.errors?.response?.data?.name}
                  </FormFeedback>

                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={error.errors?.response?.data?.email?true:false}
                    />
                  </FormGroup>
                  <FormFeedback>
                    {error.errors?.response?.data?.email}
                  </FormFeedback>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={error.errors?.response?.data?.password?true:false}
                    />
                  </FormGroup>
                  <FormFeedback>
                    {error.errors?.response?.data?.password}
                  </FormFeedback>


                  {/* about field */}
                  <FormGroup>
                    <Label for="about">Enter About</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter here"
                      id="about"
                      style={{ height: "150px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="success">
                      Register
                    </Button>
                    <Button
                      onClick={resetData}
                      outline
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Signup;
