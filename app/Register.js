'use strict';
import _ from 'lodash';
import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class Register extends Component {
  constructor() {
    super();
    this.ref = new Firebase("https://native-example.firebaseio.com/");
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Awesome Chat!
        </Text>
        <Text style={styles.instructions}>
          Type in your username and hit enter
        </Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 1}}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this.login.bind(this)}
          value={this.state.text} />
      </View>
    );
  }

  login(event) {
    const user = event.nativeEvent.text;
    this.ref.once('value', (snapshot) => {
      const data = snapshot.val();
      var exists = data ? _.includes(data.users, user) : false;
      if(!exists) {
        this.ref.child('users').push(user, (errorObject) => {
          if (errorObject) {
            console.log("The save failed: " + errorObject.code);
          } else {
            this.gotoChat(user, data);
          }
        });
      } else {
        this.gotoChat(user, data);
      }
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    });
  }

  gotoChat(user, data) {
    const nextIndex = this.props.routerIndex+1;
    this.props.navigator.push({
      id: 'Chat',
      name: 'Chat',
      user: user,
      data: data
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
});
