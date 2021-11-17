import React from 'react';
import Chart from "react-apexcharts";
import * as MyLib from "./myChartLib.js"
import Button from 'react-bootstrap/Button';
class CashChart extends React.Component{
    constructor(props) {
        super(props);
        //console.log(this.props.largeKarts)
        this.state = {
            raceToManipulate: 0,
            raceToManipulateLargeKarts: 0,
            raceToManipulateSmalKarts: 0,
            raceToManipulateDoubleKarts: 0,
            raceData:[{"raceID":"24","raceNr":"1","largeKart":"2","smallKart":"0","doubleKart":"0","raceDate":"2021-11-16 11:37:36"},{"raceID":"25","raceNr":"2","largeKart":"0","smallKart":"3","doubleKart":"0","raceDate":"2021-11-16 22:48:04"},{"raceID":"26","raceNr":"3","largeKart":"0","smallKart":"4","doubleKart":"0","raceDate":"2021-11-16 22:48:08"},{"raceID":"27","raceNr":"4","largeKart":"1","smallKart":"0","doubleKart":"0","raceDate":"2021-11-16 22:48:08"},{"raceID":"28","raceNr":"5","largeKart":"0","smallKart":"0","doubleKart":"0","raceDate":"2021-11-16 22:52:56"},{"raceID":"29","raceNr":"6","largeKart":"2","smallKart":"2","doubleKart":"2","raceDate":"2021-11-16 22:52:56"}],
            series: [{
                name: 'Stora',
                data: [0],
              }, {
                name: 'Små',
                data: [0],
              }, {
                name: 'Dubbla',
                data: [0],
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
            this.keyEventFunction = this.keyEventFunction.bind(this);
        
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
      };

      editRaceData(raceToManipulate,raceData,kartType,action){
        //console.log("add to race" + raceToManipulate);
        if(action == "add"){
          //console.log("add to race" + raceToManipulate);
          
          if(kartType == "large"){
            //console.log("add to raceLarge" + raceToManipulate);
            this.state.raceData[raceToManipulate].largeKart = '' + (parseInt(this.state.raceData[raceToManipulate].largeKart) + 1);
           // console.log(this.state.raceData)
          }else if(kartType == "smal"){
           // console.log("add to raceSmal" + raceToManipulate);
            this.state.raceData[raceToManipulate].smallKart = '' + (parseInt(this.state.raceData[raceToManipulate].smallKart) + 1);
          }else if(kartType == "double"){
           // console.log("add to raceDouble" + raceToManipulate);
            this.state.raceData[raceToManipulate].doubleKart = '' + (parseInt(this.state.raceData[raceToManipulate].doubleKart) + 1);
          }
        }else if(action == "remove"){
          //console.log("remove to race" + raceToManipulate);
          if(kartType == "large"){
            //console.log("remove to raceLarge" + raceToManipulate);
            this.state.raceData[raceToManipulate].largeKart = '' + (parseInt(this.state.raceData[raceToManipulate].largeKart) - 1);
            //console.log(this.state.raceData)
          }else if(kartType == "smal"){
            //console.log("remove to raceSmal" + raceToManipulate);
            this.state.raceData[raceToManipulate].smallKart = '' + (parseInt(this.state.raceData[raceToManipulate].smallKart) - 1);
          }else if(kartType == "double"){
            //console.log("remove to raceDouble" + raceToManipulate);
            this.state.raceData[raceToManipulate].doubleKart = '' + (parseInt(this.state.raceData[raceToManipulate].doubleKart) - 1);
          }
        }
        console.log(this.state.raceData);
      }
      keyEventFunction(event){
        if (event.repeat) { return }
        if(event.keyCode === 27) {
          console.log(this.state.raceData)
          this.updateChart(MyLib.createDatasets(this.state.raceData))
        }else if(event.keyCode === 37 && this.state.raceToManipulate > 0){
          this.state.raceToManipulate--
          
          console.log("modulateRace= " + this.state.raceToManipulate)
        }else if(event.keyCode === 39){
          this.state.raceToManipulate++
          
          console.log("modulateRace= " + this.state.raceToManipulate)
        }else if(event.keyCode === 81 && this.state.raceToManipulateLargeKarts > 0 && this.state.raceToManipulateLargeKarts <= 10){
          this.state.raceToManipulateLargeKarts--
          this.editRaceData(this.state.raceToManipulate,this.state.raceData,"large","remove");
          console.log("modulateRace= " + this.state.raceToManipulateLargeKarts)
        }else if(event.keyCode === 87 && this.state.raceToManipulateLargeKarts >= 0 && this.state.raceToManipulateLargeKarts < 10){
          this.state.raceToManipulateLargeKarts++
          this.editRaceData(this.state.raceToManipulate,this.state.raceData,"large","add");
          console.log("modulateRace= " + this.state.raceToManipulateLargeKarts)
        }else if(event.keyCode === 65 && this.state.raceToManipulateSmalKarts > 0 && this.state.raceToManipulateSmalKarts <= 6){
          this.state.raceToManipulateSmalKarts--
          this.editRaceData(this.state.raceToManipulate,this.state.raceData,"smal","remove");
          console.log("modulateRace= " + this.state.raceToManipulateSmalKarts)
        }else if(event.keyCode === 83 && this.state.raceToManipulateSmalKarts >= 0 && this.state.raceToManipulateSmalKarts < 6){
          this.state.raceToManipulateSmalKarts++
          this.editRaceData(this.state.raceToManipulate,this.state.raceData,"smal","add");
          console.log("modulateRace= " + this.state.raceToManipulateSmalKarts)
        }else if(event.keyCode === 90 && this.state.raceToManipulateDoubleKarts > 0 && this.state.raceToManipulateDoubleKarts <= 2){
          this.state.raceToManipulateDoubleKarts--
          this.editRaceData(this.state.raceToManipulate,this.state.raceData,"double","remove");
          console.log("modulateRace= " + this.state.raceToManipulateDoubleKarts)
        }else if(event.keyCode === 88 && this.state.raceToManipulateDoubleKarts >= 0 && this.state.raceToManipulateDoubleKarts < 2){
          this.state.raceToManipulateDoubleKarts++
          this.editRaceData(this.state.raceToManipulate,this.state.raceData,"double","add");
          console.log("modulateRace= " + this.state.raceToManipulateDoubleKarts)
        };
        this.updateChart(MyLib.createDatasets(this.state.raceData));
      };
      componentDidMount(){
        document.addEventListener("keydown", this.keyEventFunction, false);
      };
      componentWillUnmount(){
        document.removeEventListener("keydown", this.keyEventFunction, false);
      };

      

      render() {

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
                
                
                </div>   
                    
                    
        );
        
      }
}

export default CashChart;