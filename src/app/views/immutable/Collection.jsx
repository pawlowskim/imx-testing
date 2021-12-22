import React, {useEffect} from 'react'
import {Breadcrumb} from 'app/components'
import {Box, styled} from '@mui/system'
import {useParams} from "react-router-dom";
import {getImXClient} from "../../services/imxService";
import Grid from "@mui/material/Grid";
import {TablePagination} from "@mui/material";
import TokenCard from "../../components/Immutable/TokenCard";


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

	const {address} = useParams()
	const [assets, setAssets] = React.useState([]);
	const [rowsPerPage, setRowsPerPage] = React.useState(25)
	const [page, setPage] = React.useState(0)
	const [cursor, setCursor] = React.useState()

	useEffect(() => {
		getCurrentPageData()
	}, [])

	const getCurrentPageData = () => {
		getImXClient().then(c => {
			c.getAssets({collection: address}).then((result) => {
				const temp = assets;
				temp.push(...result.result);
				setAssets(result.result);
				setCursor(result.cursor)
			});
		});
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
		getCurrentPageData();
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	// const handleChange = (event) => {
	// 	event.persist()
	// 	setState({
	// 		...state,
	// 		[event.target.name]: event.target.value,
	// 	})
	// }
	//
	// const handleSubmit = (event) => {
	// }


	const chunk = (arr, chunkSize) => {
		if (chunkSize <= 0) throw new Error("Invalid chunk size");
		var temp = [];
		for (var i = 0, len = arr.length; i < len; i += chunkSize)
			temp.push(arr.slice(i, i + chunkSize));
		return temp;
	}

	return (
		<Container>
			<div className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{name: 'Collections', path: '/imx/collections/'},
						{name: address, path: address},
					]}
				/>
			</div>
			{chunk(assets
				.slice(
					page * rowsPerPage,
					page * rowsPerPage + rowsPerPage
				), 3)
				.map((chunk, index) => {
						const token1 = chunk[0];
						const token2 = chunk[1];
						const token3 = chunk[2];
						return (
							<Grid container spacing={6} key={index}>
								<TokenCard token={token1}/>
								<TokenCard token={token2}/>
								<TokenCard token={token3}/>
							</Grid>
						)
					}
				)}
			<Box>
				<TablePagination
					sx={{px: 2}}
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={-1}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Box>
		</Container>
	)
}

export default Inventory
