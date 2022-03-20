import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default function SettingsSlide() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    alert("Sparat. Starta om programmet!")
  }



    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Ändra serverinställningar
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ändra serverinställningar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Check name="useExternalServer" type="checkbox" label="Säkerhetskopiera på extern server" onChange={handleChange}/>
                                <Form.Text className="text-muted">
                                Fungerar endast om ni köpt till extern serverlagring (Säkerhetskopiering), fråga Eskil om ni är osäkra på uppgifterna
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formServerAdress">
                                <Form.Label>Server Address</Form.Label>
                                <Form.Control name="formServerAdress" type="text" onChange={handleChange} minLength="7" maxLength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" placeholder="Skriv IP:addressen" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formServerPort">
                                <Form.Label>Port nummer</Form.Label>
                                <Form.Control name="formServerPort" onChange={handleChange} type="number" placeholder="Port nummer" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDbName">
                                <Form.Label>Databasens namn</Form.Label>
                                <Form.Control name="formDbName" onChange={handleChange} type="text" placeholder="Databas namn" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>Användarnamn</Form.Label>
                                <Form.Control name="formUsername" onChange={handleChange} type="text" placeholder="Användarnamn" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Lösenord</Form.Label>
                                <Form.Control name="formPassword" onChange={handleChange} type="password" placeholder="Lösenord" />
                            </Form.Group>
                            <Button type="submit">
                              Spara inställningarna
                            </Button>
                    </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  