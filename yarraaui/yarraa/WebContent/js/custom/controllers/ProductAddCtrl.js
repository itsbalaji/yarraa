app.controller("ProductAddCtrl", function($scope, notify, AppConstants, $http, $location, $rootScope) {
	$scope.step = 1;
	$scope.product_saved = false;
	$scope.warrantyStartDate;
	$scope.product={
						"brand_name":"",
						"product_type":"",
						"model_name":"",
						"serial_no":"",
						"cost":"",
						"bill_no":"",
						"country":"SG",
						"purchased_from":"",
						"warranty_period":"",
						"warranty_start_date":"",
						"warranty_no":"",
						"currency_code":"SGD"
					};
	$scope.onlyNumbers =/^[1-9]+[0-9]*$/;
	$scope.navigateToStep1 = function()
	{
		$scope.step=1;
	}
	$scope.navigateToStep2 = function()
	{
		
		if($scope.step1Form.$valid)
		{
			$scope.step=2;
		}
		else 
		{ 
			if($scope.step1Form.serialno.$error.required)
			{
				notify.failure('Please enter serial number');
			}
			else if($scope.step1Form.brand.$error.required)
			{
				notify.failure('Please enter brand name');
			}
			else if($scope.step1Form.producttype.$error.required)
			{
				notify.failure('Please enter product type');
			}
			else if($scope.step1Form.model.$error.required)
			{
				notify.failure('Please enter model name');
			}
					
		}
	}
	
	
	$scope.navigateToStep3 = function()
	{
		
		if($scope.step2Form.$valid)
		{
			$scope.step=3;
		}
		else 
		{ 
			if($scope.step2Form.PurchasedFrom.$error.required)
			{
				notify.failure('Please enter Purchased from');
			}
			else if($scope.step2Form.warrantymonths.$error.required)
			{
				notify.failure('Please enter warranty months');
			}
			else if($scope.step2Form.warrantyfrom.$error.required)
			{
				notify.failure('Please enter warranty Start date');
			}
			else if($scope.step2Form.productcost.$error.required)
			{
				notify.failure('Please enter product cost');
			}
			else if($scope.step2Form.productcost.$valid == false)
			{
				notify.failure('Please enter valid product cost');
			}
			
			else if($scope.step2Form.warrantyno.$error.required)
			{
				notify.failure('Please enter warranty number');
			}
			else if($scope.step2Form.billno.$error.required)
			{
				notify.failure('Please enter bill number');
			}
					
		}
	}
	
	
	
	$scope.saveWarranty = function()
		{
		
			$("#saveWarranty").attr("disabled", true);
            
            
         
				$scope.product.warranty_start_date = new Date($scope.warrantyStartDate).getTime() ; 
			    
				$http({
					method : 'POST',
					url : AppConstants.REST_URL + '/warranties',
					data: $scope.product,
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
							notify.success("New Product Warranty Saved");
							
							if($("#warrantyFile1").val() != '')
							{
								$scope.uploadImage(response.data.warranty.warranty_id, 1, "warrantyFile1");
							}
							if($("#warrantyFile2").val() != '')
							{
								$scope.uploadImage(response.data.warranty.warranty_id, 2, "warrantyFile2");
							}
							if($("#warrantyFile3").val() != '')
							{
								$scope.uploadImage(response.data.warranty.warranty_id, 3, "warrantyFile3");
							}
							
							$scope.product_saved = true;
							 
					            
					            
						}
					}
					else
					{
						notify.failure(JSON.stringify(response));
						$("#saveWarranty").prop("disabled", false);
					}
					
					
				}
				,function(res)
				{
					notify.failure("Technical Error");	
					$("#saveWarranty").prop("disabled", false);
				});
		};
		
	$scope.uploadImage = function(warrantyId, imageId, fileId)
	{
		var fd = new FormData();
		 fd.append('file', $('#'+fileId)[0].files[0]);
           $.ajax({
             url: AppConstants.REST_URL + "/warranties/"+warrantyId+"/pictures/"+imageId,
             type: "POST",
             data: fd,
             enctype: 'multipart/form-data',
             beforeSend: function (xhr) {
           	    xhr.setRequestHeader ("Authorization", $rootScope.loggedInUser.session_token);
           	},             
             processData: false,  
             contentType: false
           }).done(function( data ) {
               //alert(data);
           });
           
           
	}
	
	
  
  
  
});