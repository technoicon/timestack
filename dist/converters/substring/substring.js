System.register([], function (_export) {
	'use strict';

	var SubstringFormatValueConverter;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [],
		execute: function () {
			SubstringFormatValueConverter = (function () {
				function SubstringFormatValueConverter() {
					_classCallCheck(this, SubstringFormatValueConverter);
				}

				_createClass(SubstringFormatValueConverter, [{
					key: 'toView',
					value: function toView(val, bounds) {
						var b = String(bounds).split('-');
						if (b.length === 1) {
							return String(val).substring(b[0]);
						} else {
							return String(val).substring(b[0], b[1]);
						}
					}
				}]);

				return SubstringFormatValueConverter;
			})();

			_export('SubstringFormatValueConverter', SubstringFormatValueConverter);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnZlcnRlcnMvc3Vic3RyaW5nL3N1YnN0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7S0FDYSw2QkFBNkI7Ozs7Ozs7OztBQUE3QixnQ0FBNkI7YUFBN0IsNkJBQTZCOzJCQUE3Qiw2QkFBNkI7OztpQkFBN0IsNkJBQTZCOztZQUtuQyxnQkFBRSxHQUFHLEVBQUUsTUFBTSxFQUFHO0FBQ3JCLFVBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsVUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRztBQUNwQixjQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDbkMsTUFBTTtBQUNOLGNBQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDekM7TUFDRDs7O1dBWlcsNkJBQTZCIiwiZmlsZSI6ImNvbnZlcnRlcnMvc3Vic3RyaW5nL3N1YnN0cmluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIFN1YnN0cmluZ0Zvcm1hdFZhbHVlQ29udmVydGVyIHtcblx0LyogXG5cdFx0c2Vjb25kcyB0byBISE1NU1Ncblx0XHRodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYzMTI5OTMvamF2YXNjcmlwdC1zZWNvbmRzLXRvLXRpbWUtc3RyaW5nLXdpdGgtZm9ybWF0LWhobW1zc1xuXHQgKi9cblx0dG9WaWV3KCB2YWwsIGJvdW5kcyApIHtcblx0XHRsZXQgYiA9IFN0cmluZyhib3VuZHMpLnNwbGl0KCctJyk7XG5cdFx0aWYoIGIubGVuZ3RoID09PSAxICkge1xuXHRcdFx0cmV0dXJuIFN0cmluZyh2YWwpLnN1YnN0cmluZyhiWzBdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFN0cmluZyh2YWwpLnN1YnN0cmluZyhiWzBdLCBiWzFdKTtcblx0XHR9XG5cdH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
