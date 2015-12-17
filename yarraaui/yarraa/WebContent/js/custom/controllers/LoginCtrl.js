app.controller("LoginCtrl", function($scope, notify, AppConstants, $http, $location, $rootScope, $window) {
	
	$scope.newUser = {"email":"" ,"pwd":""};
	$scope.login = function() {
	  
	  
	  if($scope.newUser.email == "" ||  $scope.newUser.pwd == "")
		{
			$('.errorAlert').addClass('errorHighlight');
		}
		else if($scope.loginForm.$valid)		    
		{
			$http.defaults.headers.common.Authorization = ""; 
			$http({
				method : 'POST',
				url : AppConstants.REST_URL + '/users/login',
				data: $scope.newUser,
				headers: {'Content-Type': 'application/json'}
			}
			 )
			.then(function(response)
			{
				if(response.data)
				{
					
					if(response.data.errors && response.data.errors[0].code)
					{
						notify.failure(response.data.errors[0].message);
					}
					else
					{	
						
						$rootScope.loggedInUser = response.data.user;
						localStorage.yarraaUser = JSON.stringify($rootScope.loggedInUser);
						
						$http.defaults.headers.common.Authorization = response.data.user.session_token; 
						$http.defaults.headers.common['Accept'] = 'application/json';
						$http.defaults.headers.common['Content-Type'] = 'application/json';
					    //$location.path("/landing");
						
						
						if ($rootScope.loggedInUser != null && $rootScope.loggedInUser.user_type === 'Consumers') {
							location.href="html/index.html";
					    } else {
					    	location.href="html/corp.html";
					    }
						
						
						
					}
				}
				else
				{
					notify.failure(JSON.stringify(response));
				}
				
				
			}
			,function(res)
			{
				notify.failure("Technical Error");	
			});
		}
	 
	
  };
  
  
  $scope.forgotPassword = function() {
	  if($scope.newUser.email == "" )
		{
			$('.errorAlert').addClass('errorHighlight');
		}
		else
		{
			$http({
				method : 'POST',
				url : AppConstants.REST_URL + '/users/reset',
				data: $scope.newUser,
				headers: {'Content-Type': 'application/json'}
			}
			 )
			.then(function(response)
			{
				if(response.data)
				{
					
					if(response.data.errors && response.data.errors[0].code)
					{
						notify.failure(response.data.errors[0].message);
					}
					else
					{
						notify.success("Reset Password Success");
					}
				}
				else
				{
					notify.failure(JSON.stringify(response));
				}
				
				
			}
			,function(res)
			{
				notify.failure("Technical Error");	
			});
		}
		
	  };
	  
  $scope.backToHome = function() { 		 
			    $location.path("/");			
	  };
  
  
  
  
});