import {combineReducers} from "redux";
import userDataReducer from "./dataReducer";

const RootReducer = combineReducers({
  reducer: userDataReducer
});

export default RootReducer