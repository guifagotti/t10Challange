import produce from 'immer';
import * as actionTypes from "./actionTypes"

const defaultState: IDefaultStateI = {
  isLoading: false,
  alertStatus: {
    Open: false,
    Severity: '',
    Text: ''
  },
  userData: [],
};

const userDataReducer = (state: IDefaultStateI = defaultState, action: DataDispatchTypes): IDefaultStateI => {
  switch (action.type) {
    case actionTypes.LOAD_DATA_ERROR:
      return produce(state, draft => {
        draft.isLoading = false;
        draft.alertStatus = action.message;
      });
    case actionTypes.LOAD_DATA_REQUEST:
      return produce(state, draft => {
        draft.isLoading = true;
      });
    case actionTypes.LOAD_DATA_SUCCESS:
      return produce(state, draft => {
        draft.isLoading = false;
        draft.userData = action.payload;
        draft.alertStatus = action.message;
      });
    case actionTypes.MESSAGE_MANAGER:
      return produce(state, draft => {
        draft.alertStatus = action.message;
      });
    default:
      return state
  }
};


export default userDataReducer