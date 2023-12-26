import { format, parseISO, formatDistanceToNow } from "date-fns";

// -------------------------- fucntion to format date to this format (11/11/2022) ---------------------- //
export const changeDateFormat = (date: string) => {
	const parsedDate = parseISO(date);
	const formattedDate = format(parsedDate, "dd/MM/yyyy");
	return formattedDate;
};

// ---------------------------- funtion to format date to this format (mon, 11 july, 2023) ------------------- //
export const getFullDate = (date: string) => {
	const parsedDate = parseISO(date);
	const formattedDate = format(parsedDate, "EEE. dd MMM, yyyy");
	return formattedDate;
};

// funtion to gat the date distance
export const getDateDistance = (date: string) => {
	const parsedDate = parseISO(date);
	const formattedDate = formatDistanceToNow(parsedDate);
	return formattedDate;
};
