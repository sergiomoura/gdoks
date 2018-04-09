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

WebGDoks.directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
  });

WebGDoks.directive("progresso", function (){
		return {
			restrict: 'E',
			scope: {
				progress: '=',
				width: '=',
				height:'=',
				colors:'=',
				fcolors:'='
			},
			template: "<canvas />",
			link: function(scope, element, attrs) {
				scope.canvas = element.find('canvas')[0];
				scope.context = scope.canvas.getContext('2d');
				scope.$watch('progress', function(values) {
					
					// determinando dimensões do canvas
					scope.canvas.width = attrs.width;
					scope.canvas.height = attrs.height;

					// Pintando o fundo
					scope.context.fillStyle = "#DDD";
					scope.context.fillRect(0, 0, scope.canvas.width, scope.canvas.height);

					// Lendo as cores
					var colors = eval(attrs.colors);
					var fcolors = eval(attrs.fcolors);

					// Preparando para pintar barras
					var barWidth;
					var text;
					var nextX = 0;
					var previousX = 0;

					// determinando fonte da numeração
					scope.context.font = '12px sans-serif';
					scope.context.textBaseline = 'middle';
					for (var i = 0;i < values.length; i++) {
						// Desenhando a barra
						barWidth = Math.ceil(values[i] / 100 * scope.canvas.width);
						scope.context.fillStyle = colors[i];
						scope.context.fillRect(nextX, 0, barWidth, scope.canvas.height);
						previousX = nextX;
						nextX += barWidth;

						// Desenhando o texto
						scope.context.fillStyle = fcolors[i];
						text = values[i]+'%';
						textX = nextX - scope.context.measureText(text).width - 3;
						if(textX>previousX){
							scope.context.fillText(text,textX,scope.canvas.height/2);
						}
					}
				});
			}        
		}
})