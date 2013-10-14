"use strict"

function TodoCtrl($scope, $http) {
	$scope.todos = [
					{desc: "First step for Angular JS", done: true}, 
					{desc: "First App with Angular JS", done: false, deadline: "07/07/2013"}, 
					{desc: "Creating complex app with Angular JS", done: false, deadline: "07/30/2013"}
				];
	
	$scope.remaining = function() {
		return _.filter($scope.todos, function(task) {
			return !task.done;
		}).length;
	}
					
	$scope.addTodo = function(task) {
		$scope.todos.push({desc:$scope.todoDesc, deadline: $scope.todoDeadline, done:false});
		$scope.todoDesc = '';
		$scope.todoDeadline = '';
	}
}

angular.module('todo', [])
	.directive("checkboxAll", function () {
		return function(scope, element, attrs) {
		    var parts = attrs.checkboxAll.split('.');
			element.attr('type','checkbox');
			element.bind('change', function (evt) {
				scope.$apply(function () {
					var setValue = element.prop('checked');
					angular.forEach(scope.$eval(parts[0]), function (v) {
					  v[parts[1]] = setValue;
					});
				});
			});
			scope.$watch(parts[0], function (newVal) {
				var hasTrue, hasFalse;
				angular.forEach(newVal, function (v) {
					if (v[parts[1]]) {
						hasTrue = true;
					} else {
						hasFalse = true;
					}
				});
				if (hasTrue && hasFalse) {
					element.attr('checked', false);
					element.addClass('greyed');
				} else {
					element.attr('checked', hasTrue);
					element.removeClass('greyed');
				}
			}, true);
		};		
	})
	.directive("timeFormat", function(dateFilter) {
		return function(scope, element, attrs) {
			debugger;
			var deadline = scope.todo[attrs.timeProp];
			if(deadline) {
				element.text(' | ' + dateFilter(new Date(deadline), attrs.timeFormat));
			}
		};		
	});
