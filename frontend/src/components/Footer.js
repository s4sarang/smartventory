import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
class Footer extends Component {
  state = {};
  render() {
    return (
      <>
        <footer>
          <Container>
            <Row>
              <Col className='text-center py-3'>
                Thanks for using SmartVentory!
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Footer;
