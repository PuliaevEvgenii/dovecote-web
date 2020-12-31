const CURR_USER_KEY = "CURR_USER_KEY";

export const getCurrUser = () => {
  return JSON.parse(window.localStorage.getItem(CURR_USER_KEY));
};

export const saveCurrUser = currUser => {
  window.localStorage.setItem(CURR_USER_KEY, JSON.stringify(currUser));
};

export const destroyCurrUser = () => {
  window.localStorage.setItem(
    CURR_USER_KEY,
    JSON.stringify({
      authenticated: false,
      activated: false,
      currentUserInfo: {
        id: Number,
        login: "",
        role: null
      }
    })
  );
};

export default { getCurrUser, saveCurrUser, destroyCurrUser };
