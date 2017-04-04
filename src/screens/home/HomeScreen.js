import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { LoadingScreen } from '../../commons';
import { MyMeetupsList } from './components';

import { fetchMeetups } from './actions';
import Colors from '../../../constants/Colors';
import styles from './styles/HomeScreen';

@connect(
  state => ({
    meetups: state.home.meetups
  }),
  { fetchMeetups })
class HomeScreen extends Component {
  static navigationOptions = {
    header: ({ navigate }) => {
      const style = { backgroundColor: Colors.redColor };
      const right = (
        <TouchableOpacity style={styles.iconAdd}>
          <MaterialIcons
            name="add-circle"
            size={30}
            color="#fff"
            onPress={() => navigate('CreateMeetup')}
          />
        </TouchableOpacity>
      );

      return { style, right };
    },
    tabBar: {
      icon: ({ tintColor }) => (
        <FontAwesome
          name="home"
          size={25}
          color={tintColor}
        />
      )
    }
  }

  componentDidMount() {
    this.props.fetchMeetups();
  }

  render() {
    const {
      meetups: {
        isFetched,
        data,
        error
      }
    } = this.props;

    if (!isFetched) {
      return <LoadingScreen />;
    } else if (error.on) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>
      );
    }

    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text>HomeScreen</Text>
        </View>
        <View style={styles.bottomContainer}>
          <MyMeetupsList meetups={data} />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
