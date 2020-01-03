function TimezoneFix(datetime) {

	const utcOffset = new Date().getTimezoneOffset();
	const utcOffsetHours = utcOffset / 60;

	if (utcOffsetHours <= 0) {
		datetime.setHours(Math.abs(utcOffsetHours));
	} else {
		datetime.setDate(datetime.getDate() - 1);
		datetime.setHours(utcOffsetHours);
	}
	return datetime;
}

export default TimezoneFix