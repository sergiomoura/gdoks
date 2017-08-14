WebGDoks.directive('focus', function(){
	return function(scope, element){
		element[0].focus();
	};
});

WebGDoks.directive('format', ['$filter', function ($filter) {
	return {
		require: '?ngModel',
		link: function (scope, elem, attrs, ctrl) {
			if (!ctrl) return;

			ctrl.$formatters.unshift(function (a) {
				return $filter(attrs.format)(ctrl.$modelValue)
			});

			ctrl.$parsers.unshift(function (viewValue) {
							  
		  elem.priceFormat({
			prefix: '',
			centsSeparator: ',',
			thousandsSeparator: '.'
		});                
				return elem[0].value;
			});
		}
	};
}]);

WebGDoks.directive('ngFileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var model = $parse(attrs.ngFileModel);
			var isMultiple = attrs.multiple;
			var modelSetter = model.assign;
			element.bind('change', function () {
				var values = [];
				angular.forEach(element[0].files, function (item) {
					var value = {
					   // File Name 
						name: item.name,
						//File Size 
						size: item.size,
						//File URL to view 
						url: URL.createObjectURL(item),
						// File Input Value 
						_file: item
					};
					values.push(value);
				});
				scope.$apply(function () {
					if (isMultiple) {
						modelSetter(scope, values);
					} else {
						modelSetter(scope, values[0]);
					}
				});
			});
		}
	};
}]);