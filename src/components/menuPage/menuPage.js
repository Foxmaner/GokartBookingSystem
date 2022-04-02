import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LinkContainer } from 'react-router-bootstrap'


class MenuPage extends React.Component {
  render() {
    return (
      
      <Container fluid="lg">
        <Row className="justify-content-md-center mt-5">
          <Col className="d-grid" md="8">
            <LinkContainer to="/analytics">
              <Button variant="primary" size="lg" disabled>
                Analys
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col className="d-grid" md="8">
          <LinkContainer to="/cashier">
              <Button variant="primary" size="lg">
                Kassa
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col className="d-grid" md="8">
          <LinkContainer to="/depot">
              <Button variant="primary" size="lg" disabled>
                Depå
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col className="d-grid" md="8">
          <LinkContainer to="/settings">
              <Button variant="primary" size="lg" disabled>
                Inställningar
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MenuPage;