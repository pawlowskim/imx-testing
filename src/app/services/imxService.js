import {ImmutableXClient} from "@imtbl/imx-sdk";

// initialise Immutable X Link SDK
// const link = new Link(process.env.REACT_APP_ROPSTEN_LINK_URL)

const publicApiUrl = "https://api.ropsten.x.immutable.com/v1";
let client;

async function init() {
	client = await ImmutableXClient.build({publicApiUrl});
	return client;
}

export function getImXClient() {
	if (client !== undefined && client !== null) {
		return Promise.resolve(client);
	}
	return init();
}

