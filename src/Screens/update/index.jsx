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
    'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4iLCJVc2VyIl0sIkdyb3VwIjoiR3JvdXAiLCJleHAiOjE1Njk5OTgyNTAsImlzcyI6ImxlbXVlbC5pbiIsImF1ZCI6InJlYWRlcnMifQ.hfcqERKCG3x9iokXIjadu2gNq3DLOOUa12JTAtOoq9Y'
}

export class UpdateForm extends React.Component {

    constructor() {
        super();
        this.state = {
            code: '',
            PaySlip: '',
            description: '',
            NoOfDays: '',
            Active: false,
            PaidLeave: false,
            isConvertibleToCash: false,
        }
    }




    componentDidMount() {


        Axios.get('http://acerondrug.com:8888/api/leavetypes', { headers: headers }).then((response) => {
            const Item = response.data.filter((Items) => Items.leaveTypeID === this.props.history.location.state.detail.leaveTypeID)
            this.setState({ isConvertibleToCash: Item[0].isConvertibleToCash, code: Item[0].code, PaySlip: Item[0].PaySlip, NoOfDays: Item[0].NoOfDays, Active: Item[0].Active })

        }).catch((error) => {
            alert(error);
            return error;
        });
    }







    onSubmit = (values, _actions) => {

        Axios.put('http://acerondrug.com:8888/api/leavetypes',
            {
                "leaveTypeID": this.props.history.location.state.detail.leaveTypeID,
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



            , { headers: headers }).then((response) => {

                console.log('update', response);
                this.props.history.push('/');
            }).catch((error) => {

                return error;
            });

    }

    render() {
        console.log('sssssss', this.state);
        const {
            code,
            PaySlip,
            description,
            NoOfDays,
            PaidLeave,
            isConvertibleToCash,
            Active
        } = this.state;
        return (
            <Formik
                enableReinitialize
                initialValues={{ code, PaySlip, description, NoOfDays, PaidLeave, isConvertibleToCash, Active }}
                onSubmit={this.onSubmit}
                render={({ values, handleSubmit, handleChange, onChange
                }) => (
                        <form onSubmit={handleSubmit}>
                            <div style={{
                                flexDirection: 'row',
                                alignItems: 'center', alignContent: 'center', alignSelf: 'center'
                            }} >
                                <div style={{ width: 600, paddingLeft: 20, paddingRight: 20 }}>
                                    <div style={{ flex: 1, flexDirection: 'column' }}>
                                        <h5>Edit Leave Type</h5>
                                        <div style={{ flex: 1 }}>
                                            <TextField
                                                name='code'
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
                                        <IconButton type='submit'>
                                            <SuccessIcon />
                                        </IconButton>
                                        <IconButton onClick={() => this.props.history.push('/')} >
                                            <CloseIcon color='red' />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>

                        </form>
                    )}
            />
        );
    }
}

