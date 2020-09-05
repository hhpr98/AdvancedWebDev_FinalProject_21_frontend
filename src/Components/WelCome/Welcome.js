/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import Navigation from './navigation';
import Header from './header';
import Services from './services';
import Contact from './contact';
import JsonData from './data.json';

class Welcome extends Component {
  state = {
    landingPageData: {},
  }

  getlandingPageData() {
    this.setState({landingPageData : JsonData});
  }

  componentDidMount() {
    this.getlandingPageData();
  }

  render() {
    return (
      <div>
        <Navigation />
        <Header data={this.state.landingPageData.Header} />
        <Services data={this.state.landingPageData.Services} />
        <Contact data={this.state.landingPageData.Contact} />
      </div>
    );
  }
}
export default Welcome;
