import React, { Component } from 'react';
import { Facebook, Google } from 'expo';
import { Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import fbConfig from '../../../constants/fbConfig';
import googleConfig from '../../../constants/googleConfig';

const MeetupText = styled.Text`
  color: ${Colors.redColor};
  fontSize: 18;
  fontFamily: montserratBold;
`;

const Button = styled.TouchableOpacity`
  justifyContent: space-around;
  alignItems: center;
  flex: 1;
  backgroundColor: ${({ color }) => color};
  flexDirection: row;
  paddingHorizontal: 20;
`;

const FlexContainer = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  alignSelf: stretch;
`;

const ButtomButtonWrapper = styled.View`
  flex: 0.25;
  flexDirection: row;
`;

export default class LoginScreen extends Component {
  state = { }

  _onLoginPress = name => {
    if (name === 'facebook') {
      this._logInWithFacebook();
    } else {
      this._loginWithGoogle();
    }
  }

  async _logInWithFacebook() {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(fbConfig.APP_ID, {
        permissions: ['public_profile', 'email'],
      });

      if (token) {
        Alert.alert('Logged with facebook');
      }
    } catch (e) {
      throw e;
    }

    if (type === 'success') {
      const resp = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    }
  }

  async _loginWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: googleConfig.CLIENT_ID_IOS,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        Alert.alert(`Logged with google, ${result.accessToken}`);
      } else {
        return {
          cancelled: true
        };
      }
    } catch (e) {
      throw e;
    }
  }

  render() {
    return (
      <FlexContainer>

        <FlexContainer>
          <Text style={Fonts.authTitle}>Meetup App</Text>
        </FlexContainer>

        <FlexContainer>
          <FlexContainer>
            <FlexContainer>
              <Text style={Fonts.authWelcomeTitle}>Welcome!</Text>
            </FlexContainer>

            <FlexContainer>
              <Text style={Fonts.authWelcomeText}>
                Start managing your <MeetupText>Meetups</MeetupText> quickly and efficently
              </Text>
            </FlexContainer>
          </FlexContainer>

          <ButtomButtonWrapper>
            <Button color="#db3236" onPress={() => this._onLoginPress('google')}>
              <Text style={Fonts.buttonAuth}>Connect with</Text>
              <MaterialCommunityIcons name="google" size={30} color="#fff" />
            </Button>
            <Button color="#3b5998" onPress={() => this._onLoginPress('facebook')}>
              <Text style={Fonts.buttonAuth}>Connect with</Text>
              <MaterialCommunityIcons name="facebook" size={30} color="#fff" />
            </Button>
          </ButtomButtonWrapper>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
