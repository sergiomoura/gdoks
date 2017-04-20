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

WebGDoks.directive('gdoksHbar',function(){
		return {
			templateUrl:'app/directives/tmpl-gdoksHbar.html',
			scope:{
				values:'='
			},
			controller:['$scope',function($scope){
				// Define as cores ...
				$scope.bgcolors = ['#6DD900','#2196F3','#DFDFDF'];
				$scope.fgcolors = ['#FFF','#FFF','#DFDFDF'];
				
				// Calculando o valor total
				var total = 0;
				for (var i = $scope.values.length - 1; i >= 0; i--) {
					total += $scope.values[i];
				}

				// Calculando os percentuais
				$scope.percents = [];
				for (var i = 0; i < $scope.values.length; i++) {
					$scope.percents.push(Math.round($scope.values[i]/total*100));
				}
			}]
		}	
	});