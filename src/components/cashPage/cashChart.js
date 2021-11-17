import React from 'react';
import Chart from "react-apexcharts";
import * as MyLib from "./myChartLib.js"
import Button from 'react-bootstrap/Button';
class CashChart extends React.Component{
    constructor(props) {
        super(props);
        //console.log(this.props.largeKarts)
        this.state = {
            series: [{
                name: 'Stora',
                data: this.props.largeKarts,
              }, {
                name: 'Små',
                data: this.props.smalKarts,
              }, {
                name: 'Dubbla',
                data: this.props.doubleKarts,
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 350,
                  stacked: true,
                  toolbar: {
                    show: false
                  },
                  zoom: {
                    enabled: false
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
      }
      updateChart(dataSets){
        var dataSet1 = dataSets.dataPack1;
        var dataSet2 = dataSets.dataPack2;
        var dataSet3 = dataSets.dataPack3;
        console.log("baLLER" + dataSet1);
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
          }]
        })
      }

      

      render() {
        {var testArray = [{"raceID":"24","raceNr":"1","largeKart":"2","smallKart":"0","doubleKart":"0","raceDate":"2021-11-16 11:37:36"},{"raceID":"25","raceNr":"2","largeKart":"0","smallKart":"3","doubleKart":"0","raceDate":"2021-11-16 22:48:04"},{"raceID":"26","raceNr":"3","largeKart":"0","smallKart":"4","doubleKart":"0","raceDate":"2021-11-16 22:48:08"},{"raceID":"27","raceNr":"4","largeKart":"1","smallKart":"0","doubleKart":"0","raceDate":"2021-11-16 22:48:08"},{"raceID":"28","raceNr":"5","largeKart":"0","smallKart":"0","doubleKart":"0","raceDate":"2021-11-16 22:52:56"},{"raceID":"29","raceNr":"6","largeKart":"2","smallKart":"2","doubleKart":"2","raceDate":"2021-11-16 22:52:56"}]
        }
        //console.log(MyLib.createDatasets(testArray).dataPack1);
        
        //this.cooler();
        return (
                <div>
                    <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    width="100%"
                    />
                <Button onClick={() => { this.updateChart(MyLib.createDatasets(testArray)) }} variant="primary" size="lg">
                Kassa
              </Button>
                </div>   
                    
                    
        );
        
      }
}

export default CashChart;