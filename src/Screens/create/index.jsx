import * as React from 'react'
import * as Yup from 'yup';

import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Formik } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SuccessIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';

const Axios = require('axios');

const token = localStorage.getItem('token')

export const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}


const SignupSchema = Yup.object().shape({
    code: Yup.string()
        .required('Please enter code')
        .min(3, 'code is too short!'),

    description: Yup.string()
        .min(2, 'description is too short!')
        .max(100, 'description is too long!')
        .required('Please enter  description!'),
    PaySlip: Yup.string()
        .required('Required'),
    NoOfDays: Yup.number()
        .required('Required'),

});

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

                this.props.history.push('/theme/list');
            }).catch((error) => {

                return error;
            });

    }
    render() {

        return (
            <Formik
                initialValues={{ isConvertibleToCash: false, code: '', PaySlip: '', description: '', PaidLeave: false, NoOfDays: '', Active: false }}
                onSubmit={this.onSubmit()}
                validationSchema={SignupSchema}

                render={
                    ({ errors, values, handleChange, handleSubmit }) => {

                        const descriptionLength = values.description.length;
                        const nameInPayslipLength = values.PaySlip.length;
                        const codeLength = values.code.length;
                        return (
                            <form onSubmit={handleSubmit}
                            >
                                <div style={{
                                    flexDirection: 'row',
                                    alignItems: 'center', alignContent: 'center', alignSelf: 'center'
                                }} >
                                    <div style={{ height: '100%', alignContent: 'center', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Card style={{ padding: 8, marginLeft: 150, marginTop: 40, justifyContent: 'center', width: 600 }}>
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
                                                            InputProps={{
                                                                endAdornment: <InputAdornment position="end">{`${codeLength}/30`}</InputAdornment>,
                                                            }}
                                                            required
                                                            helperText={errors && errors.code ? errors.code : ''}
                                                            error={!!errors.code}
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
                                                            rowsMax={2}
                                                            helperText={errors && errors.description ? errors.description : ''}
                                                            error={!!errors.description}
                                                            InputProps={{
                                                                endAdornment: <InputAdornment position="end">{`${descriptionLength}/100`}</InputAdornment>,
                                                            }}
                                                            required
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
                                                                required
                                                                InputProps={{
                                                                    endAdornment: <InputAdornment position="end">{`${nameInPayslipLength}/30`}</InputAdornment>,
                                                                }}
                                                                helperText={errors && errors.PaySlip ? errors.PaySlip : ''}
                                                                error={!!errors.PaySlip}
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
                                                        required
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
                                        </Card>
                                    </div>
                                </div>


                            </ form>
                        )
                    }
                }
            />
        );
    }
}

