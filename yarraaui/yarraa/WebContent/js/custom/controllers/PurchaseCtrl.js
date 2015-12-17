app.controller("PurchaseCtrl", function($scope, notify, AppConstants, apiCall, $http, $location, $rootScope, DataService) {
	
$scope.warranty_id;
$scope.warranty = {};
$scope.extWarranties = {};
$scope.search={};
$scope.imgBaseURL = AppConstants.REST_URL;
$scope.warrantyPurchase = {};

$scope.features={};
	
  $scope.init = function()
  {
	  $scope.warranty_id = DataService.getWarranty();
		$scope.serviceCenters = DataService.getServiceCenters($scope.warranty_id);
		$scope.warranty = DataService.getWarrantyDetails();
		
		
		apiCall.get(
			AppConstants.REST_URL + '/warranties/'+$scope.warranty_id+"/ext-warranty",		
			function(response)
			{ 
									
				$scope.extWarranties = response.data['ext-providers'];
				
				$.each($scope.extWarranties, function()
						{
							$.each(this.features, function(obj, value)
									{
										
										if($scope.features[obj] == null)
											{										
												$scope.features[obj]=value;
											}
									});
							
						});				
				
				$.each($scope.extWarranties, function()
						{
							featureStatus = {};
							currentExt = this.features;
							$.each($scope.features, function(obj, value)
							{
								
								if(currentExt[obj] != null)
								{										
									featureStatus[obj]='Y';
								}
								else
								{
									featureStatus[obj]='N';
								}
							});
							this.featureStatus = featureStatus;
						
							
						});
			},
			function(response){}
		);
		
		/* t = {"ext-providers": [
		                   {
		                   "company_id": 120284,
		                   "plan_id": 146,
		                   "title": "EW+ADP 1 year",
		                   "plan_type": "BUNDLE",
		                   "no_of_features": 6,
		                   "no_of_months": 12,
		                   "selling_price": 25,
		                   "selling_currency": "SGD",
		                   "product_price_currency": "SGD",
		                   "features":       {
		                      "102": "Power Surge Covered",
		                      "100": "Accidental Damage",
		                      "101": "Liquid Spill",
		                      "104": "Standard Battery Covered",
		                      "105": "Home Charger Covered"
		                   }
		                },
		                   {
		                   "company_id": 120284,
		                   "plan_id": 144,
		                   "title": "ADP 1 year",
		                   "plan_type": "ADP",
		                   "no_of_features": 6,
		                   "no_of_months": 12,
		                   "selling_price": 25,
		                   "selling_currency": "SGD",
		                   "product_price_currency": "SGD",
		                   "features":       {
		                      "102": "Power Surge Covered",
		                      "100": "Accidental Damage",
		                      "101": "Liquid Spill",
		                      "104": "Standard Battery Covered",
		                      "105": "Home Charger Covered"
		                   }
		                },
		                   {
		                   "company_id": 120284,
		                   "plan_id": 145,
		                   "title": "ADP 2 years",
		                   "plan_type": "ADP",
		                   "no_of_features": 3,
		                   "no_of_months": 24,
		                   "selling_price": 100,
		                   "selling_currency": "SGD",
		                   "product_price_currency": "SGD",
		                   "features":       {
		                      "102": "Power Surge Covered",
		                      "100": "Accidental Damage",
		                      "101": "Liquid Spill"
		                   }
		                },
		                   {
		                   "company_id": 120284,
		                   "plan_id": 147,
		                   "title": "EW+ADP 2 years",
		                   "plan_type": "BUNDLE",
		                   "no_of_features": 3,
		                   "no_of_months": 24,
		                   "selling_price": 100,
		                   "selling_currency": "SGD",
		                   "product_price_currency": "SGD",
		                   "features":       {
		                      "102": "Power Surge Covered",
		                      "100": "Accidental Damage",
		                      "101": "Liquid Spill"
		                   }
		                },
		                   {
		                   "company_id": 120284,
		                   "plan_id": 149,
		                   "title": "EW 2 years",
		                   "plan_type": "EW",
		                   "no_of_features": 3,
		                   "no_of_months": 24,
		                   "selling_price": 100,
		                   "selling_currency": "SGD",
		                   "product_price_currency": "SGD",
		                   "features":       {
		                      "100": "Accidental Damage",
		                      "101": "Liquid Spill"
		                   }
		                },
		                   {
		                   "company_id": 120284,
		                   "plan_id": 148,
		                   "title": "EW 1 years",
		                   "plan_type": "EW",
		                   "no_of_features": 6,
		                   "no_of_months": 12,
		                   "selling_price": 100,
		                   "selling_currency": "SGD",
		                   "product_price_currency": "SGD",
		                   "features":       {
		                      "102": "Power Surge Covered",
		                      "100": "Accidental Damage",
		                      "101": "Liquid Spill",
		                      "104": "Standard Battery Covered",
		                      "105": "Home Charger Covered"
		                   }
		                }
		             ]};
		
		$scope.extWarranties = t['ext-providers'];*/
	
		
		
		
		
		 
  
	
		  }
		  
		  
		  
		  $scope.purchaseWarranty = function(planIndex) {
			  
				 $scope.warrantyPurchase.description=$scope.extWarranties[planIndex].title;
				 $scope.warrantyPurchase.txn_amt=$scope.extWarranties[planIndex].selling_price;
				 $scope.warrantyPurchase.warranty_id=$scope.warranty_id;
				 $scope.warrantyPurchase.company_id=$scope.extWarranties[planIndex].company_id;
				 $scope.warrantyPurchase.months=$scope.extWarranties[planIndex].no_of_months;
				 $scope.warrantyPurchase.plan_id=$scope.extWarranties[planIndex].plan_id;
				 $scope.warrantyPurchase.currency_code=$scope.extWarranties[planIndex].product_price_currency;
				 
				 var form = document.createElement('form');
			    form.setAttribute("action", AppConstants.SERVICE_URL + '/PaymentGateway');
			    form.setAttribute("method", "POST");
			    form.setAttribute("target", "_blank");
		
			    var inputDesc = $("<input>").attr("type", "hidden").attr("name", "description").val($scope.extWarranties[planIndex].title);
			    $(form).append($(inputDesc));
			    
			    var input_txn_amt = $("<input>").attr("type", "hidden").attr("name", "txn_amt").val($scope.extWarranties[planIndex].selling_price);
			    $(form).append($(input_txn_amt));
			    
			    var input_warranty_id = $("<input>").attr("type", "hidden").attr("name", "warranty_id").val($scope.warranty_id);
			    $(form).append($(input_warranty_id));
			    
			    var input_company_id = $("<input>").attr("type", "hidden").attr("name", "company_id").val($scope.extWarranties[planIndex].company_id);
			    $(form).append($(input_company_id));
			    
			    var input_months = $("<input>").attr("type", "hidden").attr("name", "months").val($scope.extWarranties[planIndex].no_of_months);
			    $(form).append($(input_months));
			    
			    var input_plan_id = $("<input>").attr("type", "hidden").attr("name", "plan_id").val($scope.extWarranties[planIndex].plan_id);
			    $(form).append($(input_plan_id));
			    
			    var input_currency_code = $("<input>").attr("type", "hidden").attr("name", "currency_code").val($scope.extWarranties[planIndex].product_price_currency);
			    $(form).append($(input_currency_code));
			    
			    var customer_id = $("<input>").attr("type", "hidden").attr("name", "customer_id").val($rootScope.loggedInUser.user_id);
			    $(form).append($(customer_id));
			    
			    var session_token = $("<input>").attr("type", "hidden").attr("name", "session_token").val($rootScope.loggedInUser.session_token);
			    $(form).append($(session_token));
			    
			    
			    var input_submit = $("<input>").attr("type", "submit").attr("name", "submit").attr("id","btn-form-submit");
			    $(form).append($(input_submit));
			    
			   
			    document.body.appendChild(form);                     
		     
		     
		     $('#btn-form-submit').click();
		     
		     document.body.removeChild(form); 			    
				 
		};  
  
  
});