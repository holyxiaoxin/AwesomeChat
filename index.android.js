'use strict';
import App from './src/App';
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
