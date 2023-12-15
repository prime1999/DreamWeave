import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";
import RootLayouts from "./layouts/RootLayouts";
import HomePage from "./pages/HomePage";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProfilePage from "./pages/ProfilePage";
function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<RootLayouts />}>
					<Route index={true} path="/" element={<HomePage />} />
					<Route path="/page/:pageNumber" element={<HomePage />} />
					<Route path="/product/:productId" element={<SingleProduct />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/order" element={<OrderPage />} />
					<Route path="/orderDetails" element={<OrderDetailsPage />} />
					<Route path="/account" element={<ProfilePage />} />
				</Route>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/logIn" element={<AuthPage />} />
			</>
		)
	);
	return (
		<>
			<Provider store={store}>
				<RouterProvider router={router} />
				<ToastContainer />
			</Provider>
		</>
	);
}

export default App;
