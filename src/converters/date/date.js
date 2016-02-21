
export class DateFormatValueConverter {
	toView( ms ) {
		if (!ms) {
			return '...';
		}
		return moment(ms).format('dddd MMM Do YYYY h:mm a');
	}
}