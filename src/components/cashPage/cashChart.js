import React from 'react';
import Chart from "react-apexcharts";
class CashChart extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props.largeKarts)
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

      render() {
        return (
                    <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    width="100%"
                    />
        );
      }
}

export default CashChart;