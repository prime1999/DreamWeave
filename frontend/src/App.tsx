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
import RevenuePage from "./pages/Admin/RevenuePage";
import AdminLayout from "./layouts/AdminLayout";
import UsersPage from "./pages/Admin/UsersPage";
import AdminOrderPage from "./pages/Admin/AdminOrderPage";
import AdminProductPage from "./pages/Admin/AdminProductPage";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import PrivateUserRoutes from "./components/PrivateRoutes/PrivateUserRoutes";
import PrivateAdminRoutes from "./components/PrivateRoutes/PrivateAdminRoutes";
function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<RootLayouts />}>
					<Route index={true} path="/" element={<HomePage />} />
					<Route path="/page/:pageNumber" element={<HomePage />} />
					<Route path="/product/:productId" element={<SingleProduct />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/order" element={<PrivateUserRoutes />}>
						<Route path="/order" element={<OrderPage />} />
					</Route>
					<Route path="/orderDetails" element={<PrivateUserRoutes />}>
						<Route path="/orderDetails" element={<OrderDetailsPage />} />
					</Route>
					<Route path="/account" element={<PrivateUserRoutes />}>
						<Route path="/account" element={<ProfilePage />} />
					</Route>
					<Route path="/order/:orderId" element={<PrivateUserRoutes />}>
						<Route path="/order/:orderId" element={<OrderDetailsPage />} />
					</Route>
					<Route path="/category/:category" element={<PrivateUserRoutes />}>
						<Route path="/category/:category" element={<CategoryPage />} />
					</Route>

					{/* Admin routes */}
					<Route path="/admin/dashboard" element={<PrivateAdminRoutes />}>
						<Route path="/admin/dashboard" element={<AdminLayout />}>
							<Route path="/admin/dashboard/sales" element={<RevenuePage />} />
							<Route path="/admin/dashboard/users" element={<UsersPage />} />
							<Route
								path="/admin/dashboard/orders"
								element={<AdminOrderPage />}
							/>
							<Route
								path="/admin/dashboard/products"
								element={<AdminProductPage />}
							/>
						</Route>
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
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
