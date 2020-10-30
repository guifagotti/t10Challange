import * as actionTypes from "./actionTypes"

export const loadDataRequest = (): LoadDataRequest => ({
  type: actionTypes.LOAD_DATA_REQUEST,

});

export const loadDataSuccess = (payload: IUserData[] , message: AlertType ): LoadDataSuccess => ({
  type: actionTypes.LOAD_DATA_SUCCESS, 
  payload,
  message

});

export const loadDataError = (message: AlertType): LoadDataError => ({
  type: actionTypes.LOAD_DATA_ERROR,
  message
});

export const MessageManager = (message: AlertType): MessageManager => ({
  type: actionTypes.MESSAGE_MANAGER,
  message
});

