import React, {lazy} from 'react'
import Loadable from 'app/components/Loadable/Loadable';
import Collection from "./Collection";

const Marketplace = Loadable(lazy(() => import("./Marketplace")));
const Inventory = Loadable(lazy(() => import("./Inventory")));


const materialRoutes = [
	{
		path: '/imx/collections',
		element: <Marketplace/>,
	},
	{
		path: '/imx/inventory',
		element: <Inventory/>,
	},
	{
		path: '/imx/collections/:address',
		element: <Collection/>,
	},
]

export default materialRoutes
