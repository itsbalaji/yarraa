app.controller("SignupCtrl", function($scope, notify,  $location, $http, AppConstants, $cookies, $window, $rootScope) {
	
	$scope.countries;
	$scope.newUser = {"first_name":"" ,"email":"","telephone":"","country_code":"","state":"","city" :""};
	$scope.onlyNumbers =/^[1-9]+[0-9]*$/;
	
	$scope.init = function(){
		
		$http.get(AppConstants.REST_URL + '/countries')
		.then(function(response)
		{
			$scope.countries = response.data.countries;
		}
		,function()
		{
			notify.failure('Technical Error');			
		});
		
		
		
	}
	$scope.saveRegistration = function(){
			
		
	/*	if($scope.newUser.first_name == "" || $scope.newUser.email == "" ||
				$scope.newUser.country_code == "" || $scope.newUser.state == "" || $scope.newUser.city == "")
		{
			$('.errorAlert').addClass('errorHighlight');
		}*/
		
		if($scope.signupForm.telephone.$valid == false)
		{
			notify.failure('Please enter valid telephone number');
		}
		
		
		if($scope.signupForm.$valid)
		{
			$http({
				method : 'POST',
				url : AppConstants.REST_URL + '/users',
				data: $scope.newUser,
				headers: {'Content-Type': 'application/json'}
			}
			 )
			.then(function(response)
			{
				if(response.data)
				{
					
					if(response.data.errors )
					{
						if(response.data.errors[0])
						{
							$window.alert(response.data.errors[0].message);
						}
						else 
						{
							$window.alert(response.data.errors.message);
						}
					}
					else
					{
						//notify.success("User Registered");
						$rootScope.loggedInUser = response.data.user;
						localStorage.yarraaUser = JSON.stringify($rootScope.loggedInUser);
						
						$http.defaults.headers.common.Authorization = response.data.user.session_token; 
						$http.defaults.headers.common['Accept'] = 'application/json';
						$http.defaults.headers.common['Content-Type'] = 'application/json';
					   
						
						location.href="html/index.html";
					}
				}
				else
				{
					$window.alert(JSON.stringify(response));
				}
				
				
			}
			,function(res)
			{
				$window.alert("Technical Error");	
			});
		}
		
	}
});