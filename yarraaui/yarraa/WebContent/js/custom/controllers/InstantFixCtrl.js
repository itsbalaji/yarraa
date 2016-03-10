
  app.controller('InstantFixCtrl', function($scope,$http, DataService, AppConstants) {
      $scope.productContainer=false;
      $scope.warrantyContainer=false;
      $scope.rating2 = 2;
      $scope.isReadonly = true;
      $scope.brands=[];
      $scope.products=[];
      $scope.brandSelected;
      $scope.modelSelected;
      $scope.issues=[];
      $scope.issuesSelected;
      $scope.productsTypes=[{name:'Laptop',imgSrc:'references.png'},{name:'Aircon',imgSrc:'references.png'},{name:'Desktop',imgSrc:'references.png'},{name:'Mobile',imgSrc:'references.png'}]
      $scope.models=[];
      $scope.issueLists=[{name:'Issue 01'},{name:'Issue 02'}];
      $scope.serviceCenterList = [];
      $scope.allUserWarranties = {};
      $scope.isCentersAvailable = false;
      $scope.init = function()
      {
    	  //$scope.allUserWarranties = DataService.getAllUserWarranties();
    	  $scope.allUserWarranties = 	[{"title":"B1 MTTY1","serial_no":"UPC1000","purchased_from":"Ttyy yy","brand_name":"B1","warranty_period":9,"warranty_in_months":10,"cost":"10000","warranty_no":"NN1909","country":"SG","bill_no":"N00909","model_name":"MTTY1","product_type":"PTTT1","warranty_start_date":1451586600,"warranty_end_date":1477938600,"currency_code":"SGD","warranty_id":243466,"warranties":[{"warrantyId":243466,"warrantyType":"MW","startDate":1451586600000}],"companies":[],"totalDays":305,"remainingDays":295,"percentUsed":3},{"title":"Dell MMM212","serial_no":"SD232","purchased_from":"TTT","brand_name":"Dell","warranty_period":9,"warranty_in_months":10,"cost":"999","warranty_no":"NN0900","country":"SG","bill_no":"B09090","model_name":"MMM212","product_type":"Laptop","warranty_start_date":1451759400,"warranty_end_date":1478111400,"currency_code":"SGD","warranty_id":243465,"warranties":[{"warrantyId":243465,"warrantyType":"MW","startDate":1451759400000}],"companies":[],"totalDays":305,"remainingDays":297,"percentUsed":3},{"title":"Dell XPS","serial_no":"81NBS","purchased_from":"CHALLENGER","brand_name":"Dell","warranty_period":0,"warranty_in_months":24,"cost":"1299.0","warranty_no":"W9999","country":"Singapore","bill_no":"R2MURALI21","model_name":"XPS","product_type":"LAPTOP","warranty_start_date":11112,"warranty_end_date":63083112,"currency_code":"SGD","warranty_id":243442,"warranties":[{"warrantyId":243442,"warrantyType":"MW","startDate":11112000}],"companies":[],"totalDays":730,"remainingDays":0,"percentUsed":100},{"title":"Dell LATITUDE","serial_no":"917BS","purchased_from":"CHALLENGER","brand_name":"Dell","warranty_period":0,"warranty_in_months":24,"cost":"1099.0","warranty_no":"W1232","country":"Singapore","bill_no":"R1MURALI11","model_name":"LATITUDE","product_type":"LAPTOP","warranty_start_date":10102,"warranty_end_date":63082102,"currency_code":"SGD","warranty_id":243441,"warranties":[{"warrantyId":243441,"warrantyType":"MW","startDate":10102000}],"companies":[],"totalDays":730,"remainingDays":0,"percentUsed":100},{"title":"Dell LATITUDE","serial_no":"91N67BS1","purchased_from":"CHALLENGER","brand_name":"Dell","warranty_period":0,"warranty_in_months":12,"cost":"1099.0","warranty_no":"W1231","country":"Singapore","bill_no":"B1231","model_name":"LATITUDE","product_type":"LAPTOP","warranty_start_date":10102,"warranty_end_date":31546102,"currency_code":"SGD","warranty_id":243431,"warranties":[{"warrantyId":243431,"warrantyType":"MW","startDate":10102000}],"companies":[],"totalDays":365,"remainingDays":0,"percentUsed":100},{"title":"11 11","serial_no":"11","purchased_from":"ss","brand_name":"11","warranty_period":11,"warranty_in_months":12,"cost":"200","warranty_no":"11","country":"SG","bill_no":"11","model_name":"11","product_type":"11","warranty_start_date":1451845800,"warranty_end_date":1483468200,"product_image_1":"yes","currency_code":"SGD","warranty_id":243468,"warranties":[{"warrantyId":243468,"warrantyType":"MW","startDate":1451845800000}],"companies":[],"totalDays":366,"remainingDays":359,"percentUsed":2},{"title":"Dell XPS","serial_no":"81N67BS","purchased_from":"CHALLENGER","brand_name":"Dell","warranty_period":0,"warranty_in_months":24,"cost":"1299.0","warranty_no":"WW123","country":"Singapore","bill_no":"V123","model_name":"XPS","product_type":"LAPTOP","warranty_start_date":11112,"warranty_end_date":63083112,"currency_code":"SGD","warranty_id":243428,"warranties":[{"warrantyId":243428,"warrantyType":"MW","startDate":11112000}],"companies":[],"totalDays":730,"remainingDays":0,"percentUsed":100},{"title":"Dell LATITUDE","serial_no":"91N67BS","purchased_from":"CHALLENGER","brand_name":"Dell","warranty_period":0,"warranty_in_months":24,"cost":"1099.0","warranty_no":"W123","country":"Singapore","bill_no":"B123","model_name":"LATITUDE","product_type":"LAPTOP","warranty_start_date":10102,"warranty_end_date":63082102,"currency_code":"SGD","warranty_id":243427,"warranties":[{"warrantyId":243427,"warrantyType":"MW","startDate":10102000}],"companies":[],"totalDays":730,"remainingDays":0,"percentUsed":100},{"title":"Sony VAIO","serial_no":"123","purchased_from":"Challenger","brand_name":"Sony","warranty_period":23,"warranty_in_months":24,"cost":"899","warranty_no":"A12345","country":"SG","bill_no":"2312150089","model_name":"VAIO","product_type":"laptop","warranty_start_date":1450800000,"warranty_end_date":1513958400,"currency_code":"SGD","warranty_id":243421,"warranties":[{"warrantyId":243421,"warrantyType":"MW","startDate":1450800000000}],"companies":[],"totalDays":731,"remainingDays":712,"percentUsed":3},{"title":"Motorolla G2","serial_no":"567288","purchased_from":"Croma","brand_name":"Motorolla","warranty_period":23,"warranty_in_months":24,"cost":"40","warranty_no":"GG2276","country":"SG","bill_no":"87123","model_name":"G2","product_type":"Mobile","warranty_start_date":1451154600,"warranty_end_date":1514313000,"currency_code":"SGD","warranty_id":243423,"warranties":[{"warrantyId":243423,"warrantyType":"MW","startDate":1451154600000}],"companies":[],"totalDays":731,"remainingDays":716,"percentUsed":2},{"title":"Apple 6S","serial_no":"S11212","purchased_from":"PTest","brand_name":"Apple","warranty_period":9,"warranty_in_months":10,"cost":"100","warranty_no":"W112","country":"SG","bill_no":"B100","model_name":"6S","product_type":"iPhone","warranty_start_date":1450290600,"warranty_end_date":1476642600,"currency_code":"SGD","warranty_id":243414,"warranties":[{"warrantyId":243414,"warrantyType":"MW","startDate":1450290600000}],"companies":[],"totalDays":305,"remainingDays":280,"percentUsed":8},{"title":"NOKIA EXN","serial_no":"S1234","purchased_from":"TTT","brand_name":"NOKIA","warranty_period":7,"warranty_in_months":10,"cost":"1000","warranty_no":"W90","country":"SG","bill_no":"B80","model_name":"EXN","product_type":"mobile","warranty_start_date":1446316200,"warranty_end_date":1472668200,"currency_code":"SGD","warranty_id":243358,"warranties":[{"warrantyId":243358,"warrantyType":"MW","startDate":1446316200000}],"companies":[],"totalDays":305,"remainingDays":234,"percentUsed":23},{"title":"Lenovo 80JV","serial_no":"R9N0B590700B","purchased_from":"CHALLENGER ","brand_name":"Lenovo","warranty_period":22,"warranty_in_months":24,"cost":"999","warranty_no":"UPC 889955139818","country":"SG","bill_no":"SEE ATT","model_name":"80JV","product_type":"LAPTOP","warranty_start_date":1448628464,"warranty_end_date":1511786864,"product_image_1":"yes","product_image_2":"yes","product_image_3":"yes","warranty_id":243369,"warranties":[{"warrantyId":243369,"warrantyType":"MW","startDate":1448628464000}],"companies":[],"totalDays":731,"remainingDays":687,"percentUsed":6},{"title":"Dell 6320","serial_no":"A111","purchased_from":"Challenger","brand_name":"Dell","warranty_period":0,"warranty_in_months":24,"cost":"333","warranty_no":"333","country":"SG","bill_no":"123","model_name":"6320","product_type":"LAPTOP","warranty_start_date":1447612,"warranty_end_date":64519612,"product_image_1":"yes","product_image_2":"yes","product_image_3":"yes","currency_code":"SGD","warranty_id":243310,"warranties":[{"warrantyId":243310,"warrantyType":"MW","startDate":1447612000}],"companies":[],"totalDays":730,"remainingDays":0,"percentUsed":100},{"title":"Krell 3000","serial_no":"DEMO1","purchased_from":"HI TECH","brand_name":"Krell","warranty_period":10,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"B12434","model_name":"3000","product_type":"Amplifier","warranty_start_date":1447434787,"warranty_end_date":1479057187,"product_image_1":"yes","ext_warranty_purchased":true,"ext_warranty_available":true,"warranty_id":243234,"warranties":[{"warrantyId":243353,"warrantyType":"EW","startDate":1479057187000,"planId":149,"companyId":120284},{"warrantyId":243234,"warrantyType":"MW","startDate":1447434787000}],"companies":[{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false}],"totalDays":366,"remainingDays":308,"percentUsed":16},{"title":"Krell ASDASD","serial_no":"asdkjas","purchased_from":"HI TECH","brand_name":"Krell","warranty_period":9,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"121","model_name":"ASDASD","product_type":"AMPLIFIER","warranty_start_date":1446567194,"warranty_end_date":1478189594,"product_image_1":"yes","warranty_id":243231,"warranties":[{"warrantyId":243231,"warrantyType":"MW","startDate":1446567194000}],"companies":[],"totalDays":366,"remainingDays":298,"percentUsed":19},{"title":"Krell K10S","serial_no":"S129847","purchased_from":"HI TECH","brand_name":"Krell","warranty_period":9,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"B28973","model_name":"K10S","product_type":"AMPLIFIER","warranty_start_date":1446889548,"warranty_end_date":1478511948,"product_image_1":"yes","product_image_2":"yes","ext_warranty_available":true,"warranty_id":243232,"warranties":[{"warrantyId":243232,"warrantyType":"MW","startDate":1446889548000}],"companies":[],"totalDays":366,"remainingDays":302,"percentUsed":17},{"title":"Krell A10S","serial_no":"JSKA","purchased_from":"HITECH","brand_name":"Krell","warranty_period":9,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"HSJS","model_name":"A10S","product_type":"AMPLIFIER","warranty_start_date":1446524098,"warranty_end_date":1478146498,"ext_warranty_purchased":true,"ext_warranty_available":true,"warranty_id":243226,"warranties":[{"warrantyId":243228,"warrantyType":"ADP","startDate":1446524236000,"planId":146,"companyId":120284},{"warrantyId":243227,"warrantyType":"EW","startDate":1478146498000,"planId":146,"companyId":120284},{"warrantyId":243226,"warrantyType":"MW","startDate":1446524098000}],"companies":[{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false},{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false}],"totalDays":366,"remainingDays":298,"percentUsed":19},{"title":"Krell A10S","serial_no":"BAKA","purchased_from":"KRELL","brand_name":"Krell","warranty_period":9,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"IFKD","model_name":"A10S","product_type":"AMPLIFIER","warranty_start_date":1446523925,"warranty_end_date":1478146325,"ext_warranty_purchased":true,"ext_warranty_available":true,"warranty_id":243223,"warranties":[{"warrantyId":243225,"warrantyType":"ADP","startDate":1446524003000,"planId":147,"companyId":120284},{"warrantyId":243224,"warrantyType":"EW","startDate":1478146325000,"planId":147,"companyId":120284},{"warrantyId":243223,"warrantyType":"MW","startDate":1446523925000}],"companies":[{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false},{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false}],"totalDays":366,"remainingDays":298,"percentUsed":19},{"title":"Krell A102","serial_no":"S1231","purchased_from":"HI TECH","brand_name":"Krell","warranty_period":9,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"14131","model_name":"A102","product_type":"AMPLIFIER","warranty_start_date":1446566625,"warranty_end_date":1478189025,"product_image_1":"yes","product_image_2":"yes","product_image_3":"yes","ext_warranty_purchased":true,"warranty_id":243229,"warranties":[{"warrantyId":243230,"warrantyType":"ADP","startDate":1446566850000,"planId":145,"companyId":120284},{"warrantyId":243229,"warrantyType":"MW","startDate":1446566625000}],"companies":[{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false}],"totalDays":366,"remainingDays":298,"percentUsed":19},{"title":"Krell A10S","serial_no":"GAJA","purchased_from":"HITECH","brand_name":"Krell","warranty_period":9,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"B","model_name":"A10S","product_type":"AMPLIFIER","warranty_start_date":1446523807,"warranty_end_date":1478146207,"ext_warranty_purchased":true,"ext_warranty_available":true,"warranty_id":243220,"warranties":[{"warrantyId":243222,"warrantyType":"ADP","startDate":1446523874000,"planId":147,"companyId":120284},{"warrantyId":243221,"warrantyType":"EW","startDate":1478146207000,"planId":147,"companyId":120284},{"warrantyId":243220,"warrantyType":"MW","startDate":1446523807000}],"companies":[{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false},{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false}],"totalDays":366,"remainingDays":298,"percentUsed":19},{"title":"Apple iPhone 6S","serial_no":"S123A","purchased_from":"hitech","brand_name":"Apple","warranty_period":9,"warranty_in_months":12,"cost":"1300","country":"SG","bill_no":"B1","model_name":"iPhone 6S","product_type":"Phone","warranty_start_date":1445741699,"warranty_end_date":1477364099,"warranty_id":243207,"warranties":[{"warrantyId":243207,"warrantyType":"MW","startDate":1445741699000}],"companies":[],"totalDays":366,"remainingDays":289,"percentUsed":21},{"title":"Apple Iphone","serial_no":"S1234","purchased_from":"hitech","brand_name":"Apple","warranty_period":9,"warranty_in_months":12,"cost":"1400","country":"SG","bill_no":"B123","model_name":"Iphone","product_type":"phone","warranty_start_date":1445677673,"warranty_end_date":1477300073,"warranty_id":243195,"warranties":[{"warrantyId":243195,"warrantyType":"MW","startDate":1445677673000}],"companies":[],"totalDays":366,"remainingDays":288,"percentUsed":21},{"title":"Krell 3000","serial_no":"A1213","purchased_from":"Hi tech","brand_name":"Krell","warranty_period":9,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"B123","model_name":"3000","product_type":"Amplifier","warranty_start_date":1446163200,"warranty_end_date":1477785600,"product_image_1":"yes","ext_warranty_purchased":true,"ext_warranty_available":true,"warranty_id":243215,"warranties":[{"warrantyId":243216,"warrantyType":"ADP","startDate":1446483095000,"planId":145,"companyId":120284},{"warrantyId":243215,"warrantyType":"MW","startDate":1446163200000}],"companies":[{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false}],"totalDays":366,"remainingDays":294,"percentUsed":20},{"title":"(CRUCIAL) asdasd","serial_no":"asdasd","purchased_from":"asdsad","brand_name":"(CRUCIAL)","warranty_period":0,"warranty_in_months":12,"cost":"24124","country":"US","bill_no":"fasf","model_name":"asdasd","product_type":"asdasd","warranty_start_date":1407897000,"warranty_end_date":1439433000,"warranty_id":243173,"warranties":[{"warrantyId":243173,"warrantyType":"MW","startDate":1407897000000}],"companies":[],"totalDays":365,"remainingDays":0,"percentUsed":100},{"title":"Krell K10S","serial_no":"S1002","purchased_from":"HI TEXH","brand_name":"Krell","warranty_period":9,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"B7373","model_name":"K10S","product_type":"AMPLIFIER","warranty_start_date":1446515276,"warranty_end_date":1478137676,"product_image_1":"yes","product_image_2":"yes","product_image_3":"yes","ext_warranty_purchased":true,"ext_warranty_available":true,"warranty_id":243217,"warranties":[{"warrantyId":243219,"warrantyType":"ADP","startDate":1446523728000,"planId":147,"companyId":120284},{"warrantyId":243218,"warrantyType":"EW","startDate":1478137676000,"planId":147,"companyId":120284},{"warrantyId":243217,"warrantyType":"MW","startDate":1446515276000}],"companies":[{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false},{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false}],"totalDays":366,"remainingDays":298,"percentUsed":19},{"title":"Krell 3000","serial_no":"SNow","purchased_from":"hitech","brand_name":"Krell","warranty_period":9,"warranty_in_months":12,"cost":"1200","country":"SG","bill_no":"b","model_name":"3000","product_type":"Amplifier","warranty_start_date":1445410926,"warranty_end_date":1477033326,"ext_warranty_purchased":true,"ext_warranty_available":true,"warranty_id":243194,"warranties":[{"warrantyId":243214,"warrantyType":"ADP","startDate":1446397228000,"planId":147,"companyId":120284},{"warrantyId":243213,"warrantyType":"EW","startDate":1477033326000,"planId":147,"companyId":120284},{"warrantyId":243194,"warrantyType":"MW","startDate":1445410926000}],"companies":[{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false},{"companyId":120284,"companyName":"Dave's Warranty Extensions","address1":"3 Wayne Circle","city":"Ambler","state":"Pennsylvania","postalCode":"19002","countryCode":"US","lat":1,"lon":103,"authorized":false,"registered":false}],"totalDays":366,"remainingDays":285,"percentUsed":22},{"title":"YARRAA TV1","serial_no":"S3","purchased_from":"hi tech","brand_name":"YARRAA","warranty_period":0,"warranty_in_months":6,"cost":"1200","country":"SG","bill_no":"b1","model_name":"TV1","product_type":"TV","warranty_start_date":1438309800,"warranty_end_date":1454207400,"warranty_id":231090,"warranties":[{"warrantyId":231090,"warrantyType":"MW","startDate":1438309800000}],"companies":[],"totalDays":184,"remainingDays":21,"percentUsed":89}];
      }
      $scope.populateIssues=function(){
    	  
    	  $scope.isCentersAvailable = false;
        $http({
            url: AppConstants.REST_URL + '/instantfix/issues/warranty/'+$scope.modelSelected,
            method: "GET"
        })
        .then(function(data) {
	    //     data = {"IF":[{"product_id":466,"issue_desc":"Display broken","issue_id":1},{"product_id":466,"issue_desc":"Socket not working","issue_id":5},{"product_id":466,"issue_desc":"Not charging","issue_id":6},{"product_id":466,"issue_desc":"app is not opening","issue_id":7}]};
	         
	         $scope.issues = data.IF;
        });
        
      }
      
      $scope.getServiceCenters = function()
      {
    	  $http({
              url: AppConstants.REST_URL + '/instantfix/sc/'+$scope.issueSelected,
              method: "GET"
          })
          .then(function(data) {
        	  
        	 // data = {"IF":[{"issue_id":1,"service_center_id":1158,"fix_price":300,"rating":3},{"issue_id":1,"service_center_id":1163,"fix_price":400,"rating":5},{"issue_id":1,"service_center_id":1306,"fix_price":300,"rating":1},{"issue_id":1,"service_center_id":1307,"fix_price":296,"rating":0}]};
        	  if(data.IF)
        	  {
        		  $scope.serviceCenterList = data.IF;
        		  $scope.isCentersAvailable = true;
        		  

        	  }
        	 
          });
      }
      
      $scope.populateBrands = function(type)
      {
    	//alert($scope.allUserWarranties.length);
    	  $scope.isCentersAvailable = false;
    	 $scope.brands = [];
    	  $.each($scope.allUserWarranties, function()
		  {
    		 
    		  if(this.product_type.toUpperCase() == type.toUpperCase())
			  {
    			  
    			  $scope.found = false;
    			  item_brandName =  this.brand_name;
    			  $.each($scope.brands, function()
				  {
    				 
    				  if(this == item_brandName)
    				  {    					 
    					  $scope.found = true;
    				  }
				  });
    			  if(!$scope.found)
    			  {
    				  $scope.brands.push(this.brand_name);
    			  }
    			  
			  }
		  });
    	  
      }
      
      $scope.populateProducts = function()
      {
    	  $scope.isCentersAvailable = false;
    	  $scope.models = [];
    	  $.each($scope.allUserWarranties, function()
		  {    		 
    		  if(this.brand_name.toUpperCase() == $scope.brandSelected.toUpperCase())
			  {
    			  $scope.models.push(this);    			  
 			  }
		  });
    	  $scope.modelSelected = "";
      }
      
      $scope.brandChange = function(){
        $http({
            url: 'request-url',
            method: "POST",
            data: { 'brand' : $scope.branditem }
        })
        .then(function(data) {
          if(data){
            if($scope.productSelected){
              $scope.warrantyContainer=true;
              $scope.productContainer=true;
              $scope.productTypes = data;
            }
          }
        });
          
      }
      $scope.fixnow = function(){

      }
      $scope.productTypesChange = function(){

      }


  });
  
  app.directive('starRating', 
		  function starRating() {
		        return {
		            restrict: 'EA',
		            template: '<ul class="star-rating" ng-class="{readonly: readonly}">' + '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' + '    <i class="small material-icons">star_rate</i>' + '  </li>' + '</ul>',
		            scope: {
		            	ratingValue: '=ngModel',
		                max: '=?',
		                onRatingSelect: '&?',
		                readonly: '=?'
		            },
		            link: function (scope, element, attributes) {
		                if (scope.max == undefined) {
		                    scope.max = 5;
		                }
		                function updateStars() {		                	
		                    scope.stars = [];
		                    for (var i = 0; i < scope.max; i++) {		        
		                    	if(i < scope.ratingValue)
		                    	{
		                    		scope.stars.push({ filled: i < scope.ratingValue });
		                    	}
		                        
		                    }
		                    
		                }
		                ;
		                scope.toggle = function (index) {
		                    if (scope.readonly == undefined || scope.readonly === false) {
		                        scope.ratingValue = index + 1;
		                        scope.onRatingSelect({ rating: index + 1 });
		                    }
		                };
		                scope.$watch('ratingValue', function (oldValue, newValue) {
		                    if (newValue) {
		                        updateStars();
		                    }
		                });
		            }
		        };
		}	
 );
              