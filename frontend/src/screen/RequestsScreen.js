import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Form, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { raiseRequests } from '../actions/requestsActions';

const RequestsScreen = ({ match, location, history }) => {
  // const assetLink = match.params.count;

  // const dispatch = useDispatch();

  // const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // console.log(match.params.dlink);

  // useEffect(() => {
  //   if (assetLink) {
  //     dispatch(raiseRequests(assetLink, qty));
  //   }
  // }, [dispatch, assetLink, qty]);

  return <>Requests</>;
};

export default RequestsScreen;
