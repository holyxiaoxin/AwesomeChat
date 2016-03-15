'use strict';
import Register from './Register';
import Chat from './Chat';
import React, {
  Component,
  Navigator
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={this.initialRoute()}
        renderScene={this.renderScene.bind(this)}
        configureScene={this.configureScene.bind(this)}
      />
    );

  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Register') {
      return (
        <Register
          navigator={navigator}
        />
      );
    } else if (routeId === 'Chat') {
      return (
        <Chat
          navigator={navigator}
          user={route.user}
          data={route.data}
        />
      )
    }
  }

  initialRoute() {
    return {id: 'Register', name: 'Register'};
  }

  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <Text> No Route matching </Text>
      </View>
    );
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromBottomAndroid;
  }
}
