export interface UserType {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	cart?: Object;
}
