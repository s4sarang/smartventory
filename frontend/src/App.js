import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screen/HomeScreen';
import AssetScreen from './screen/AssetScreen';
import AssetListScreen from './screen/AssetListScreen';
import AssetEditScreen from './screen/AssetEditScreen';
import RequestsScreen from './screen/RequestsScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProfileScreen from './screen/ProfileScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import OrderListScreen from './screen/OrderListScreen';
import UserListScreen from './screen/UserListScreen';
import UserEditScreen from './screen/UserEditScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Header />
        <main>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/login' component={LoginScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentMethodScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/assets/:dlink' component={AssetScreen} />
            <Route path='/admin/assetlist' component={AssetListScreen} exact />
            <Route
              path='/admin/assetlist/:pageNumber'
              component={AssetListScreen}
              exact
            />
            <Route path='/admin/assets/:dlink' component={AssetEditScreen} />
            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route path='/requests/:dlink?' component={RequestsScreen} />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
            />
          </Container>
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
