import { Dispatch } from "redux";
import * as actionTypes from "../../store/actionTypes"
import axios from "axios";


export function labelManager(data: DataType[]) {
  let label: string[] = [];
  data.length > 0 && data.forEach(element =>
    label.push(element.Fname + ' ' + element.Lname)
  )
  return label
}


export function seriesManager(data: DataType[]) {
  let series: number[] = [];
  data.length > 0 && data.forEach(element => {
    series.push(element.Participation)
  })
  return series
}


export const updateData = (data: DataType[]) => async (dispatch: Dispatch<DataDispatchTypes>) => {
  dispatch({
    type: actionTypes.LOAD_DATA_REQUEST
  })

  axios.post(
    process.env.REACT_APP_SERVER_URL + "api/updateData",
    data, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    dispatch({
      type: actionTypes.LOAD_DATA_SUCCESS,
      payload: response.data,
      message: {
        Open: true,
        Severity: 'success',
        Text: 'Updated Data'
      }
    })

  }, (error) => {
    dispatch({
      type: actionTypes.LOAD_DATA_ERROR,
      message: {
        Open: true,
        Severity: 'error',
        Text: 'Error ' + error.response.status + ' : ' + error.response.statusText
      }
    })
  });
};

export const resetData = () => async (dispatch: Dispatch<DataDispatchTypes>) => {
  try {
    dispatch({
      type: actionTypes.LOAD_DATA_REQUEST
    })

    const res = await axios.get(process.env.REACT_APP_SERVER_URL + "api/resetData")

    dispatch({
      type: actionTypes.LOAD_DATA_SUCCESS,
      payload: res.data.data,
      message: {
        Open: true,
        Severity: 'success',
        Text: 'Loaded Data'
      }
    })

  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_DATA_ERROR,
      message: {
        Open: true,
        Severity: 'error',
        Text: e
      }
    })
  }
};

export function alertManager(dispatch: Dispatch<DataDispatchTypes>, data: AlertType) {
  dispatch({
    type: actionTypes.MESSAGE_MANAGER,
    message: data
  })
};

export async function getData(dispatch: Dispatch<DataDispatchTypes>) {
  try {
    dispatch({
      type: actionTypes.LOAD_DATA_REQUEST
    })

    const res = await axios.get(process.env.REACT_APP_SERVER_URL + "api/getData")

    dispatch({
      type: actionTypes.LOAD_DATA_SUCCESS,
      payload: res.data.data,
      message: {
        Open: true,
        Severity: 'success',
        Text: 'Loaded Data'
      }
    })

  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_DATA_ERROR,
      message: {
        Open: true,
        Severity: 'error',
        Text: e
      }
    })
  }
};


