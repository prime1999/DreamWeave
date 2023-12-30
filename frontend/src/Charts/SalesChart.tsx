import ReactApexChart from "react-apexcharts";
import { useGetSalesRevenueQuery } from "@/slices/OrderSlice";

const SalesChart = () => {
	const { data } = useGetSalesRevenueQuery({});
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const annotations = months.map((month) => ({
		x: month,
		strokeDashArray: 3,
		borderColor: "#999",
	}));
	const chartOptions: any = {
		series: [
			{
				name: "2023",
				data: data?.currentRevenue.map((revenue: any) => revenue.sales),
			},
			{
				name: "2022",
				data: data?.previousRevenue.map((revenue: any) => revenue.sales),
			},
		],
		chart: {
			height: 250,
			type: "area",
		},
		dataLabels: {
			enabled: true,
			style: {
				colors: ["#FF5F1F"],
			},
		},
		fill: {
			colors: ["#3894A3", "#F1F1EF"],
		},
		stroke: {
			curve: "smooth",
			width: [3, 3], // Set the width of the stroke for each series
			colors: ["#3894A3", "#C7DAD4"], // Set the color of the stroke for each series
		},
		xaxis: {
			type: "month",
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			],
			labels: {
				style: {
					colors: "#333", // Set the text color of X-axis labels
					fontSize: "14px", // Set the font size of X-axis labels
					fontFamily: "poppins",
					fontWeight: "bold",
				},
			},
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
		yaxis: {
			labels: {
				style: {
					colors: "#333", // Color of the y-axis labels
					fontSize: "14px", // Font size of the y-axis labels
					fontFamily: "poppins",
					fontWeight: "bold",
				},
			},
		},
		annotations: {
			xaxis: annotations,
		},
		legend: {
			show: true,
			fontSize: "14px", // Set the font size
			fontWeight: "bold", // Set the font weight
			fontFamily: "Arial, sans-serif", // Set the font family
			labels: {
				colors: ["#333"], // Set the color of the legend labels
			},
			markers: {
				width: 12, // Set the width of the legend markers
				height: 12, // Set the height of the legend markers
				radius: 6, // Set the radius of the legend markers
				fillColors: ["#3894A3", "#F1F1EF"],
			},
		},
	};

	return (
		<div>
			<ReactApexChart
				options={chartOptions}
				series={chartOptions.series}
				type="area"
				height={350}
			/>
		</div>
	);
};

export default SalesChart;
