import React from 'react';
import Chart from "react-apexcharts";
import * as MyLib from "./myChartLib.js"
import Button from 'react-bootstrap/Button';
import PouchDB from 'pouchdb';
import upsert from 'pouchdb-upsert';
import Col from 'react-bootstrap/Col';
PouchDB.plugin(upsert);

import DB from '../db.js'
class CashChart extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      db: new DB("RaceDataDB"),
      remoteDB: new PouchDB('http://localhost:5984/myremotedb'),
      settingsDB: new DB("SettingsDB"),
      timeout: 0,
      raceToManipulate: 0,
      raceToManipulateLargeKarts: 0,
      raceToManipulateSmalKarts: 0,
      raceToManipulateDoubleKarts: 0,
      currentRaceNr:0,
      raceData: [{ "raceID": "24", "raceNr": "1", "largeKart": "0", "smallKart": "0", "doubleKart": "0", "raceDate": "2021-11-16 11:37:36" }],
      series: [{
        name: 'Stora',
        data: [],
      }, {
        name: 'Små',
        data: [],
      }, {
        name: 'Dubbla',
        data: [],
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false,
        },
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            dynamicAnimation: {
              enabled: true,
              speed: 100
            },
            animateGradually: {
              enabled: false
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          show: false
        },
        tooltip: {
          enabled: false
        },
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
          hover: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
          active: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
        },
        title: {
          text: 'Aktuella bokningar'
        },
        yaxis: {
          title: {
            text: undefined
          },
          min: 0,
          max: 12,
          tickAmount: 6,
          labels: {
            show: true,
          },
        },
        xaxis: {
          categories: this.props.xAxis,
          tickPlacement: 'between',
          tickAmount: 11,
        },
        annotations: {
          yaxis: [{
            y: 10,
            borderColor: "red",
            label: {
              borderColor: "black",
              style: {
                color: "#fff",
                background: "red"
              },
              text: "Maxgräns"
            }
          }]
        },
        fill: {
          opacity: 1
        },
      },


    };




    this.keyEventFunction = this.keyEventFunction.bind(this);

  }


  updateChart(dataSets) {
    const self = this;
    var dataSet1 = dataSets.dataPack1;
    var dataSet2 = dataSets.dataPack2;
    var dataSet3 = dataSets.dataPack3;
    var dataSet4 = dataSets.raceNr;
    this.setState({
      series: [{
        name: 'Stora',
        data: dataSet1,
      }, {
        name: 'Små',
        data: dataSet2,
      }, {
        name: 'Dubbla',
        data: dataSet3,
      }],
      options: {
        chart: {
          toolbar: {
            show: true,
            tools: {
              customIcons: [{
                icon: '<img src="assets/appPictures/printIcon.png" width="20">',
                index: 1,
                title: 'tooltip of the icon',
                class: 'custom-icon',
                click: function (chart, options, e) {
                  MyLib.printTodayData(self.state.raceData);
                }
                }]
          },
        },
        },
        xaxis: {
          categories: dataSet4,
        },
        annotations: {
          xaxis: [{
            x: this.state.currentRaceNr,
            borderColor: "red",
            label: {
              orientation: 'horizontal',
              offsetY: 0,
              style: {
                color: "#fff",
                background: "red"
              },
              text: 'Aktuellt race',
            }
          }]
        },
      },
      
    })
  };

  async editCurrentRaceNr(newCurrentRaceNr){
    await this.state.db.setCurrentRaceNrDB(newCurrentRaceNr);
  }

  editRaceData(raceToManipulate, raceData, kartType, action) {
    if (action == "add") {
      if (kartType == "large") {
        this.state.raceData[raceToManipulate].largeKart = '' + (parseInt(this.state.raceData[raceToManipulate].largeKart) + 1);
      } else if (kartType == "smal") {
        this.state.raceData[raceToManipulate].smallKart = '' + (parseInt(this.state.raceData[raceToManipulate].smallKart) + 1);
      } else if (kartType == "double") {
        this.state.raceData[raceToManipulate].doubleKart = '' + (parseInt(this.state.raceData[raceToManipulate].doubleKart) + 1);
      }
    } else if (action == "remove") {
      if (kartType == "large") {
        this.state.raceData[raceToManipulate].largeKart = '' + (parseInt(this.state.raceData[raceToManipulate].largeKart) - 1);
      } else if (kartType == "smal") {
        this.state.raceData[raceToManipulate].smallKart = '' + (parseInt(this.state.raceData[raceToManipulate].smallKart) - 1);
      } else if (kartType == "double") {
        this.state.raceData[raceToManipulate].doubleKart = '' + (parseInt(this.state.raceData[raceToManipulate].doubleKart) - 1);
      }
    }
  }


  async keyEventFunction(event) {
    //Dont listen if settings are open
    if (document.activeElement.id != "mainBody") { return }
    if (event.repeat) { return }
    console.log(this.state.raceData)
    var cooler= await this.state.db.getCurrentRaceNrDB();
    console.log(cooler)
    clearTimeout(this.state.timeout);
    if (event.keyCode === 27) {
      this.state.raceData = await this.state.db.getRaceDataDB(this.state.raceData);
    } else if (event.keyCode === 37 && this.state.raceToManipulate > 0) {
      this.state.raceToManipulate--
      if (typeof this.state.raceData[this.state.raceToManipulate] == 'undefined') {
        this.state.raceData[this.state.raceToManipulate] = { "raceID": "24", "raceNr": "" + (this.state.raceToManipulate + 1), "largeKart": "0", "smallKart": "0", "doubleKart": "0", "raceDate": "2021-11-16 11:37:36" }
      }
    } else if (event.keyCode === 39) {
      this.state.raceToManipulate++
      if (typeof this.state.raceData[this.state.raceToManipulate] == 'undefined') {
        this.state.raceData[this.state.raceToManipulate] = { "raceID": "24", "raceNr": "" + (this.state.raceToManipulate + 1), "largeKart": "0", "smallKart": "0", "doubleKart": "0", "raceDate": "2021-11-16 11:37:36" }
      }
    } else if (event.keyCode === 81 && this.state.raceData[this.state.raceToManipulate].largeKart > 0 && this.state.raceData[this.state.raceToManipulate].largeKart <= 10) {
      this.state.raceToManipulateLargeKarts--
      this.editRaceData(this.state.raceToManipulate, this.state.raceData, "large", "remove");
    } else if (event.keyCode === 87 && this.state.raceData[this.state.raceToManipulate].largeKart >= 0 && this.state.raceData[this.state.raceToManipulate].largeKart < 10) {
      this.state.raceToManipulateLargeKarts++
      this.editRaceData(this.state.raceToManipulate, this.state.raceData, "large", "add");
    } else if (event.keyCode === 65 && this.state.raceData[this.state.raceToManipulate].smallKart > 0 && this.state.raceData[this.state.raceToManipulate].smallKart <= 6) {
      this.state.raceToManipulateSmalKarts--
      this.editRaceData(this.state.raceToManipulate, this.state.raceData, "smal", "remove");
    } else if (event.keyCode === 83 && this.state.raceData[this.state.raceToManipulate].smallKart >= 0 && this.state.raceData[this.state.raceToManipulate].smallKart < 6) {
      this.state.raceToManipulateSmalKarts++
      this.editRaceData(this.state.raceToManipulate, this.state.raceData, "smal", "add");
    } else if (event.keyCode === 90 && this.state.raceData[this.state.raceToManipulate].doubleKart > 0 && this.state.raceData[this.state.raceToManipulate].doubleKart <= 2) {
      this.state.raceToManipulateDoubleKarts--
      this.editRaceData(this.state.raceToManipulate, this.state.raceData, "double", "remove");
    } else if (event.keyCode === 88 && this.state.raceData[this.state.raceToManipulate].doubleKart >= 0 && this.state.raceData[this.state.raceToManipulate].doubleKart < 2) {
      this.state.raceToManipulateDoubleKarts++
      this.editRaceData(this.state.raceToManipulate, this.state.raceData, "double", "add");
    }else if (event.keyCode === 38 && this.state.currentRaceNr < this.state.raceData.length) {
      this.setState({currentRaceNr:(this.state.currentRaceNr+1)})
      await this.editCurrentRaceNr(this.state.currentRaceNr);
    }else if (event.keyCode === 40 && this.state.currentRaceNr > 0) {
      this.setState({currentRaceNr:(this.state.currentRaceNr-1)})
      await this.editCurrentRaceNr(this.state.currentRaceNr);
    };
    console.log("CurrentRaceNr =" + this.state.currentRaceNr)
    this.props.CurrentRaceToManipulateOutput(this.state.raceToManipulate, this.state.raceData[this.state.raceToManipulate].largeKart, this.state.raceData[this.state.raceToManipulate].smallKart, this.state.raceData[this.state.raceToManipulate].doubleKart, this.state.raceData[this.state.currentRaceNr]);
    const self = this;
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    this.setState({
      timeout: setTimeout(async function () {

        self.updateChart(MyLib.createDatasets(self.state.raceData, self.state.raceToManipulate));
        self.state.db.updateRace(self.state.raceData);

        await self.state.db.db.sync(self.state.remoteDB).on('complete', function () {
          console.log("Synced")
          self.props.setSyncStatus(true, "")
        }).on('error', function (err) {
          console.log("Not synced: " + err)
          self.props.setSyncStatus(false, JSON.stringify(err))
        });
      }, 250)
    });



  };
  async componentDidMount() {
    const self = this;
    await this.state.db.db.sync(this.state.remoteDB).on('complete', function () {

    }).on('error', function (err) {
      alert("Datan kunde inte synkas på upstart, datan fortsätt lagras lokalt: " + err);
      self.props.setSyncStatus(false, JSON.stringify(err))
    });
    document.addEventListener("keydown", this.keyEventFunction, false);
    this.state.raceData = await this.state.db.getRaceDataDB(this.state.raceData);
    this.updateChart(MyLib.createDatasets(this.state.raceData, this.state.raceToManipulate));
    var cooler = await this.state.settingsDB.getSyncSettings();
    await this.setState({ remoteDB: new PouchDB("http://" + cooler.formServerAdress + ":" + cooler.formServerPort + "/" + cooler.formDbName) })
  };
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyEventFunction, false);
  };



  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          annotations={this.state.annotations}
          type="bar"
          width="100%"
          height="100%"
        />

      </div>
    );

  }
}

export default CashChart;