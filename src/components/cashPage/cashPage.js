import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Chart from "react-apexcharts";
import CashChart from "./cashChart.js"

class AnalyticsPage extends React.Component {

  render() {
    return (
      <Container className="app bg-light shadow-5-strong">
        <Row className="justify-content-md-center">
          <Col id="largeKartOutput">Stora</Col>
          <Col id="smallKartOutput">Små</Col>
          <Col id="doubleKartOutput">Dubbla</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>0</Col>
          <Col>0</Col>
          <Col>0</Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col className="d-grid" md="8">

                <CashChart />

            </Col>
        </Row>
      </Container>
    );
  }
}

export default AnalyticsPage;