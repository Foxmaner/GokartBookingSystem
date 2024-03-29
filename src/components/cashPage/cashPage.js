import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Logo from '../../../src/assets/appPictures/cashIcon.png'
import Chart from "react-apexcharts";
import CashChart from "./cashChart.js"
import { LinkContainer } from 'react-router-bootstrap'
import SettingsSlide from "./settingsSlide.js"
import DB from "../db";


class AnalyticsPage extends React.Component {
  constructor(props) {
    super(props)
    this.CurrentRaceToManipulateOutput = this.CurrentRaceToManipulateOutput.bind(this)
    this.state = {
      raceDB: new DB("RaceDataDB"),
      isValid: true,
      syncErrorMessage: "",
      settingsDB: new DB("SettingsDB"),
      settings: ""
    }
    this.setSyncStatus = this.setSyncStatus.bind(this);
  };



  CurrentRaceToManipulateOutput(raceNr, largeKarts, smallKarts, doubleKarts, nextRaceData) {
    console.log("nextRaceData")
    console.log(nextRaceData)
    this.setState({
      CurrentRaceToManipulateOutput: raceNr,
      CurrentRaceLarge: largeKarts,
      CurrentRaceSmall: smallKarts,
      CurrentRaceDouble: doubleKarts,
      nextRaceNr: nextRaceData.raceNr,
      nextRaceLarge: nextRaceData.largeKart,
      nextRaceSmall: nextRaceData.smallKart,
      nextRaceDouble: nextRaceData.doubleKart,
    })
  };

  setSyncStatus(isValidSync, errorMessage) {
    if (isValidSync) {
      this.setState({
        isValid: true
      })
    } else {

      errorMessage = JSON.parse(errorMessage);
      var errorType = errorMessage["error"]
      var errorReason = errorMessage["reason"]
      this.setState({
        isValid: false,
        syncErrorMessage: "ErrorType:" + errorType + " --- ErrorReason: " + errorReason
      })
    }
  }

  async componentDidMount() {
    var cooler = await this.state.settingsDB.getSyncSettings();
    this.setState({ settings: cooler })
  }



  render() {

    var largeKartsList = [1, 2, 3, 1, 3, 2, 4, 2, 4, 1, 1]
    var smallKartsList = [1, 2, 3, 1, 3, 2, 4, 5, 1, 1, 1]
    var doubleKartsList = [1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 1]
    var xAxisList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    return (
      <Container className="app bg-light shadow-5-strong" >
        <Row className="justify-content-md-center mt-5">

          <LinkContainer to="/">
            <Button variant="primary" size="lg" >
              Kassa
            </Button>
          </LinkContainer>

        </Row>
        <Row className="justify-content-md-center">
          {this.state.isValid
            ? <Alert className="text-center" variant="success">Datan syncas mot en extern databas</Alert>
            : <Alert className="text-center" variant="danger">Kunde inte synca till externa databasen, datan sparas fortfarande lokalt <br></br>
              Error -- {this.state.syncErrorMessage}</Alert>
          }
        </Row>
        <Row className="justify-content-md-center" style={{ height: "7vh" }}>
          <Col className="text-center" id="largeKartOutput" style={{ fontSize: "7vh" }}>Race: {this.state.CurrentRaceToManipulateOutput + 1 || 1}</Col>
        </Row>
        <Row className="justify-content-md-center" style={{ height: "5vh" }}>
          <Col className="text-center" id="largeKartOutput" style={{ fontSize: "5vh" }}>Stora</Col>
          <Col className="text-center" id="smallKartOutput" style={{ fontSize: "5vh" }}>Små</Col>
          <Col className="text-center" id="doubleKartOutput" style={{ fontSize: "5vh" }}>Dubbla</Col>
        </Row>
        <Row className="justify-content-md-center" style={{ height: "5vh" }}>
          <Col className="text-center" style={{ fontSize: "5vh" }}>{this.state.CurrentRaceLarge || 0}</Col>
          <Col className="text-center" style={{ fontSize: "5vh" }}>{this.state.CurrentRaceSmall || 0}</Col>
          <Col className="text-center" style={{ fontSize: "5vh" }}>{this.state.CurrentRaceDouble || 0}</Col>
        </Row>
        <Row className="justify-content-md-center" style={{ height: "50vh" }}>
        <Col className="d-grid" md="2">
          
          </Col>
          <Col className="d-grid" md="8">

            <CashChart largeKarts={largeKartsList} smalKarts={smallKartsList} doubleKarts={doubleKartsList} xAxis={xAxisList} CurrentRaceToManipulateOutput={this.CurrentRaceToManipulateOutput} setSyncStatus={this.setSyncStatus} raceDatabase={this.state.raceDB}/>

          </Col>
          <Col md="2">
            <Col>{"Nästa lopp: "}{this.state.nextRaceNr || 0}</Col>
            <Col>{"(Stora/Små/Dubbla)"}</Col>
            <Col>{this.state.nextRaceLarge || "Null"}{"/"}{this.state.nextRaceSmall || "Null" }{"/"}{this.state.nextRaceDouble || "Null"}</Col>
          </Col>
        </Row>
        <Row className="justify-content-md-center" style={{ fontSize: "5vh", height: "5vh" }}>
          <Col className="d-grid" md="8">
          <SettingsSlide settings={this.state.settings} ></SettingsSlide>
          </Col>
        </Row>
        
      </Container>

    );
  }
}

export default AnalyticsPage;