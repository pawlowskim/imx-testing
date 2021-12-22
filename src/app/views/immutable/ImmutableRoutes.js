import React, {lazy} from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Marketplace = Loadable(lazy(() => import("./Marketplace")));
const Collection = Loadable(lazy(() => import("./Collection")));
const UserCollection = Loadable(lazy(() => import("./UserCollection")));


const materialRoutes = [
	{
		path: '/imx/collections',
		element: <Marketplace/>,
	},
	{
		path: '/imx/collections/:address',
		element: <Collection/>,
	},
	{
		path: '/imx/inventory/:address',
		element: <UserCollection/>,
	},
]

export default materialRoutes
