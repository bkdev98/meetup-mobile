import axios from 'axios';
import { Platform } from 'react-native';

let url;

if (Platform.OS !== 'ios') {
  url = 'http://10.0.2.2:3000/api';
} else {
  url = 'http://localhost:3000/api';
}

axios.defaults.baseURL = url;

const fakeGroupId = '58dca7a5b1d9174b8302859c';

class MeetupApi {
  constructor() {
    this.groupId = fakeGroupId;
    this.path = `/groups/${this.groupId}/meetups`;
  }

  fetchGroupMeetups = async () => {
    try {
      const { data } = await axios.get(this.path);
      return data.meetups;
    } catch (err) {
      console.log(err);
    }
  }
}

export {
  MeetupApi
};
