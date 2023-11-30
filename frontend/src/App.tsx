import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import store from "./store";
import RootLayouts from "./layouts/RootLayouts";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<RootLayouts />}>
					<Route index={true} path="/" element={<HomePage />} />
					<Route path="/page/:pageNumber" element={<HomePage />} />
					<Route path="/product/:productId" element={<SingleProduct />} />
					<Route path="/cart" element={<CartPage />} />
				</Route>
				<Route path="/register" element={<RegisterPage />} />
			</>
		)
	);
	return (
		<>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</>
	);
}

export default App;
