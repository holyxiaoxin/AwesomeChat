'use strict';
import App from './app/App';
import React, {
  AppRegistry,
  Component,
} from 'react-native';

class AwesomeChat extends Component {
  render() {
    return <App/>;
  }
}

AppRegistry.registerComponent('AwesomeChat', () => AwesomeChat);
