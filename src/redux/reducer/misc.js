import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isSearch: false,
  isMobileMenuFriendly: false,
  isDeleteMenu: false,
  isFileHandler: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false
  }

};
const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },

    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setuploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setisFileHandler: (state, action) => {
      state.isFileHandler = action.payload;

    },
    setselectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
  }

});

export default miscSlice;
export const { setuploadingLoader, setisFileHandler, setselectedDeleteChat, setIsNewGroup, setIsAddMember, setIsNotification, setIsSearch, setIsDeleteMenu, } = miscSlice.actions;
