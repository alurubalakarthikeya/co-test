import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const Warning = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>⚠️ Early Bird Registration Ending Soon!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Hurry up! The early bird registrations for <b>DSUMUN Edition II</b> is going to close on <b>March 10, 2025</b>. Don't miss out!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
        <Button variant="primary" onClick={() => window.location.href = "/dsumun2"}>
          Register Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Warning;
