import React from 'react';
import { ThemeUI } from '../utils/theme';
import { makeStyles, createStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import * as functions from '../services/functions'

const theme = ThemeUI;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: '10px',
            height: '50px',
            width: '150px',
            borderWidth: '2px',
            borderColor: '#ffff',
            fontWeight: 'bold',
            color: "%ffff"
        },
        input: {
            margin: '10px',
            height: '50px',
            width: '300px',
            borderRadius: '0',
            fontFamily: 'Microsoft YaHei',
        },
        error: {
            color: 'red',
            fontSize: '12px',
            fontFamily: 'Microsoft YaHei',
            textAlign: 'center',
            fontWeight: 700
        }
    }),
);

const useStylesTextInput = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflow: 'hidden',
            backgroundColor: '#fcfcfb',
            borderRadius: 2,
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: '#fff',
            },
            '&$focused': {
                backgroundColor: '#fff',
            },
        },
        focused: {},
    }),
);

function CustomTextField(props: TextFieldProps) {
    const classes = useStylesTextInput();
    return (
        <TextField
            InputProps={{ classes, disableUnderline: true }}
            {...props}
        />
    );
}




export default function InputFields() {

    const { control, handleSubmit, errors, reset } = useForm<DataType>();
    const dispatch = useDispatch();
    const classes = useStyles();

    const number = { required: true, max: 100 };
    const text = { required: true, pattern: /^[A-Za-z]+$/i };

    const onReset = () => dispatch(functions.resetData());
    const onSubmit = (data: DataType[]) => {
        dispatch(functions.updateData(data))
        reset()
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Controller
                        as={CustomTextField}
                        required
                        name="Fname"
                        control={control}
                        defaultValue=""
                        className={classes.input}
                        label="First Name"
                        variant="filled"
                        type="text"
                        error={(errors.Fname && true)}
                        rules={text}
                    />
                    {errors.Fname && <div className={classes.error}>Text Only</div>}
                </FormControl>
                <FormControl>
                    <Controller
                        as={CustomTextField}
                        required
                        name="Lname"
                        className={classes.input}
                        control={control}
                        defaultValue=""
                        label="Last Name"
                        variant="filled"
                        type="text"
                        error={(errors.Lname && true)}
                        rules={text}
                    />
                    {errors.Lname && <div className={classes.error}>Text Only</div>}
                </FormControl>
                <FormControl>
                    <Controller
                        as={CustomTextField}
                        required
                        name="Participation"
                        className={classes.input}
                        control={control}
                        defaultValue=""
                        label="Participation"
                        variant="filled"
                        type="number"
                        error={(errors.Participation && true)}
                        rules={number}
                    />
                    {errors.Participation && <div className={classes.error}>Numbers Only, max: 100</div>}
                </FormControl>
                <ThemeProvider theme={theme}>
                    <Button className={classes.button} variant="outlined" color="secondary" type="submit" >
                        SEND
                    </Button>
                    <Button className={classes.button} variant="outlined" color="secondary" onClick={onReset} >
                        RESET
                    </Button>
                </ThemeProvider>
            </form>
        </div>
    );
}
