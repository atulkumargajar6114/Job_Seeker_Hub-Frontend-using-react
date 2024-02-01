import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import userContext from "../context/userContext";
const Services = () => {
  return (
    <userContext.Consumer>
      {(user) => (
        <Base>
          {/* <h1>
                    this is services page
                </h1>
                <h1>Welcome {user.user.login&&user.user.data.name}</h1> */}
          <Container>
            <Row>
              <Col className="mt-5">
                <img src="https://www.marketingtutor.net/wp-content/uploads/2020/01/What-is-Service-Marketing-Explained.jpg" alt="Service" style={{width:'600px',height:'500px'}} />
              </Col>
              <Col className="mt-3">
              <div className="service-page">
            <h2>Our Services</h2>
            <p>
              At JobSeekerHub, we offer a range of services to help job seekers
              and employers connect efficiently. Our services include:
            </p>
            <ul>
              <li>Job listings and job search tools</li>
              <li>Company profiles and branding for employers</li>
              <li>Industry-specific categorization of job listings</li>
              <li>Application tracking for job seekers</li>
              <li>
                Community engagement and discussions through our Comment Module
              </li>
              <li>Expert advice and insights sharing for career growth</li>
            </ul>

            <h3>Why Choose JobSeekerHub?</h3>
            <p>
              We are dedicated to making the job-seeking and hiring process
              seamless. Here's why you should choose JobSeekerHub:
            </p>
            <ul>
              <li>
                Our modular platform adapts to the dynamic employment landscape.
              </li>
              <li>We connect job seekers with employers efficiently.</li>
              <li>
                We foster a vibrant community of professionals sharing knowledge
                and insights.
              </li>
            </ul>

            <h3>Get Started Today</h3>
            <p>
              Whether you're a job seeker or an employer, JobSeekerHub is here
              to help you achieve your career goals. Sign up now and explore our
              services!
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

export default Services;
