import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import ReactApexCharts from 'react-apexcharts'
import * as functions from '../services/functions'


import '../utils/styles.css'

const useStyles = makeStyles({
    data: {
        width: '100%'
    },
    table: {
        marginTop: '60px',
        marginLeft: '100px',
        maxWidth: 600,
    },
});

export default function InputFields() {

    const dataState = useSelector((state: RootStore) => state.reducer);
    const dispatch = useDispatch();

    useEffect(() => {
        functions.getData(dispatch)
    }, []);


    let rows: any[] = [];
    let series: number[] = [];
    let labels: string[] = [];


    if (dataState.userData !== undefined) {
        rows = dataState.userData
        series = functions.seriesManager(rows)
        labels = functions.labelManager(rows)
    }

    const options = {
        chart: {
            width: 380,
            type: 'donut',
        },
        dataLabels: {
            enabled: false
        },
        labels: labels,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 280
                },
                legend: {
                    show: true
                }
            }
        }],
        legend: {
            position: 'right',
            offsetY: 1,
            height: 300,
            fontSize: '14px',
            fontFamily: 'Microsoft YaHei',
            fontWeight: 600,
            labels: {
                useSeriesColors: true
            },
            markers: {
                width: 13,
                height: 13,
                strokeWidth: 0,
                strokeColor: '#fff',
                radius: 2,
                offsetX: 5,
                offsetY: 2
            },
            itemMargin: {
                horizontal: 3,
                vertical: 5
            },
        }
    }

    const classes = useStyles();

    return (
        <div className={classes.data}>
            {rows.length > 0 &&
                <Box justifyContent='center' display="flex" mt={5}>
                    <Box width={'50%'}>
                        <TableContainer>
                            <div className="table">
                                <Table className={classes.table} size="small" aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>  </TableCell>
                                            <TableCell align="left">First Name</TableCell>
                                            <TableCell align="left">Last Name</TableCell>
                                            <TableCell align="center">Participation</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell component="th" align="left">{row.Fname}</TableCell>
                                                <TableCell component="th" align="left">{row.Lname}</TableCell>
                                                <TableCell component="th" align="center">{row.Participation}%</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TableContainer>
                    </Box>
                    <Box marginLeft={'5%'} marginTop={6}  >
                        <ReactApexCharts options={options} series={series} type="donut" width={400} />
                    </Box>
                </Box>
            }
        </div>
    );
}
