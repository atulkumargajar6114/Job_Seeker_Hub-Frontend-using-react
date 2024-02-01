import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

const ViewUserProfile = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);

  return (
    <Container>
      <Row>
        <Col md={6} className="mt-5">
          <img
            src="https://png.pngtree.com/background/20230812/original/pngtree-people-icon-set-icon-page-photo-picture-image_4613395.jpg"
            style={{ width: "550px", height: "550px" }}
          />
        </Col>
        <Col md={6} className="mt-3">
          <Card
            className="mt-2 border-0 rounded-0 shadow-sm"
            style={{ width: "550px" }}
          >
            <CardBody>
              <h3 className="text-uppercase text-center">User Information</h3>
              <Container className="text-center">
                <div className="d-flex justify-content-center">
                  <img
                    style={{ maxWidth: "250px", maxHeight: "250px" }}
                    src={
                      user.image
                        ? user.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8EWjAQd_s7xdQcKqjkPtsZCLZWzxP3dK0EQ&usqp=CAU"
                    }
                    alt="user profile picture"
                    className="img-fluid"
                  />
                </div>
              </Container>
              <Table
                responsive
                striped
                hover
                bordered={true}
                className="text-center mt-5"
              >
                <tbody>
                  <tr>
                    <td>User-Id</td>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <td>User-Name</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>User-Email</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>User-About</td>
                    <td>{user.about}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>
                      {user.roles.map((role) => {
                        return <div key={role.id}>{role.name}</div>;
                      })}
                    </td>
                  </tr>
                </tbody>
              </Table>
              {currentUser ? (
                currentUser.id == user.id ? (
                  <CardFooter className="text-center">
                    <Button color="warning">Update Profile</Button>
                  </CardFooter>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewUserProfile;
