System.register([], function (_export) {
	"use strict";

	var TimeFormatValueConverter;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	return {
		setters: [],
		execute: function () {
			TimeFormatValueConverter = (function () {
				function TimeFormatValueConverter() {
					_classCallCheck(this, TimeFormatValueConverter);
				}

				_createClass(TimeFormatValueConverter, [{
					key: "toView",
					value: function toView(sec_num) {
						var hours = Math.floor(sec_num / 3600);
						var minutes = Math.floor((sec_num - hours * 3600) / 60);
						var seconds = sec_num - hours * 3600 - minutes * 60;

						if (hours < 10) {
							hours = "0" + hours;
						}
						if (minutes < 10) {
							minutes = "0" + minutes;
						}
						if (seconds < 10) {
							seconds = "0" + seconds;
						}
						var time = hours + ':' + minutes + ':' + seconds;
						return time;
					}
				}]);

				return TimeFormatValueConverter;
			})();

			_export("TimeFormatValueConverter", TimeFormatValueConverter);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnZlcnRlcnMvdGltZS90aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztLQUNhLHdCQUF3Qjs7Ozs7Ozs7O0FBQXhCLDJCQUF3QjthQUF4Qix3QkFBd0I7MkJBQXhCLHdCQUF3Qjs7O2lCQUF4Qix3QkFBd0I7O1lBSzlCLGdCQUFFLE9BQU8sRUFBRztBQUNqQixVQUFJLEtBQUssR0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN0QyxVQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxHQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBSSxFQUFFLENBQUMsQ0FBQztBQUMxRCxVQUFJLE9BQU8sR0FBRyxPQUFPLEdBQUksS0FBSyxHQUFHLElBQUksQUFBQyxHQUFJLE9BQU8sR0FBRyxFQUFFLEFBQUMsQ0FBQzs7QUFFeEQsVUFBSSxLQUFLLEdBQUssRUFBRSxFQUFFO0FBQUMsWUFBSyxHQUFLLEdBQUcsR0FBQyxLQUFLLENBQUM7T0FBQztBQUN4QyxVQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUU7QUFBQyxjQUFPLEdBQUcsR0FBRyxHQUFDLE9BQU8sQ0FBQztPQUFDO0FBQzFDLFVBQUksT0FBTyxHQUFHLEVBQUUsRUFBRTtBQUFDLGNBQU8sR0FBRyxHQUFHLEdBQUMsT0FBTyxDQUFDO09BQUM7QUFDMUMsVUFBSSxJQUFJLEdBQU0sS0FBSyxHQUFDLEdBQUcsR0FBQyxPQUFPLEdBQUMsR0FBRyxHQUFDLE9BQU8sQ0FBQztBQUM1QyxhQUFPLElBQUksQ0FBQztNQUNmOzs7V0FmVyx3QkFBd0IiLCJmaWxlIjoiY29udmVydGVycy90aW1lL3RpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjbGFzcyBUaW1lRm9ybWF0VmFsdWVDb252ZXJ0ZXIge1xuXHQvKiBcblx0XHRzZWNvbmRzIHRvIEhITU1TU1xuXHRcdGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjMxMjk5My9qYXZhc2NyaXB0LXNlY29uZHMtdG8tdGltZS1zdHJpbmctd2l0aC1mb3JtYXQtaGhtbXNzXG5cdCAqL1xuXHR0b1ZpZXcoIHNlY19udW0gKSB7XG5cdFx0dmFyIGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY19udW0gLyAzNjAwKTtcblx0ICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjX251bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcblx0ICAgIHZhciBzZWNvbmRzID0gc2VjX251bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cblx0ICAgIGlmIChob3VycyAgIDwgMTApIHtob3VycyAgID0gXCIwXCIraG91cnM7fVxuXHQgICAgaWYgKG1pbnV0ZXMgPCAxMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cblx0ICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG5cdCAgICB2YXIgdGltZSAgICA9IGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuXHQgICAgcmV0dXJuIHRpbWU7XG5cdH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
