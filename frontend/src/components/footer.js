import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-10">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>eShop &copy;{currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
