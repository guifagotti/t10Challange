module.exports = {
    queryRunner: function (req: any, query: currentQuery, callback: Function) {
        let serverResponse: serverResponse;
        try {
            req.connection.query(query, (err: any, results: Object) => {
                if (err) {
                    serverResponse = {
                        status: 400,
                        statusText: err.sqlMessage,
                        data: null
                    }
                    callback(serverResponse, null)
                }
                else {
                    serverResponse = {
                        status: 200,
                        statusText: 'DONE',
                        data: results
                    }
                    callback(null, serverResponse)
                }
            })
        } catch (error) {
            serverResponse = {
                status: 400,
                statusText: error,
                data: null
            }
            callback(serverResponse, null)
        }
    },
    getData: async function (connection: any, callback: Function) {
        let serverResponse: serverResponse;
        let currentQuery = "SELECT * FROM userData"
        try {
            connection.query(currentQuery, (err: any, results: userData[]) => {
                if (err) {
                    serverResponse = {
                        status: 400,
                        statusText: err.sqlMessage,
                        data: null
                    }
                    callback(serverResponse, null)
                }
                else {
                    let totalParticipation: number = 0;
                    results.forEach(element => {
                        totalParticipation += element.Participation
                    })
                    results.length > 0 && totalParticipation < 100 &&
                        results.push({
                            id: results.length +1,
                            Fname: 'Free',
                            Lname: '',
                            Participation: (100 - totalParticipation)
                        })

                    serverResponse = {
                        status: 200,
                        statusText: 'DONE',
                        data: results
                    }
                    callback(null, serverResponse)
                }
            })
        } catch (error) {
            serverResponse = {
                status: 400,
                statusText: error,
                data: null
            }
            callback(serverResponse, null)
        }
    },
    updateData: function (connection: any, newData: userData, callback: Function) {
        let serverResponse: serverResponse;
        let currentQuery = "INSERT INTO userData (Fname, Lname, Participation ) VALUES ('" + newData.Fname + "','" + newData.Lname + "','" + newData.Participation + "')"
        try {
            connection.query(currentQuery, (err: any, results: Object) => {
                if (err) {
                    serverResponse = {
                        status: 400,
                        statusText: err.sqlMessage,
                        data: null
                    }
                    callback(serverResponse, null)
                }
                else {
                    serverResponse = {
                        status: 200,
                        statusText: 'DONE',
                        data: results
                    }
                    callback(null, serverResponse)
                }
            })
        } catch (error) {
            serverResponse = {
                status: 400,
                statusText: error,
                data: null
            }
            callback(serverResponse, null)
        }
    },
    resetData: function (connection: any, callback: Function) {
        let serverResponse: serverResponse;
        let currentQuery = "TRUNCATE TABLE userData"
        try {
            connection.query(currentQuery, (err: any, results: Object) => {
                if (err) {
                    serverResponse = {
                        status: 400,
                        statusText: err.sqlMessage,
                        data: null
                    }
                    callback(serverResponse, null)
                }
                else {
                    serverResponse = {
                        status: 200,
                        statusText: 'DONE',
                        data: []
                    }
                    callback(null, serverResponse)
                }
            })
        } catch (error) {
            serverResponse = {
                status: 400,
                statusText: error,
                data: null
            }
            callback(serverResponse, null)
        }
    },
    consistencyCheck: function (newData: userData, currentTableData: userData[], callback: Function) {
        let totalParticipation: number = 0;
        let serverResponse: serverResponse;
        currentTableData.length > 0 && currentTableData.forEach(element => {
            element.Lname != '' && (totalParticipation += element.Participation) })
        if ((totalParticipation + newData.Participation) <= 100) {
            serverResponse = {
                status: 200,
                statusText: 'OKaasssa',
                data: null
            }
            callback(null, serverResponse)
        }
        else {
            serverResponse = {
                status: 400,
                statusText: 'Error',
                data: 'Total participation above the 100 limit.'
            }
            callback(serverResponse, null)
        }
    }
};