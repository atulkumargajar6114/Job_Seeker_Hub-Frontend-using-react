import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { doLogin } from "../auth";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from "react";

const Login = () => {

    const userContextData=useContext(userContext)


  const navigate=useNavigate()

  const[loginDetail,setLoginDetail]=useState({
    username:'',
    password:''
  })


  const handleChange=(event,field)=>{
    let actualValue=event.target.value
    setLoginDetail({
      ...loginDetail,
      [field]:actualValue
    })
  }

  const handleReset=()=>{
    setLoginDetail({
      username:'',
      password:''
    })
  }

  const handleFormSubmit=(event)=>{
    event.preventDefault();
    console.log(loginDetail);
    if(loginDetail.username.trim()==''|| loginDetail.password.trim()==''){
      toast.error("username or password is required !!")
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail).then((data)=>{
      console.log(data)
      //save the data to local storage
      doLogin(data,()=>{
        console.log("login detail is saved to local storage")
        //redirect to user dashboard page
        userContextData.setUser({
          data:data.user,
          login:true
        })

        navigate("/user/dashboard")
        
      })


      toast.success("login Success")
    }).catch(error=>{
      console.log(error)
      if(error.response.status==400 || error.response.status==404){
        toast.error(error.response.data.message)
      }else{
        toast.error("Something went wrong on server !!")
      }
      
    })
    
  }



  return (
    <Base>
      <Container>
        <Row className="mt-4" >
          <Col md={6}>
            <img src="https://t3.ftcdn.net/jpg/03/70/92/84/360_F_370928450_R6g8c0j5cey86PUXE32W7KMiqIUe1fOI.jpg" alt=""/>
          </Col>
          <Col md={6}>
            <Card color="secondary" outline style={{width:'450px',height:'350px'}}>
              <CardHeader className="text-center">
                <h3> Login Here !!</h3>
              </CardHeader>
              <CardBody>
                {/* Creating form */}
                <Form onSubmit={handleFormSubmit}>
                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input type="email" placeholder="Enter here" id="email" value={loginDetail.username} onChange={(e)=>handleChange(e,'username')}/>
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e)=>handleChange(e,'password')}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="dark">
                      Login
                    </Button>
                    <Button
                      outline
                      color="secondary"
                      type="reset"
                      className="ms-2"
                      onClick={handleReset}
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

export default Login;
