import { MeetupApi } from '../../../constants/api';

const meetupApi = new MeetupApi();

export const FETCH_MEETUPS = 'FETCH_MEETUPS';

export const fetchMeetups = () => ({
  type: FETCH_MEETUPS,
  payload: meetupApi.fetchGroupMeetups()
});
