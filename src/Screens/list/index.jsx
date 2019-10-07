import * as  React from 'react';
import * as Yup from 'yup';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import MaterialTable from 'material-table';

const Axios = require('axios');
localStorage.setItem('token', 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4iLCJVc2VyIl0sIkdyb3VwIjoiR3JvdXAiLCJleHAiOjE1NzA0NzE4ODMsImlzcyI6ImxlbXVlbC5pbiIsImF1ZCI6InJlYWRlcnMifQ.0WkNsAYWtvtv-d6clalKgETDbDKjLe0RZNbod0An_88');

const token = localStorage.getItem('token')


export const headers = {
	'Authorization': `Bearer ${token}`
}
export class SimpleTable extends React.Component {

	constructor() {
		super();
		this.state = {
			response: [],
			limit: 0,
			array: [],
			search: 0
		}
	}

	componentDidMount() {

		Axios.get('http://acerondrug.com:8888/api/leavetypes', { headers: headers }).then((response) => {


			this.setState({ response: response.data }, () => {
				this.DataHandling();
			})

		}).catch((error) => {

			return error;
		});

	}
	itemDelete = (_event, Item) => {
		console.log('delete', Item);
		Axios.delete(`http://acerondrug.com:8888/api/leavetypes/${Item.leaveTypeID}`, { headers: headers }).then((_response) => {
			const list = this.state.response.filter((item) => item.leaveTypeID != Item.leaveTypeID);
			this.setState({ response: list })
		}).catch((error) => {

			return error;
		})


	}



	itemEdit = (_event, Item) => {
		this.props.history.push(
			{
				pathname: '/theme/update',
				search: `${Item.leaveTypeID}`,
				state: {
					detail: Item.leaveTypeID
				}
			});

		// Axios.delete('http://acerondrug.com:8888/api/leavetypes/' + Id, { headers: headers }).then((response) => {
		//     const list = this.state.response.filter((item) => item.leaveTypeID != Id);
		//     this.setState({ response: list })
		// }).catch((error) => {
		//     console.log('error', error);
		// })


	}
	DataHandling = () => {
		this.array = this.state.response;

		this.array.map((Item, i) => {
			Item.isConvertibleToCash === true ? this.array[i].isConvertibleToCash = 'Yes' : this.array[i].isConvertibleToCash = 'No'
			Item.isPaid === true ? this.array[i].isPaid = 'Paid' : this.array[i].isPaid = 'UnPaid'
			Item.active === true ? this.array[i].active = 'Active' : this.array[i].isPaid = 'InActive'

		}

		);
		console.log('aaaaaaaaaa', this.array);
		this.setState({ response: this.array })
	}

	render() {
		if (this.state.response.length > 0) {
			return (
				<>


					<Fab onClick={() => this.props.history.push('/theme/create')} color="primary" aria-label="add" >
						<AddIcon />
					</Fab>
					<MaterialTable
						title="Terms and Seminars"
						columns={[
							{ title: 'Item', field: 'leaveTypeID' },

							{ title: 'Code', field: 'code' },
							{ title: 'Name in PaySlip', field: 'nameInPayslip', type: 'numeric' },
							{ title: 'No of DAYS', field: 'noOfDays', type: 'numeric' },
							{ title: 'Paid/unPaid', field: 'isPaid', type: 'numeric' },
							{ title: 'Convertible to Cash', field: 'isConvertibleToCash', type: 'numeric' },
							{ title: 'Status', field: 'active', type: 'numeric' },

						]}
						data={this.state.response}

						actions={[
							{
								icon: 'edit',
								tooltip: 'edit User',
								onClick: this.itemEdit,
							},
							rowData => ({
								icon: 'delete',
								tooltip: 'Delete User',
								onClick: this.itemDelete,
								disabled: rowData.birthYear < 2000
							})
						]}
						onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}

						options={{
							actionsColumnIndex: -1,
							sorting: true,

						}}
					/>
				</>
			);
		}
		return (
			<>
				<Fab onClick={() => this.props.history.push('/create')} color="primary" aria-label="add" >
					<AddIcon />
				</Fab>


				No data Found
            </>);

	}

}