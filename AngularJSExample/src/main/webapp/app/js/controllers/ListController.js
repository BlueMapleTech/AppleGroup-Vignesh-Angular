
+

/**
 * 
 */

(function() {
	var app = angular.module("AJSExample");

	app.controller("ListController", [ '$log', '$scope', '$rootScope','$http',
			'$location', function($log, $scope, $rootScope, $http, $location) {
				$log.debug("List Controller Initialized.!");

		var self = $scope;
			
		/*self.personlist = [];*/

		$scope.init= function(){
			
			self.personList();
		};
		
	    self.Delete = function(userId){
       	 
      		$http({
           				method:"POST",
           	        	url:"http://localhost:8080/AngularJSExample/signup/deleteUser"+'?userId='+ userId,
           	        	
           				headers:{
           				Accept:'application/json'
           					}
           			}).success(function(response){
           				$log.debug("response", response);
           				$location.url("/show");
           			}).error(function(response){
           				$log.debug("error", response);
           			});
           		};
		
		
		self.personList = function(){
			
			$http({
				method:"POST",
	        	url:"http://localhost:8080/AngularJSExample/signup/personlist",
				headers:{
					Accept:'application/json'
					}
			}).success(function(response){
				$log.debug("response", response);
				self.personlist = angular.fromJson(response);
			}).error(function(response){
				$log.debug("error", response);
			});
		};
		
		self.update = function(userId) {
			$log.debug("Redirecting to update page.!");
			$location.url("/updateUser/"+userId);
		};
		
		$scope.init();
	} ]);
})();