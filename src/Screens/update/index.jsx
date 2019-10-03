import * as React from 'react'

import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Formik } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import SuccessIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';

const Axios = require('axios');

export const headers = {
    'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4iLCJVc2VyIl0sIkdyb3VwIjoiR3JvdXAiLCJleHAiOjE1NzAwODM4MTIsImlzcyI6ImxlbXVlbC5pbiIsImF1ZCI6InJlYWRlcnMifQ.3txopstlre2yAsfm3Mb0A0BY1fHUgXf1IOZiMFliXwQ'
}

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


        Axios.get('http://acerondrug.com:8888/api/leavetypes', { headers: headers }).then((response) => {
            const Item = response.data.filter((Items) => Items.leaveTypeID === this.props.history.location.state.detail.leaveTypeID)
            this.setState({ nameInPayslip: Item[0].nameInPayslip, remarks: Item[0].remarks, isConvertibleToCash: Item[0].isConvertibleToCash, isPaid: Item[0].isPaid, code: Item[0].code, nameInPayslip: Item[0].nameInPayslip, noOfDays: Item[0].noOfDays, active: Item[0].active })

        }).catch((error) => {
            alert(error);
            return error;
        });
    }







    onSubmit = (values, _actions) => {

        Axios.put('http://acerondrug.com:8888/api/crud types',
            {
                "leaveTypeID": this.props.history.location.state.detail.leaveTypeID,
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
                this.props.history.push('/');
            }).catch((error) => {

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
                render={({ values, handleSubmit, handleChange,
                }) => (
                        <div style={{ height: '100%', alignContent: 'center', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ padding: 8, marginLeft: 400, marginTop: 150, justifyContent: 'center', width: 600 }}>

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
                                                        value={values.code}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        margin="normal"
                                                    />


                                                    <TextField
                                                        name='remarks'
                                                        variant="outlined"
                                                        label="description"
                                                        fullWidth
                                                        value={values.remarks}
                                                        onChange={handleChange}
                                                        margin="normal"
                                                    />
                                                    <TextField
                                                        name='nameInPayslip'
                                                        variant="outlined"
                                                        label="NameInPayslip"
                                                        fullWidth
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
                                                    label="Max No of Days"
                                                    value={values.noOfDays}
                                                    onChange={handleChange}
                                                    margin="normal"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name='active'
                                                            checked={values.active}
                                                            value={values.active}
                                                            onChange={handleChange('active')}


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
                            </Card>
                        </div>

                    )}
            />
        );
    }
}

