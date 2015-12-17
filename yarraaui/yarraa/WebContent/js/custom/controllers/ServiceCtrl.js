app.controller("ServiceCtrl", function($scope, notify, AppConstants, $http, $location, $rootScope,
		DataService) {
	$scope.warranty_id;
	$scope.serviceCenters = [];
	$scope.warranty = {};
	$scope.search={};
	
	$scope.init = function(){
		
		$scope.warranty_id = DataService.getWarranty();
		$scope.serviceCenters = DataService.getServiceCenters($scope.warranty_id);
		$scope.warranty = DataService.getWarrantyDetails();
	}
	
	$scope.searchCenters = function(item){
		result = true;
		if($scope.search.brand && $scope.search.brand != "")
		{
			result = ($scope.warranty.brand_name.toLowerCase().indexOf($scope.search.brand.toLowerCase()) > -1);
		}
		if(result && ($scope.search.producttype && $scope.search.producttype != ""))
		{
			result = ($scope.warranty.product_type.toLowerCase().indexOf($scope.search.producttype.toLowerCase()) > -1);
		}
		if(result && ($scope.search.country && $scope.search.country != ""))
		{
			result = (item.country_name.toLowerCase().indexOf($scope.search.country.toLowerCase()) > -1);
		}
		if(result && ($scope.search.address && $scope.search.address != ""))
		{			
			address = $scope.search.address;
			centerAddress = item.address1 + item.address2 + item.city + item.state + item.postal_code;
			if(centerAddress.toLowerCase().indexOf(address.toLowerCase()) > -1 )
				result =  true;
			else
				result =  false;
		}
		
		
		return result;	
	}
	
});