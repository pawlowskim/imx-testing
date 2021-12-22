import React, {useEffect} from 'react'
import {Breadcrumb} from 'app/components'
import {Box, styled} from '@mui/system'
import {useParams} from "react-router-dom";
import {getImXClient} from "../../services/imxService";
import Grid from "@mui/material/Grid";
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


const UserCollection = () => {

	const {address} = useParams()
	const [assets, setAssets] = React.useState();

	useEffect(() => {
		if (!assets)
			getCurrentPageData()
	}, [])

	const getCurrentPageData = () => {
		getImXClient().then(c => {
			c.getAssets({user: address}).then((result) => {
				if (result)
					setAssets(result.result);
			});
		});
	}


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
						{name: 'Inventory', path: '/imx/inventory/'},
						{name: address, path: address},
					]}
				/>
			</div>
			<Box><h3>User Tokens</h3></Box>
			{assets ? chunk(assets, 3)
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
				}) : <div/>
			}
		</Container>
	)
}

export default UserCollection
