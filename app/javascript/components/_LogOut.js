function LogOut() {
	const requestLogOut = async () => {
		const response = await fetch("/logout", {
			method: "DELETE",
			credentials: "include"
		});
		if (response.ok) {
			return true;
		}
	};
	return requestLogOut();
}

export default LogOut;
