
export class SubstringFormatValueConverter {
	/* 
		seconds to HHMMSS
		http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
	 */
	toView( val, bounds ) {
		let b = String(bounds).split('-');
		if( b.length === 1 ) {
			return String(val).substring(b[0]);
		} else {
			return String(val).substring(b[0], b[1]);
		}
	}
}