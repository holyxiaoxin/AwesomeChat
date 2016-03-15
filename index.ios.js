'use strict';
import App from './app/App';
import React, {
  AppRegistry,
  Component,
} from 'react-native';

class AwesomeProject extends Component {
  render() {
    return <App/>;
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
