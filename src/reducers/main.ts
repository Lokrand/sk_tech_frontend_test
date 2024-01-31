import moment from "moment";
import {
  MAIN_MESSAGES_LIST_FETCH,
  MAIN_MESSAGES_LIST_SUCCESS,
  MAIN_MESSAGES_LIST_FAILED,
  TAction,
  SET_USER_NAME,
} from "../actions/mainActions";
import { MessagesList } from "../types";

export type TState = {
  username: string;
  messagesList: MessagesList | null;
  messengerError: Error | null;
};

const initialState: TState = {
  username: "Anonim",
  messagesList: null,
  messengerError: null,
};

const main = (state = initialState, action: TAction) => {
  switch (action.type) {
    case MAIN_MESSAGES_LIST_FETCH: {
      const newState = Object.assign({}, state);
      newState.messagesList = null;
      return newState;
    }
    case MAIN_MESSAGES_LIST_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.messagesList = action.messagesList;
      console.log(newState.messagesList);
      return newState;
    }
    case MAIN_MESSAGES_LIST_FAILED: {
      const newState = Object.assign({}, state);
      newState.messengerError = action.error;
      return newState;
    }

    case SET_USER_NAME: {
      return { ...state, username: action.username };
    }
    default: {
      return state;
    }
  }
};

export default main;
