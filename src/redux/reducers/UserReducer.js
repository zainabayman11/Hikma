const {createSlice} = require('@reduxjs/toolkit');

const UserReducer = createSlice({
  name: 'UserData',
  initialState: {
    userData: {},
    temp_father_data:{},
    temp_mother_data:{},
    location:{},
    audio_rec:{},
    login: false,
    netinfo: true,
    first: false,
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return {...state, userData: user, login: true};
    },
    setFather_data(state, action) {
      const user = action.payload;
      return {...state, temp_father_data: user};
    },
    setMother_data(state, action) {
      const user = action.payload;
      return {...state, temp_mother_data: user};
    },
    setLoc(state, action) {
      const loc = action.payload;
      return {...state, location: loc};
    },
    setAudio(state, action) {
      const aud = action.payload;
      return {...state, audio_rec: aud};
    },
    removeUser(state, action) {
      return {...state, userData: {}, login: false};
    },
    modifyNetInfo(state, action) {
      return {...state, netinfo: action.payload};
    },
    modifyIsFirst(state, action) {
      return {...state, first: action.payload};
    },
  },
});
export const {setUser, removeUser, modifyNetInfo, modifyIsFirst,setFather_data,setMother_data,setLoc,setAudio} =
  UserReducer.actions;
export default UserReducer.reducer;
