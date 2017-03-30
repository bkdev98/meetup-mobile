import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

const fakeGroupId = '58dca7a5b1d9174b8302859c';

class MeetupApi {
  constructor() {
    this.groupId = fakeGroupId;
    this.path = `/groups/${this.group}/meetups`;
  }

  async fetchGroupMeetups() {
    const { data } = await axios.get(this.path);

    return data.meetups;
  }
}

export {
  MeetupApi
};
