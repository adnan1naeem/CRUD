import * as  React from 'react';

import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Axios = require('axios');



export const headers = {
    'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4iLCJVc2VyIl0sIkdyb3VwIjoiR3JvdXAiLCJleHAiOjE1NzAwODM4MTIsImlzcyI6ImxlbXVlbC5pbiIsImF1ZCI6InJlYWRlcnMifQ.3txopstlre2yAsfm3Mb0A0BY1fHUgXf1IOZiMFliXwQ'
}

export class SimpleTable extends React.Component {

    constructor() {
        super();
        this.state = {
            response: []
        }
    }

    componentDidMount() {

        Axios.get('http://acerondrug.com:8888/api/leavetypes', { headers: headers }).then((response) => {

            this.setState({ response: response.data })

        }).catch((error) => {

            return error;
        });

    }
    itemDelete = (Id) => () => {
        Axios.delete(`http://acerondrug.com:8888/api/leavetypes/${Id}`, { headers: headers }).then((response) => {
            const list = this.state.response.filter((item) => item.leaveTypeID != Id);
            this.setState({ response: list })
        }).catch((error) => {

            return error;
        })


    }

    itemEdit = (Item, data) => () => {
        this.props.history.push(
            {
                pathname: '/edit',
                search: `${Item.leaveTypeID}`,
                state: {
                    detail: data
                }
            });

        // Axios.delete('http://acerondrug.com:8888/api/leavetypes/' + Id, { headers: headers }).then((response) => {
        //     const list = this.state.response.filter((item) => item.leaveTypeID != Id);
        //     this.setState({ response: list })
        // }).catch((error) => {
        //     console.log('error', error);
        // })


    }
    render() {
        if (this.state.response.length > 0) {
            return (
                <>
                    <Fab onClick={() => this.props.history.push('/create')} color="primary" aria-label="add" >
                        <AddIcon />
                    </Fab>

                    <h5>Training and seminars</h5>

                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell align="right">Code</TableCell>
                                    <TableCell align="right">Name in PaySlip</TableCell>
                                    <TableCell align="right">No. of Days</TableCell>
                                    <TableCell align="right">Paid/unPaid</TableCell>
                                    <TableCell align="right">Convertible to Cash</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.response.map((Item) => (
                                    <TableRow>
                                        {/* <TableCell padding="checkbox">
                                            <Checkbox
                                            // indeterminate={numSelected > 0 && numSelected < rowCount}
                                            // checked={numSelected === rowCount}
                                            // onChange={onSelectAllClick}
                                            // inputProps={{ 'aria-label': 'select all desserts' }}
                                            />
                                        </TableCell> */}
                                        <TableCell align="right">{Item.leaveTypeID}</TableCell>
                                        <TableCell align="right">{Item.code}</TableCell>
                                        <TableCell align="right">{Item.nameInPayslip}</TableCell>
                                        <TableCell align="right">{Item.noOfDays}</TableCell>
                                        <TableCell align="right">{Item.isPaid ? 'Paid' : 'UnPaid'}</TableCell>
                                        <TableCell align="right">{Item.isConvertibleToCash === true ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align="right">{Item.active ? 'Active' : 'InActive'}</TableCell>

                                        <TableCell align="right">
                                            <IconButton onClick={this.itemDelete(Item.leaveTypeID)} aria-label="delete" >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={this.itemEdit(Item, { ...Item })} aria-label="delete" >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </>
            );
        }
        return 'No data Found';

    }

}