import { format, parseISO } from "date-fns";

// -------------------------- fucntion to format date to this format (11/11/2022) ---------------------- //
export const changeDateFormat = (date: string) => {
	const parsedDate = parseISO(date);
	const formattedDate = format(parsedDate, "MM/dd/yyyy");
	return formattedDate;
};

// ---------------------------- funtion to format date to this format (mon, 11 july, 2023) ------------------- //
export const getFullDate = (date: string) => {
	const parsedDate = parseISO(date);
	const formattedDate = format(parsedDate, "EEE. dd MMM, yyyy");
	return formattedDate;
};
