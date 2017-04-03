import {
  FETCH_MEETUPS
} from './actions';

const INITIAL_STATE = {
  meetups: {
    data: [],
    isFetched: false,
    error: {
      on: false,
      message: null
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${FETCH_MEETUPS}_PENDING`:
      return INITIAL_STATE;
    case `${FETCH_MEETUPS}_FULFILLED`:
      return {
        meetups: {
          data: action.payload,
          isFetched: true,
          error: {
            on: false,
            message: null
          }
        }
      };
    case `${FETCH_MEETUPS}_REJECTED`:
      return {
        meetups: {
            data: [],
            isFetched: true,
            error: {
              on: true,
              message: 'Error when fetching my meetups'
            }
        }
      };
    default:
      return state;
  }
};
