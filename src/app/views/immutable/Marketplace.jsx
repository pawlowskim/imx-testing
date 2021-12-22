import React, {useEffect} from 'react'
import {Breadcrumb, SimpleCard} from 'app/components'
import {Box, styled} from '@mui/system'
import {getImXClient} from "../../services/imxService";
import {TablePagination} from "@mui/material";
import Grid from "@mui/material/Grid";
import {TextValidator} from "react-material-ui-form-validator";
import {Link} from "react-router-dom";

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

const CardImage = styled("img")(({theme}) => ({
	objectFit: 'cover',
	width: '100%'
}))

const TextField = styled(TextValidator)(() => ({
	width: '100%',
	marginBottom: '16px',
}))

const Marketplace = ({history}) => {
	const [rowsPerPage, setRowsPerPage] = React.useState(25)
	const [page, setPage] = React.useState(0)
	const [cursor, setCursor] = React.useState()
	const [collections, setCollections] = React.useState([])
	// const [state, setState] = useState({})

	useEffect(() => {
		getCurrentPageData()
	}, [])

	const getCurrentPageData = () => {
		getImXClient().then(c => {
			c.getCollections({page_size: rowsPerPage, cursor: cursor}).then((result) => {
				const temp = collections;
				temp.push(...result.result);
				setCollections(temp);
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
						{name: 'Collections', path: '/imx/collections'}]}
				/>
			</div>
			{/*<Box>*/}
			{/*	<ValidatorForm onSubmit={handleSubmit} onError={() => null}>*/}
			{/*		<Grid container spacing={6}>*/}
			{/*			<Grid item lg={3} md={3} sm={3} xs={3} sx={{mt: 2}}>*/}
			{/*				<TextField*/}
			{/*					type="text"*/}
			{/*					name="collection_name"*/}
			{/*					id="standard-basic"*/}
			{/*					value={state["collection_name"] || ""}*/}
			{/*					onChange={handleChange}*/}
			{/*					validators={[*/}
			{/*						'minStringLength: 3'*/}
			{/*					]}*/}
			{/*					label="Collection name"*/}
			{/*					errorMessages={['At least 3 charachters are required']}*/}
			{/*				/>*/}
			{/*			</Grid>*/}
			{/*			<Grid item lg={2} md={2} sm={2} xs={2} sx={{mt: 2}}>*/}
			{/*				<Button color="primary" variant="contained" type="submit">*/}
			{/*					<Icon>send</Icon>*/}
			{/*					<Span sx={{pl: 1, textTransform: 'capitalize'}}>*/}
			{/*						Search*/}
			{/*					</Span>*/}
			{/*				</Button>*/}
			{/*			</Grid>*/}
			{/*		</Grid>*/}
			{/*	</ValidatorForm>*/}

			{/*</Box>*/}
			{chunk(collections
				.slice(
					page * rowsPerPage,
					page * rowsPerPage + rowsPerPage
				), 3)
				.map((chunk, index) => {
						return (
							<Grid container spacing={6} key={index}>
								<Grid item lg={4} md={4} sm={6} xs={6} sx={{mt: 2}}>
									<Link to={chunk[0].address}>
										<SimpleCard title={chunk[0].name} subtitle={chunk[0].address}>
											<Grid container spacing={6}>
												<Grid item lg={6} md={6} sm={6} xs={6} sx={{mt: 2}}>
													<CardImage src={chunk[0].collection_image_url}/>
												</Grid>
												<Grid item lg={6} md={6} sm={6} xs={6} sx={{mt: 2}}>
													{chunk[0].description}
												</Grid>
											</Grid>

										</SimpleCard>
									</Link>
								</Grid>
								<Grid item lg={4} md={4} sm={6} xs={6} sx={{mt: 2}} key={index + 1}>
									{
										chunk[1] ?
											<Link to={chunk[1].address}><SimpleCard title={chunk[1].name} subtitle={chunk[1].address}>
												<Grid container spacing={6}>
													<Grid item lg={6} md={6} sm={6} xs={6} sx={{mt: 2}}>
														<CardImage src={chunk[1].collection_image_url}/>
													</Grid>
													<Grid item lg={6} md={6} sm={6} xs={6} sx={{mt: 2}}>
														{chunk[1].description}
													</Grid>
												</Grid>

											</SimpleCard></Link> : <div/>
									}

								</Grid>
								<Grid item lg={4} md={4} sm={6} xs={6} sx={{mt: 2}} key={index + 2}>
									{
										chunk[2] ?
											<Link to={chunk[2].address}><SimpleCard title={chunk[2].name} subtitle={chunk[2].address}>
												<Grid container spacing={6}>
													<Grid item lg={6} md={6} sm={6} xs={6} sx={{mt: 2}}>
														<CardImage src={chunk[2].collection_image_url}/>
													</Grid>
													<Grid item lg={6} md={6} sm={6} xs={6} sx={{mt: 2}}>
														{chunk[2].description}
													</Grid>
												</Grid>

											</SimpleCard></Link> : <div/>
									}

								</Grid>
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

export default Marketplace
