import React from 'react';
import Button from 'react-bootstrap/Button';


class Application extends React.Component {
  render() {
    return (
      <div className="App">
        <Button onClick={() => toggleShow(true)}>Show Toast</Button>
      </div>
    );
  }
}

export default Application;