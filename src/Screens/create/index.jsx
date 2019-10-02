import * as React from 'react'

import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Formik } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import SuccessIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';

const Axios = require('axios');

export const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4iLCJVc2VyIl0sIkdyb3VwIjoiR3JvdXAiLCJleHAiOjE1Njk5OTgyNTAsImlzcyI6ImxlbXVlbC5pbiIsImF1ZCI6InJlYWRlcnMifQ.hfcqERKCG3x9iokXIjadu2gNq3DLOOUa12JTAtOoq9Y'
}

export class CreateForm extends React.Component {

    constructor() {

        super();
    }

    onSubmit = () => (values, _actions) => {
        console.log('submit', values);

        Axios.post('http://acerondrug.com:8888/api/leavetypes/create',


            {
                "leaveTypeID": values.leaveTypeID,
                "code": values.code,
                "nameInPayslip": values.PaySlip,
                "remarks": values.description,
                "noOfDays": values.NoOfDays,
                "isPaid": values.PaidLeave,
                "isConvertibleToCash": values.isConvertibleToCash,
                "active": values.Active,
                "deleted": false,
                "createdOn": new Date(),
                "lastModified": new Date()
            }

            , { headers: headers }).then((_response) => {

                this.props.history.push('/');
            }).catch((error) => {

                return error;
            });

    }
    render() {

        return (
            <Formik
                initialValues={{ isConvertibleToCash: false, code: '', PaySlip: '', description: '', PaidLeave: false, NoOfDays: '', Active: false }}
                onSubmit={this.onSubmit()}

                render={
                    ({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div style={{
                                flexDirection: 'row',
                                alignItems: 'center', alignContent: 'center', alignSelf: 'center'
                            }} >
                                <div style={{ width: 600, paddingLeft: 20, paddingRight: 20 }}>
                                    <div style={{ flex: 1, flexDirection: 'column' }}>
                                        <h5>Create LeaveType</h5>
                                        <div style={{ flex: 1 }}>
                                            <TextField
                                                name='code'
                                                placeholder='Code'
                                                variant="outlined"
                                                id="standard-name"
                                                label="Code"
                                                value={values.code}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                            />
                                            <TextField
                                                name='description'
                                                variant="outlined"
                                                label="description"
                                                fullWidth
                                                value={values.description}
                                                onChange={handleChange}
                                                margin="normal"
                                            />

                                            <div style={{ flex: 1 }}>
                                                <TextField
                                                    name='PaySlip'
                                                    variant="outlined"
                                                    label="PaySlip"
                                                    fullWidth
                                                    value={values.PaySlip}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                />
                                            </div>
                                        </div>

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name='isConvertibleToCash'
                                                    checked={values.isConvertibleToCash}
                                                    value={values.isConvertibleToCash}
                                                    onChange={handleChange('isConvertibleToCash')}


                                                />
                                            }
                                            label="ConvertibleToCash"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name='PaidLeave'
                                                    checked={values.PaidLeave}
                                                    value={values.PaidLeave}
                                                    onChange={handleChange('PaidLeave')}

                                                />
                                            }
                                            label="PaidLeave"
                                        />

                                        <TextField
                                            fullWidth
                                            name='NoOfDays'
                                            variant="outlined"
                                            label="Max No of Days"
                                            value={values.NoOfDays}
                                            onChange={handleChange}
                                            margin="normal"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name='Active'
                                                    checked={values.Active}
                                                    value={values.Active}
                                                    onChange={handleChange('Active')}


                                                />
                                            }
                                            label="Active"
                                        />
                                    </div>

                                    <div style={{ float: 'right', flex: 1, flexDirection: 'row-reverse' }}>
                                        <IconButton color='primary' type='submit'>
                                            <SuccessIcon />
                                        </IconButton>
                                        <IconButton onClick={() => this.props.history.push('/')} >
                                            <CloseIcon color='red' />
                                        </IconButton>
                                    </div>
                                </div>

                            </div>


                        </ form>
                    )
                }
            />
        );
    }
}

