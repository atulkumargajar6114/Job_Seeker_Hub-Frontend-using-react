import userContext from "../context/userContext";
import Base from "../components/Base";
import { Col, Container, Row } from "reactstrap";

const About = () => {
  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
          {/* <h1>this is about page</h1>
          <p>we are building job seeker hub</p>
          {console.log(object)}
          <h1>welcome user:{object.user.login && object.user.data.name}</h1> */}
          <Container>
          <Row>
            <Col className="mt-5" md={6}>
              <img src="https://st.depositphotos.com/1003593/3947/i/450/depositphotos_39479909-stock-photo-about-us-blue-marker.jpg" alt="About Us" style={{width:'600px',height:'500px'}}/>
            </Col>
            <Col className="mt-3" md={6}>
            <div className="about-page">
            <h2>About JobSeekerHub</h2>
            <p>
              Welcome to JobSeekerHub, a comprehensive job portal designed to
              make job searching and hiring processes more efficient.
            </p>
            <p>
              Our platform leverages a modular system comprising user, category,
              post, and comment modules to cater to the diverse needs of job
              seekers and employers in today's dynamic employment landscape.
            </p>
            <h3>Our Features</h3>
            <ul>
              <li>
                Users can create detailed profiles showcasing their skills and
                experience.
              </li>
              <li>
                Employers can establish their company's brand and connect with
                potential employees.
              </li>
              <li>
                Job listings are categorized by industry, making it easy to find
                the right job.
              </li>
              <li>
                Job seekers can explore job listings, apply, and track their
                applications.
              </li>
            </ul>

            <h3>Technology Stack</h3>
            <p>Our platform is built using a modern technology stack:</p>
            <ul>
              <li>Front-end: React.js</li>
              <li>Back-end: Spring Boot</li>
            </ul>

            <h3>Get Started</h3>
            <p>
              Ready to start your job search or find the perfect candidate? Sign
              up and explore the world of opportunities with JobSeekerHub.
            </p>
          </div>
            </Col>
          </Row>
          </Container>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default About;
