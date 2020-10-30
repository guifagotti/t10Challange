
type DataType = {
    id: number
    Fname: string
    Lname: string
    Participation: number
}

interface AlertType {
  Open: boolean
  Severity: string
  Text: string
}

type RowDataType = []

interface IDefaultStateI {
    isLoading: boolean
    alertStatus:AlertType
    userData?: DataType[]
  }


interface IUserData {
    id: number
    Fname: string
    Lname: string
    Participation: number
}

type  MessageManager = {
    type: 'MESSAGE_MANAGER';
    message: AlertType;
}

type  LoadDataRequest = {
    type: 'LOAD_DATA_REQUEST';
}

type  LoadDataSuccess = {
    type: 'LOAD_DATA_SUCCESS';
    payload: IUserData[];
    message: AlertType;
}

type  LoadDataError = {
    type: 'LOAD_DATA_ERROR';
    message: AlertType;
}

type DataDispatchTypes = LoadDataRequest | LoadDataError | LoadDataSuccess | MESSAGE_MANAGER
