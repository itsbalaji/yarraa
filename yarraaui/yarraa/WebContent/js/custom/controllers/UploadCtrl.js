app.controller("UploadCtrl", function($scope, notify, AppConstants, $http, $location, $rootScope, $window) {
	
	$scope.uploadWarrantyPlan = function(){
		var fd = new FormData();
		 fd.append('file', $('#warrantyUpload')[0].files[0]);
		 fd.append('company_id',$rootScope.loggedInUser.company_id);
		 fd.append('user_id',$rootScope.loggedInUser.user_id);
	       $.ajax({
	         url: "/yarraa/warrantyUpload",
	         type: "POST",
	         data: fd,
	         enctype: 'multipart/form-data',	                    
	         processData: false,  
	         contentType: false
	       }).done(function( data ) {
	           if(data.code == 1)
	           {
	        	   notify.success('Plan uploaded successfully');
	           }
	           else if(data.code == 0)
	           {
	        	   notify.failure('Plan uploaded failed');
	           }
	        	   
	       });
		
	}
	
});