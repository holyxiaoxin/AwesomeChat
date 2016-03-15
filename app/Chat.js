'use strict';
import _ from 'lodash';
import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.ref = new Firebase("https://native-example.firebaseio.com/");
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.ref.on("value", (snapshot) => {
      let snapshotVal = snapshot.val();
      if (typeof snapshotVal !== 'undefined' && snapshotVal !== null) {
        Object.assign(snapshotVal, {loaded: true});
        this.setState(Object.assign(this.state, snapshotVal));
      } else {
        this.gotoRegister();
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  render() {
    return (
      this.state.loaded ?
      <View style={styles.container}>
        <ScrollView>
        <Text style={styles.header}>
          You are logged in as: {this.user}
        </Text>
        {
          _.map(this.state.messages, (messageObject, key) => {
              return this.renderMessage(messageObject, key);
          })
        }
        <View style={styles.textInput}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState(Object.assign(this.state, {text}))}
            onSubmitEditing={this.sendMessage.bind(this)}
            value={this.state.text} />
        </View>
        </ScrollView>
      </View>
       :
      <Text>loading</Text>
    );
  }

  renderMessage(messageObject, key) {
    const obj = messageObject;
    return (
      <View key={key} style={styles.messageWrapper}>
        <Text style={styles.message}>{obj.user}: {obj.message}</Text>
      </View>
    );
  }

  sendMessage(event) {
    const text = event.nativeEvent.text;
    const message = { message: text, user: this.user };
    this.setState(Object.assign(this.state, {text: ''}));
    this.ref.child('messages').push(message, (errorObject) => {
      if (errorObject) {
        console.log("The save failed: " + errorObject.code);
      }
    });
  }

  gotoRegister() {
    const nextIndex = this.props.routerIndex+1;
    this.props.navigator.push({
      id: 'Register',
      name: 'Register'
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    margin: 10
  },
  messageWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 14,
    margin: 5
  },
  textInput: {
    justifyContent: 'flex-end',
    margin: 10
  }
});
