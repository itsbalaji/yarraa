app.controller("ProductCtrl", function($scope, notify, AppConstants, $http, $location, $rootScope, apiCall, DataService,
		$window) {
	$scope.warranties;
	$scope.warrantiesFullList = [];
	$scope.totalAssetCost = 0;
	$scope.warrantyExpiredCount = 0;
	$scope.imgBaseURL = AppConstants.REST_URL;
	$scope.searchText;
	$scope.countList=0;
	$scope.currEpochDate;
	$scope.selectedWarranty = {};
	
	
	
	$scope.init = function(){
		
		DataService.clearAll();
		
		notify.info("");
		
		//{"title":"s2","serial_no":"S123s413","warranty_id":211072,"warranty_in_months":12,"has_offers":false}
		apiCall.get(
				AppConstants.REST_URL + '/warranties',		
				function(response)
				{ 
					
//					var t = [];
//					t.push(response.data.warranties[0]);
//					t.push(response.data.warranties[1])
//					
					if(response.data.warranties)
					{
						
					
						$scope.currEpochDate = new Date().getTime();
						$scope.warranties = response.data.warranties;
						$scope.warrantiesFullList = [];
						$scope.countList = response.data.warranties.length;
						
						
						$.each(response.data.warranties, function()
						{
							
										apiCall.get(
												AppConstants.REST_URL + '/warranties/'+this.warranty_id,		
												function(response)
												{ 
													
													var warranty_item = response.data.warranty;
													
													
													totalDays = $scope.daysDiff(response.data.warranty.warranty_end_date * 1000, response.data.warranty.warranty_start_date * 1000);
													warranty_item.totalDays = totalDays;
													
													
													remainingDays = $scope.daysDiff(response.data.warranty.warranty_end_date * 1000, new Date().getTime());
													warranty_item.remainingDays = remainingDays
													
													
													if(remainingDays <= 0){
														warranty_item.remainingDays = 0;					
														warranty_item.percentUsed = 100;
													}
													else
													{
														
														percentUsed =  100 - Math.round((parseInt(warranty_item.remainingDays) / parseInt(warranty_item.totalDays))*100);
														warranty_item.percentUsed = percentUsed;
													}
													
													
													
													$scope.warrantiesFullList.push(warranty_item);
													
													
												},
												function(response)
												{
													
												}
										);
							
							
						});
						setTimeout($scope.waitFunc, 100);
					
					
					}
					
					
				},
				function(response){}
			);
		
		
	}
	
	$scope.waitFunc = function waitFunc() {
	    if ($scope.countList != $scope.warrantiesFullList.length) {
	    	notify.info("");
	        setTimeout(waitFunc, 1000);
	    }
	    else
	    {
	    	notify.clearNotify();
	    	$("#warrantyAll").click();
	    	
	    	//$scope.warrantyAll();
	    }
	}
	
	$scope.warrantyExpired = function()
	{
		index = 0;
		
		
		$scope.warranties = [];
		$.each($scope.warrantiesFullList, function () {
			
			
			if(this.remainingDays <= 0)
			{
				$scope.warranties.push(this); 
			}
			
			
		});
		
	}
	
	$scope.underWarranty = function()
	{
	
		
		$scope.warranties = [];
		
		$.each($scope.warrantiesFullList, function () {						
			
			
			if(this.remainingDays > 0)
			{
				$scope.warranties.push(this); 
			}
			
		});
		
	}
	
	$scope.goToReferences = function()
	{
		$location.path("/service404");
	}
	$scope.goToSell = function()
	{
		$location.path("/service404");
	}
	
	$scope.warrantyAll = function()
	{
	
		$scope.warranties = [];
		$scope.warranties = $scope.warrantiesFullList; 
		$scope.warrantyExpiredCount = 0;
		var totalCost = 0;
		$.each($scope.warranties, function () {	
			
			if(!isNaN(this.cost))
			{
				totalCost += parseInt(this.cost);
			}
			
			
			if(this.remainingDays <= 0)
			{
				$scope.warrantyExpiredCount = $scope.warrantyExpiredCount +1;
			}
			
		});
		$scope.totalAssetCost = totalCost;
		
		
	}
	$scope.warrantyExpireNextMonth = function()
	{
		$scope.warranties = [];
		//$scope.warranties = $scope.warrantiesFullList; 
		
		
		$.each($scope.warrantiesFullList, function () {	
			if(this.remainingDays > 0 && this.remainingDays < 30)
			{
				$scope.warranties.push(this);
			}
		});
		
		
	}
	$scope.monthDiff = function (d1, d2) {
	    var months;
	    months = (d2.getFullYear() - d1.getFullYear()) * 12;
	    months -= d1.getMonth() + 1;
	    months += d2.getMonth();
	    return months <= 0 ? 0 : months;
	}
	
	$scope.daysDiff = function (firstDate, secondDate) {
		
		
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	   // var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));		
		 var diffDays = Math.round((firstDate - secondDate)/(oneDay));	    
	    return diffDays;
	}
	
	$scope.recycledProducts = function()
	{
		$scope.warranties = [];
		$scope.warrantyExpiredCount = 0;
		$scope.totalAssetCost = 0;
		
	}
	
	$scope.deleteWarranty = function(warranty_id)
	{
		
		
			$http({
				method : 'DELETE',
				url : AppConstants.REST_LOCAL_URL + '/warranties/'+warranty_id,
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
						notify.success("Warranty Deleted");						  
						$scope.init();
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
	
	$scope.toggleDetails = function(id)
	{	
		
		apiCall.get(
				AppConstants.REST_URL + '/warranties/'+id+'/references',		
				function(response)
				{ 					
					$("#warrantyRefCnt_"+id).html(response.data.references.length);				},
				function(response)
				{
					
				}
		);
		
		
			
			$http({
				method : 'POST',
				url : AppConstants.REST_URL + '/service-centers/search',
				data: {"warranty_id":id, "country_code":"SG"},
			}
			 )
			.then(function(response)
			{
				DataService.setServiceCenters(id, response.data);
				$("#svrCenterCnt_"+id).html(response.data['service-centers'].length);	
			},function(){});
		
		
		
		apiCall.get(
				AppConstants.REST_URL + '/warranties/'+id+'/recyclers',		
				function(response)
				{ 	
					maxPrice = 0;
					$.each(response.data.recyclers, function()
					{
						if(maxPrice < this.recycle_price)
						{
							maxPrice = this.recycle_price;
						}
					});
					$("#recyclersCost_"+id).html('$'+maxPrice);					
				},
				function(response)
				{
					
				}
		);
		
          $('#details_'+id).toggle();
        //imgSec detailSec rightArrow detailedcolumn
          if(window.innerWidth <= 1186){
            var midDiv = 294;
          }else{
            var midDiv = 300
          }
         
          var tempwidth = (($('#details_'+id).width()/2) - midDiv);
          $('.detailSec').css('width',tempwidth);
     }
	
	$scope.showServiceCenters = function(warranty_id)
	{
		DataService.setWarranty(warranty_id);
		
		
		result = $scope.getWarrantyById(warranty_id);
		DataService.setWarrantyDetails(result);
		
		$location.path("/servicecenters");
	}
	
	$scope.showExtWarranty = function(warranty_id)
	{
		DataService.setWarranty(warranty_id);
		
		
		result = $scope.getWarrantyById(warranty_id);
		DataService.setWarrantyDetails(result);
		
		$location.path("/extwarranty");
	}
	
	
	$scope.popupDetails = function(warranty_id)
	{
		result = $scope.getWarrantyById(warranty_id);
		$scope.selectedWarranty = result;
		$('#modal1').openModal();
	}
	
	$scope.getWarrantyById = function(warrantyId)
	{
		result = {};
		indx = -1;
		
		$.each($scope.warranties, function()
		{				
			indx++;
			if(this.warranty_id == warrantyId)
			{	
				result = this;
				return;
			}
		});			
		
		//result =  $scope.warranties[indx];
		
		return result;
	}
		
  
	$scope.init();
  
});

