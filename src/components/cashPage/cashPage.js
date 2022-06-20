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
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import FloatingLabel from "react-bootstrap/FloatingLabel"


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
    this.afterSubmission = this.afterSubmission.bind(this);

    this.child = React.createRef();
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

  afterSubmission(event) {
    event.preventDefault();
    let form = event.target
    
    let formData = {diffLargeKarts:form.inputLargeKarts.value,
       diffSmallKarts:form.inputSmallKarts.value,
        diffDoubleKarts:form.inputDoubleKarts.value,
        deleteMode:form.isDeleteMode.checked,
        affectedRace:this.state.CurrentRaceToManipulateOutput||0};

    event.target.reset();
    this.child.current.editRaceDataCaller(formData);
   
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
        <Row className="justify-content-md-center">
          <Col className="text-center" id="largeKartOutput" style={{ fontSize: "7vh" }}>Race: {this.state.CurrentRaceToManipulateOutput + 1 || 1}</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Form onSubmit = {this.afterSubmission}>
            <Row>

              <InputGroup className="mb-3">
                <Col md>
                  <FloatingLabel controlId="floatingSelect" label="Antal stora">
                    <Form.Select aria-label="Antal Stora" name="inputLargeKarts" ref="inputLargeKarts">
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md>
                  <FloatingLabel controlId="floatingSelect" label="Antal stora">
                    <Form.Select aria-label="Antal Små" name="inputSmallKarts" ref="inputSmallKarts">
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md>
                  <FloatingLabel controlId="floatingSelect" label="Antal stora">
                    <Form.Select aria-label="Antal Dubbla" name="inputDoubleKarts" ref="inputDoubleKarts">
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

              </InputGroup>

            </Row>




            <Row>

              <InputGroup className="mb-3">
                <Col md>
                  <Form.Check
                  
                    type="switch"
                    id="custom-switch"
                    label="Delete mode (Tar bort specificerat antal)"
                    name="isDeleteMode" ref="isDeleteMode"
                  />
                </Col>

                <Col md>
                  <Button type="submit">Lägg till ändringar</Button>
                </Col>

                <Col md>
                <Button type="reset" value="Reset" variant="danger">Ta bort inputs</Button>
                </Col>

              </InputGroup>

            </Row>


          </Form>
        </Row>
        <Row className="justify-content-md-center" style={{ height: "50vh" }}>
          <Col className="d-grid" md="2">

          </Col>
          <Col className="d-grid" md="8">

            <CashChart ref={this.child} largeKarts={largeKartsList} smalKarts={smallKartsList} doubleKarts={doubleKartsList} xAxis={xAxisList} CurrentRaceToManipulateOutput={this.CurrentRaceToManipulateOutput} setSyncStatus={this.setSyncStatus} raceDatabase={this.state.raceDB} />

          </Col>
          <Col md="2">
            <Col>{"Nästa lopp: "}{this.state.nextRaceNr || 0}</Col>
            <Col>{"(Stora/Små/Dubbla)"}</Col>
            <Col>{this.state.nextRaceLarge || "Null"}{"/"}{this.state.nextRaceSmall || "Null"}{"/"}{this.state.nextRaceDouble || "Null"}</Col>
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