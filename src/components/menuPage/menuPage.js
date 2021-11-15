import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class Application extends React.Component {
  render() {
    return (
      
      <Container fluid="lg">
        <Row className="justify-content-md-center mt-5">
          <Col className="d-grid" md="8">
            <Button variant="primary" size="lg">
              Analys
           </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col className="d-grid" md="8">
            <Button variant="primary" size="lg">
              Kassa
           </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col className="d-grid" md="8">
            <Button variant="primary" size="lg">
              Depå
           </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col className="d-grid" md="8">
            <Button variant="primary" size="lg">
              Inställningar
           </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Application;