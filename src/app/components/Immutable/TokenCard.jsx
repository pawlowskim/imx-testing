import Grid from "@mui/material/Grid";
import {SimpleCard} from "../index";
import React from "react";
import {styled} from "@mui/system";


const CardImage = styled("img")(({theme}) => ({
	objectFit: 'cover',
	width: '100%'
}))

const TokenCard = (props) => {
	const {token} = props;
	return (
		<Grid item lg={4} md={4} sm={6} xs={6} sx={{mt: 2}}>
			{token !== undefined ? <SimpleCard title={`ID: ${token.token_id}`} subtitle={`Owner: ${token.user}`}>
				<Grid container spacing={6}>
					<Grid item lg={6} md={6} sm={6} xs={6} sx={{mt: 2}}>
						<CardImage src={token.image_url}/>
					</Grid>
					<Grid item lg={6} md={6} sm={6} xs={6} sx={{mt: 2}}>
						<p>{`Creation date: ${token.created_at}`}</p>
						{Object.keys(token.metadata).map((key) => {
							return (
								<p>{`${key}: ${token.metadata[key]}`}</p>
							)
						})}
					</Grid>
				</Grid>
			</SimpleCard> : <div/>
			}
		</Grid>
	)
}

export default TokenCard