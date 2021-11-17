import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Logo from '../../../src/assets/appPictures/cashIcon.png'
import Chart from "react-apexcharts";
import CashChart from "./cashChart.js"
import { LinkContainer } from 'react-router-bootstrap'

import * as MyLib from "./myChartLib.js"

import DB from "../db.js"

class AnalyticsPage extends React.Component {



  state = {
    db: new DB("RaceDB"),

  };
  
  async createRace(){
    const res = await this.state.db.setRace(1);
  };
  async fetchAllRace(){
    
    const races = await this.state.db.getAllRaces();
    console.log(races)
  };
  

  

  render() {
    var largeKartsList = [1, 2, 3, 1, 3, 2, 4, 2, 4, 1, 1]
    var smallKartsList = [1, 2, 3, 1, 3, 2, 4, 5, 1, 1, 1]
    var doubleKartsList = [1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 1]
    var xAxisList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    
    //MyLib.Funct1();

    return (
      <Container className="app bg-light shadow-5-strong">
        <Row className="justify-content-md-center mt-5">
       
            <LinkContainer to="/">
              <Button variant="primary" size="lg">
                Kassa
              </Button>
            </LinkContainer>
        
        </Row>
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
                
                <CashChart largeKarts={largeKartsList} smalKarts={smallKartsList} doubleKarts={doubleKartsList} xAxis={xAxisList}/>

            </Col>
        </Row>
      </Container>
    );
  }
}

export default AnalyticsPage;