import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default function SettingsSlide() {
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
                    <Form>
                            <Form.Group className="mb-3">
                                <Form.Check type="checkbox" label="Säkerhetskopiera på extern server"/>
                                <Form.Text className="text-muted">
                                Fungerar endast om ni köpt till extern serverlagring (Säkerhetskopiering), fråga Eskil om ni är osäkra på uppgifterna
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formServerAdress">
                                <Form.Label>Server Address</Form.Label>
                                <Form.Control type="text" minLength="7" maxLength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" placeholder="Skriv IP:addressen" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formServerPort">
                                <Form.Label>Port nummer</Form.Label>
                                <Form.Control type="number" placeholder="Port nummer" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDbName">
                                <Form.Label>Databasens namn</Form.Label>
                                <Form.Control type="text" placeholder="Databas namn" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>Användarnamn</Form.Label>
                                <Form.Control type="text" placeholder="Användarnamn" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Lösenord</Form.Label>
                                <Form.Control type="password" placeholder="Lösenord" />
                            </Form.Group>
                    
                    </Form>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Avbryt
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Spara ändringar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  