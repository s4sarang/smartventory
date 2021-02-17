import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Assets = ({ display }) => {
  return (
    <>
      <Card
        className='my-3 p-3 rounded'
        style={{ width: '14rem' }}
        border='success'
      >
        <Link to={`/assets/${display.link}`}>
          <Card.Img src={display.path} variant='top' />
        </Link>
        <Card.Title as='div'>
          <Link to={`/assets/${display.link}`}>
            <div>{`${display.brand} ${display.model}`}</div>
          </Link>
        </Card.Title>
        <Link to={`/assets/${display.category}`}>
          <Button variant='primary'>
            <Badge className='my-0 mx' variant='light'>
              Category:
            </Badge>
            {` `}
            <Badge className='my-0' variant='dark'>
              {display.category}
            </Badge>
          </Button>
        </Link>
        <Card.Text as='div'>
          <div className='my-2'>
            This device was launched in {display.launch} and purchased at Rs.
            {display.price}/-
          </div>
        </Card.Text>
      </Card>
    </>
  );
};

export default Assets;
