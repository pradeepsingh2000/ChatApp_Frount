import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationCounts: 0,
newMessageAlert : [
    {
        chatId:"",
        count:0
    }
]
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
        incrementNotifications:(state) =>{
            state.notificationCounts += 1;
        },
        resetNotifications: (state) => {
            state.notificationCounts = 0
        },
        setnewMessageAlert : (state,action) => {
            const index = state.newMessageAlert.findIndex((item) => item.chatId == action.payload.chatId);
            if(index !== -1) {
                state.newMessageAlert[index].count += 1
            }
            else {
                state.newMessageAlert.push({
                    chatId: action.payload.chatId,
                    count:1
                })
            }
        },
        removeNewMessageAlert: (state,action) => {
state.newMessageAlert = state.newMessageAlert.filter((item) => item.chatId !== action.payload)
        }
  }

});

export default chatSlice;
export const { incrementNotifications ,resetNotifications,setnewMessageAlert , removeNewMessageAlert } = chatSlice.actions;
