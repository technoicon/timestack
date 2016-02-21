System.register([], function (_export) {
	'use strict';

	var DateFormatValueConverter;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [],
		execute: function () {
			DateFormatValueConverter = (function () {
				function DateFormatValueConverter() {
					_classCallCheck(this, DateFormatValueConverter);
				}

				_createClass(DateFormatValueConverter, [{
					key: 'toView',
					value: function toView(ms) {
						if (!ms) {
							return '...';
						}
						return moment(ms).format('dddd MMM Qo YYYY h:mm a');
					}
				}]);

				return DateFormatValueConverter;
			})();

			_export('DateFormatValueConverter', DateFormatValueConverter);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnZlcnRlcnMvZGF0ZS9kYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztLQUNhLHdCQUF3Qjs7Ozs7Ozs7O0FBQXhCLDJCQUF3QjthQUF4Qix3QkFBd0I7MkJBQXhCLHdCQUF3Qjs7O2lCQUF4Qix3QkFBd0I7O1lBQzlCLGdCQUFFLEVBQUUsRUFBRztBQUNaLFVBQUksQ0FBQyxFQUFFLEVBQUU7QUFDUixjQUFPLEtBQUssQ0FBQztPQUNiO0FBQ0QsYUFBTyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7TUFDcEQ7OztXQU5XLHdCQUF3QiIsImZpbGUiOiJjb252ZXJ0ZXJzL2RhdGUvZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIERhdGVGb3JtYXRWYWx1ZUNvbnZlcnRlciB7XG5cdHRvVmlldyggbXMgKSB7XG5cdFx0aWYgKCFtcykge1xuXHRcdFx0cmV0dXJuICcuLi4nO1xuXHRcdH1cblx0XHRyZXR1cm4gbW9tZW50KG1zKS5mb3JtYXQoJ2RkZGQgTU1NIFFvIFlZWVkgaDptbSBhJyk7XG5cdH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
