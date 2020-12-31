import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  SUBSCRIBE_TO_USER_ERROR,
  SUBSCRIBE_TO_USER_REQUEST,
  SUBSCRIBE_TO_USER_SUCCESS,
  UNSUBSCRIBE_FROM_USER_ERROR,
  UNSUBSCRIBE_FROM_USER_REQUEST,
  UNSUBSCRIBE_FROM_USER_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS
} from "../action-types";
import { get, put } from "@/core/services/http-service";
import {
  FETCH_GENDERS_REQUEST,
  FETCH_GENDERS_SUCCESS
} from "@/store/action-types";

function getDefaultUserProfile() {
  return {
    id: Number,
    firstName: "",
    lastName: "",
    picturePath: "",
    personalInfo: {
      secondName: "",
      status: "",
      about: "",
      gender: "",
      birthDate: "",
      email: "",
      phoneNumber: "",
      address: {
        id: Number,
        street: "",
        building: "",
        city: {
          id: Number,
          name: ""
        },
        country: {
          id: Number,
          name: ""
        }
      }
    },
    friends: Number,
    subscribers: Number,
    subscriptions: Number,
    friend: Boolean
  };
}

const state = () => ({
  userProfile: getDefaultUserProfile(),
  genders: [],
  countries: []
});

const getters = {
  getFullName: state => {
    return state.userProfile.firstName + " " + state.userProfile.lastName;
  },
  getWithMiddleName: state => {
    return (
      state.userProfile.firstName +
      " " +
      state.userProfile.personalInfo.secondName +
      " " +
      state.userProfile.lastName
    );
  },
  getBirthDate: state => {
    return new Date(state.userProfile?.personalInfo?.birthDate).toDateString();
  },
  isMyProfile: (state, getters) => {
    return state.userProfile.id === getters.getCurrUser.currentUserInfo.id;
  },
  getProfile: state => {
    return state.userProfile;
  },
  getUserInfo: state => {
    return state.userProfile.personalInfo;
  },
  getAddress: state => {
    return state.userProfile.personalInfo.address;
  },
  getGenders: state => {
    return state.genders;
  },
  getCountries: state => {
    return state.countries;
  }
};

const mutations = {
  [FETCH_PROFILE_SUCCESS]: (state, payload) => {
    state.userProfile = payload;
  },
  [FETCH_PROFILE_ERROR]: state => {
    state.userProfile = getDefaultUserProfile();
  },
  [UPDATE_PROFILE_SUCCESS]: (state, payload) => {
    state.userProfile = payload;
  },
  [UPDATE_PROFILE_ERROR]: () => {},
  [FETCH_GENDERS_SUCCESS]: (state, payload) => {
    state.genders = payload;
  },
  [FETCH_COUNTRIES_SUCCESS]: (state, payload) => {
    state.countries = payload;
  },
  [SUBSCRIBE_TO_USER_SUCCESS]: (state, payload) => {
    state.userProfile = payload;
  },
  [SUBSCRIBE_TO_USER_ERROR]: () => {},
  [UNSUBSCRIBE_FROM_USER_SUCCESS]: (state, payload) => {
    state.userProfile = payload;
  },
  [UNSUBSCRIBE_FROM_USER_ERROR]: () => {}
};

const actions = {
  [FETCH_PROFILE_REQUEST]: async (context, id) => {
    return await get(`users/${id}`)
      .then(response => {
        const payload = response && response.data;
        context.commit(FETCH_PROFILE_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_PROFILE_ERROR);
      });
  },
  [UPDATE_PROFILE_REQUEST]: async (context, updatedUser) => {
    const data = {
      ...updatedUser,
      id: context.state.userProfile.id
    };
    return await put(`users/${data.id}`, data)
      .then(response => {
        const payload = response && response.data;
        context.commit(UPDATE_PROFILE_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(UPDATE_PROFILE_ERROR);
      });
  },
  [FETCH_GENDERS_REQUEST]: async context => {
    return await get(`users/genders`).then(response => {
      const payload = response && response.data;
      context.commit(FETCH_GENDERS_SUCCESS, payload);
    });
  },
  [FETCH_COUNTRIES_REQUEST]: async context => {
    return await get(`users/countries`).then(response => {
      const payload = response && response.data;
      context.commit(FETCH_COUNTRIES_SUCCESS, payload);
    });
  },
  [SUBSCRIBE_TO_USER_REQUEST]: async (context, payload) => {
    return await put(`users/${payload}/subscribe`)
      .then(response => {
        const payload = response && response.data;
        context.commit(SUBSCRIBE_TO_USER_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(SUBSCRIBE_TO_USER_ERROR);
      });
  },
  [UNSUBSCRIBE_FROM_USER_REQUEST]: async (context, payload) => {
    return await put(`users/${payload}/unsubscribe`, payload)
      .then(response => {
        const payload = response && response.data;
        context.commit(UNSUBSCRIBE_FROM_USER_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(UNSUBSCRIBE_FROM_USER_ERROR);
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
