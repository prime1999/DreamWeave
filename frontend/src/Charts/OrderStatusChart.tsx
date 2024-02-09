import ReactApexChart from "react-apexcharts";
import { useGetAllOrdersQuery } from "@/slices/OrderSlice";

const OrderStatusChart = () => {
	const { data } = useGetAllOrdersQuery({});
	console.log(data);

	const chartOptions: any = {
		chart: {
			type: "bar",
			height: 200,
		},
		plotOptions: {
			bar: {
				borderRadius: 4,
				horizontal: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		fill: {
			colors: ["#3894A3"],
		},

		xaxis: {
			categories: ["Pending", "Processing", "Delivered", "Shipped", "Returned"],
			labels: {
				style: {
					colors: "#333", // Set the text color of X-axis labels
					fontSize: "9px", // Set the font size of X-axis labels
					fontFamily: "poppins",
					fontWeight: "bold",
				},
			},
		},
		stroke: {
			width: 0.5, // Set the width of the stroke
		},
	};

	const series = [
		{
			data: [
				data?.filter((order: any) => order.status === "pending").length,
				data?.filter((order: any) => order.status === "processing").length,
				data?.filter((order: any) => order.status === "delivered").length,
				data?.filter((order: any) => order.status === "shipped").length,
				data?.filter((order: any) => order.status === "returned").length,
			],
		},
	];

	return (
		<div>
			{" "}
			{data && (
				<ReactApexChart
					options={chartOptions}
					series={series}
					type="bar"
					height={350}
				/>
			)}
		</div>
	);
};

export default OrderStatusChart;
