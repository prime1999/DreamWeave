import { format, parseISO } from "date-fns";

export const formatDate = (paymentDate) => {
	const date = parseISO(paymentDate);
	const formattedDate = format(date, "yyyy-M");

	return formattedDate;
};
