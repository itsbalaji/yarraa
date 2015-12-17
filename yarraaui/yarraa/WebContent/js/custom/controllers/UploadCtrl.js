app.controller("UploadCtrl", function($scope, notify, AppConstants, $http, $location, $rootScope, $window) {
	
	$scope.uploadWarrantyPlan = function(){
		var fd = new FormData();
		 fd.append('file', $('#warrantyUpload')[0].files[0]);
	       $.ajax({
	         url: AppConstants.REST_LOCAL_URL + "/warrantyUpload",
	         type: "POST",
	         data: fd,
	         enctype: 'multipart/form-data',	                    
	         processData: false,  
	         contentType: false
	       }).done(function( data ) {
	           //alert(data);
	       });
	           
	           
		
	}
	
});