import React from 'react'
import {Breadcrumb} from 'app/components'
import {styled} from '@mui/system'

const Container = styled('div')(({theme}) => ({
	margin: '30px',
	[theme.breakpoints.down('sm')]: {
		margin: '16px',
	},
	'& .breadcrumb': {
		marginBottom: '30px',
		[theme.breakpoints.down('sm')]: {
			marginBottom: '16px',
		},
	},
}))

const Inventory = () => {
	return (
		<Container>
			<div className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{name: 'Inventory', path: '/imx'},
						{name: 'Inventory'},
					]}
				/>
			</div>
		</Container>
	)
}

export default Inventory
