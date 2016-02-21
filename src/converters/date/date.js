
export class DateFormatValueConverter {
	toView( ms ) {
		if (!ms) {
			return '...';
		}
		return moment(ms).format('dddd MMM Qo YYYY h:mm a');
	}
}