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
import Switch from "react-switch";
import TextField from '@material-ui/core/TextField';
import get from 'lodash.get';

const Axios = require('axios');
const token = localStorage.getItem('token')

export const headers = {
    'Authorization': `Bearer ${token}`
}



const SignupSchema = Yup.object().shape({
    code: Yup.string()
        .required('Please enter code')
        .max(30, 'code is too large!'),

    // description: Yup.string()
    //     .min(2, 'description is too short!')
    //     .max(100, 'description is too long!')
    //     .required('Please enter  description!'),
    // PaySlip: Yup.string()
    //     .max(30, 'description is too long!')

    //     .required('Required'),
    // NoOfDays: Yup.number()
    //     .required('Required'),

});

export class UpdateForm extends React.Component {

    constructor() {
        super();
        this.state = {
            code: '',
            nameInPayslip: '',
            remarks: '',
            noOfDays: '',
            active: false,
            isPaid: false,
            isConvertibleToCash: false,
        }
    }




    componentDidMount() {
        const detail = get(this.props, 'history.location.state.detail', '');

        if (detail) {

            Axios.get('http://acerondrug.com:8888/api/leavetypes', { headers: headers }).then((response) => {
                const Item = response.data.filter((Items) => Items.leaveTypeID === this.props.history.location.state.detail)
                this.setState({ nameInPayslip: Item[0].nameInPayslip, remarks: Item[0].remarks, isConvertibleToCash: Item[0].isConvertibleToCash, isPaid: Item[0].isPaid, code: Item[0].code, nameInPayslip: Item[0].nameInPayslip, noOfDays: Item[0].noOfDays, active: Item[0].active })

            }).catch((error) => {
                alert(error);
                return error;
            });
        }
        else {
            this.props.history.push('/theme/list');
        }
    }








    onSubmit = (values, _actions) => {
        Axios.put('http://acerondrug.com:8888/api/leavetypes',
            {
                "leaveTypeID": this.props.history.location.state.detail,
                "code": values.code,
                "nameInPayslip": values.nameInPayslip,
                "remarks": values.remarks,
                "noOfDays": values.noOfDays,
                "isPaid": values.isPaid,
                "isConvertibleToCash": values.isConvertibleToCash,
                "active": values.active,
                "deleted": false,
                "createdOn": new Date(),
                "lastModified": new Date()
            }



            , { headers: headers }).then((response) => {

                console.log('update', response);
                this.props.history.push('/theme/list');
            }).catch((error) => {
                alert(error)
                return error;
            });

    }

    render() {
        console.log('sssssss', this.state);
        const {
            code,
            nameInPayslip,
            remarks,
            noOfDays,
            isPaid,
            isConvertibleToCash,
            active
        } = this.state;
        return (

            <Formik
                enableReinitialize
                initialValues={{ code, nameInPayslip, remarks, noOfDays, isPaid, isConvertibleToCash, active }}
                onSubmit={this.onSubmit}
                validationSchema={SignupSchema}

                render={({ errors, values, handleSubmit, handleChange,
                }) => {

                    const descriptionLength = values.remarks.length;
                    const nameInPayslipLength = values.nameInPayslip.length;
                    const codeLength = values.code.length;

                    return (
                        <div style={{ width: window.innerWidth, height: '100%', alignContent: 'center', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ padding: 8, justifyContent: 'center', width: 600 }}>

                                <form onSubmit={handleSubmit}>
                                    <div style={{
                                        flexDirection: 'row',
                                        alignItems: 'center', alignContent: 'center', alignSelf: 'center'
                                    }} >
                                        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                            <div style={{ paddng: 8, flex: 1, flexDirection: 'column' }}>
                                                <h5>Edit Leave Type</h5>
                                                <div style={{ flex: 1 }}>
                                                    <TextField
                                                        name='code'
                                                        variant="outlined"
                                                        id="standard-name"
                                                        label="Code"
                                                        helperText={errors && errors.code ? errors.code : ''}
                                                        error={!!errors.code}
                                                        value={values.code}
                                                        required
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">{`${codeLength}/30`}</InputAdornment>,
                                                        }}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        margin="normal"
                                                    />


                                                    <TextField
                                                        name='remarks'
                                                        variant="outlined"
                                                        label="description"
                                                        required
                                                        fullWidth
                                                        helperText={errors && errors.remarks ? errors.remarks : ''}
                                                        error={!!errors.remarks}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">{`${descriptionLength}/100`}</InputAdornment>,
                                                        }}
                                                        value={values.remarks}
                                                        onChange={handleChange}
                                                        margin="normal"
                                                    />
                                                    <TextField
                                                        name='nameInPayslip'
                                                        variant="outlined"
                                                        label="NameInPayslip"
                                                        required
                                                        fullWidth
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">{`${nameInPayslipLength}/30`}</InputAdornment>,
                                                        }}
                                                        value={values.nameInPayslip}
                                                        onChange={handleChange}
                                                        margin="normal"
                                                    />
                                                </div>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name='isPaid'
                                                            checked={values.isPaid}
                                                            value={values.isPaid}
                                                            onChange={handleChange('isPaid')}

                                                        />
                                                    }
                                                    label="isPaid"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            disabled={values.isPaid === true ? false : true}
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
                                                    name='noOfDays'
                                                    variant="outlined"
                                                    required
                                                    label="Max No of Days"
                                                    value={values.noOfDays}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                />


                                                <div style={{ flex: 1, flexDirection: 'row', width: 300 }}>
                                                    <div style={{ flex: 1 }}>
                                                        <span>Status</span>
                                                    </div>
                                                    <div style={{ marginTop: 2 }}>
                                                        <Switch onChange={handleChange('active')} checked={values.active} />
                                                    </div>
                                                </div>

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
                            </Card>
                        </div>

                    )
                }}
            />
        );
    }
}
