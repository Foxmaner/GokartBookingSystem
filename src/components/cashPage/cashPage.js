import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Chart from "react-apexcharts";

class AnalyticsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        series: [{
            name: 'Stora',
            data: [5, 1, 2, 3, 5, 2, 1, 1, 3, 4]
          }, {
            name: 'Små',
            data: [4, 1, 0, 2, 3, 1, 0, 1, 3, 4]
          }, {
            name: 'Dubbla',
            data: [1, 2, 2, 0, 2, 1, 2, 1, 3, 4]
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
                categories: [1,2,3,4,5,6,7,8,9,10],
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
      <Container className="app">
        <Row className="justify-content-md-center">
            <Col className="d-grid" md="8">

                <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="100%"
                />

            </Col>
        </Row>
      </Container>
    );
  }
}

export default AnalyticsPage;