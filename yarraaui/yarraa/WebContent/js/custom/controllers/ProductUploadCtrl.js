app.controller("ProductUploadCtrl", function($scope, notify, AppConstants, $http, $location, $rootScope, $window) {
	
	$scope.uploadProducts = function(){
		var fd = new FormData();
		 fd.append('file', $('#productUpload')[0].files[0]);
	       $.ajax({
	         url: "/yarraa/productUpload",
	         type: "POST",
	         data: fd,
	         enctype: 'multipart/form-data',	                    
	         processData: false,  
	         contentType: false,
	         beforeSend: function (request)
	            {
	                request.setRequestHeader("Authorization", $rootScope.loggedInUser.session_token);
	            }
	       }).done(function( data ) {
	           if(data.code == 1)
	           {
	        	   notify.success('Product uploaded successfully');
	           }
	           else if(data.code == 0)
	           {
	        	   notify.failure('Product uploaded failed');
	           }
	        	   
	       });
		
	}
	
});