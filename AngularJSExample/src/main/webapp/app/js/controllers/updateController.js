/**
 * 
 */
(function() {
	var app = angular.module("AJSExample");

	app.controller("updateController", [ '$log', '$scope', '$rootScope','$http',
			'$location','$routeParams', function($log, $scope, $rootScope, $http, $location,$routeParams) {
				$log.debug("update Controller Initialized.!");

		var self = $scope;
		
		self.init=function(){
			self.updateId($routeParams.userId);
		};
		
		self.user={
				firstName : "",
				lastName : "",
				emailAddress : "",
				password : "",
				confirmPassword : "",
				mobileNumber : "",
				address : ""
			  	
					
		};
		
		self.updateId = function(userId){
	       	 
      		$http({
           				method:"POST",
           	        	url:"http://localhost:8080/AngularJSExample/signup/findUser"+'?userId='+ userId,
           	        	
           				headers:{
           				Accept:'application/json'
           					}
           			}).success(function(response){
           				self.user = angular.fromJson(response);
           				$log.debug("response", response);
           				
           			}).error(function(response){
           				
           				$log.debug("error", response);
           			});
           		};
		
		
		self.updatePerson=function(){
			$log.debug("updatePerson will be called");
			$log.debug(self.user.address)
			$http({
		        method:"POST",
		        url:"http://localhost:8080/AngularJSExample/signup/updatePersons",
		        data:self.user,
		        headers:{
		        	Accept:'application/json'
		        }
			
			}).success(function(response){
				self.information=angular.fromJson(response);
				$location.url("/list");
			}).error(function(response){
				$log.debug("error",response);
			});
			
		};
		$scope.init();
			} ]);
})();