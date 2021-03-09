import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screen/HomeScreen';
import AssetScreen from './screen/AssetScreen';
import RequestsScreen from './screen/RequestsScreen';
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
            <Route path='/assets/:dlink' component={AssetScreen} />
            <Route path='/requests/:dlink?' component={RequestsScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
