app.controller("ProfileCtrl", function($scope, notify, AppConstants, $http, $location, $rootScope, $window) {
	
	$scope.userprofile = {};
	$scope.uploadPhoto = function(){
		var fd = new FormData();
		 fd.append('file', $('#warrantyUpload')[0].files[0]);
	       $.ajax({
	         url: AppConstants.REST_URL+"/users/picture",
	         type: "POST",
	         data: fd,
	         enctype: 'multipart/form-data',	                    
	         processData: false,  
	         contentType: false,
	         beforeSend: function (request)
	            {
	                request.setRequestHeader("Authorization", $rootScope.loggedInUser.session_token);
	                request.setRequestHeader("Accept", "application/json");
	            },
	       }).done(function( data ) {	           
	        	   notify.success(data.success);
	        	   src = $("#profileimg").attr("src") +"?timestamp=" + new Date().getTime();
	        	   $("#profileimg").removeAttr("src").attr("src", src);
	        	  
	        	   
	       });
	           
	           
		
	}
	
	$scope.changePassword = function()
	{
		$http({
			method : 'POST',
			url : AppConstants.REST_URL + '/users/change_pwd',
			data: $scope.userprofile,
			headers: {'Content-Type': 'application/json'}
		}
		 )
		.then(function(response)
		{
			if(response.data)
			{
				
				if(response.data.errors)
				{
					if(response.data.errors[0])
						notify.failure(response.data.errors[0].message);
					else
						notify.failure(response.data.errors.message);
				}
				else
				{
					notify.success("Password Updated");
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
	
});