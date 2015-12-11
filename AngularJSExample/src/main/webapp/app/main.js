(function() {
	var app = angular.module("AJSExample", [ 'ngRoute' ]);

	app.config(function($routeProvider) {
		$routeProvider.when("/login", {
			templateUrl : "app/views/login.html"
		}).when("/signup", {
			templateUrl : "app/views/signup.html"
		}).when("/list", {
			templateUrl : "app/views/List.html"
		}).when("/updateUser/:userId", {
			templateUrl : "app/views/update.html"
		}).when("/show", {
			templateUrl : "app/views/List.html"
		})
		.otherwise({
			redirectTo : "/login"
		});
	});

	app.run(function($log) {
		$log.debug("Started running.!");
	})

})();