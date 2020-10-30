import React from 'react';
import DataFrame from './dataPage'
import InputFields from './inputForm'
import Alert from '@material-ui/lab/Alert';
import { RootStore } from "../../store/store";
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import * as functions from '../services/functions'
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import '../utils/styles.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    header: {
      display: 'flex',
      backgroundColor: '#00b8e2',
      height: '130px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextHeader: {
      marginTop: '40px',
      fontFamily: 'Microsoft YaHei',
      fontWeight: 'bold',
      color: '#394b50',
      textAlign: 'center'
    },
    TextLatin: {
      marginTop: '15px',
      fontFamily: 'Microsoft YaHei',
      color: '#394b50',
      textAlign: 'center'
    }
  }),
);


function AlertWindow(props: any) {
  return <Alert elevation={6} variant="filled" {...props} />;
}


export default function Page() {

  const dispatch = useDispatch();

  const alertStatus = useSelector((state: RootStore) => state.reducer.alertStatus);
  const isLoading = useSelector((state: RootStore) => state.reducer.isLoading);

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    functions.alertManager(dispatch, { Open: false, Severity: '', Text: '' })

  };

  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={alertStatus['Open']} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000} onClose={handleClose}>
        <AlertWindow onClose={handleClose} severity={alertStatus['Severity']}>
          {alertStatus['Text']}
        </AlertWindow>
      </Snackbar>
      <Toolbar className={classes.header} >
        <InputFields />
      </Toolbar>

      <Typography variant="h4" className={classes.TextHeader}>
        DATA
      </Typography>

      <Typography variant="subtitle2" className={classes.TextLatin}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>

      <DataFrame />
    </div>
  );
}
