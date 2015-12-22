'use strict';
var app = angular.module('yaraaApp', ['ngRoute', 'ngCookies', 'pascalprecht.translate',
                                      'tmh.dynamicLocale']);

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
        	
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});


app.controller("MainCtrl", function($scope, $location, $rootScope,$http, BRAND_TAGLINE) {
	$rootScope.loggedInUser = null;
	$scope.BRAND_TAGLINE = BRAND_TAGLINE;
	
	$scope.partners = [];
	$scope.brands = [];
	$scope.stats = {};
	
	
	$http.get("/yarraa/files/partners")
		.then(function(response)
		{		
			$scope.partners = response.data.partners;
			
		}
		,function()
		{
			//alert('Technical Error 2: Unable to get partner list');			
		});
	$http.get("/yarraa/stats")
	.then(function(response)
	{		
		$scope.stats = response.data;
		
	}
	,function()
	{
		//alert('Technical Error 2: Unable to get partner list');			
	});
	
	$http.get("/yarraa/files/brands")
		.then(function(response)
		{		
			$scope.brands = response.data.brands;
			
		}
		,function()
		{
			//alert('Technical Error 2: Unable to get partner list');			
		});
	
	$scope.$on('ngPartnersFinished', function(ngRepeatFinishedEvent) {
		
		$("#our-partners").owlCarousel({
			autoPlay: 3000, //Set AutoPlay to 3 seconds
			items : 6,
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [979,4]
			});
	});
	
	
	
	$scope.$on('ngBrandsFinished', function(ngRepeatFinishedEvent) {
		$("#yarraa-brands").owlCarousel({
			autoPlay: 3000, //Set AutoPlay to 3 seconds
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]
		});
	});
		
});



app.directive('scrollTo', function ($location, $anchorScroll) {
	  return function(scope, element, attrs) {
		  $(element).click(function(event) {			
			  event.stopPropagation();
		        var off = scope.$on('$locationChangeStart', function(ev) {
		            off();
		            ev.preventDefault();
		        });
		        var location = attrs.scrollTo;
		        $location.hash(location);
		        $anchorScroll();
	        });
		 	  
	    };
	});



app.config(['$httpProvider', function($httpProvider) {
	 //$httpProvider.defaults.useXDomain = true;
	   // $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
	   //$httpProvider.defaults.headers.common['Access-Control-Request-Headers'] = 'x-requested-with';
	
	
	// alert(JSON.stringify($httpProvider.defaults.headers.common));
	    
}]);

app.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
});

app.constant("AppConstants", {
		"REST_URL" : "http://54.179.167.160:8080/Yarraa",
		"REST_LOCAL_URL" : "/yarraa/api",
		"SERVICE_URL" :"/yarraa"
	}).constant('DEBUG_MODE', /*DEBUG_MODE*/true/*DEBUG_MODE*/)
	  .constant('LOCALES', {
	      'locales': {
	          'en_US': 'English',
	          'es': 'Español'
	      },
	      'preferredLocale': 'en_US'
	  })
	   .constant('LANG_CODE', {
	       'langCode': {
	           'en_US': 'Eng',
	           'es': 'Esp'
	       }
	   })
	   .constant('STATIC_LABELS_FILE_PREFIX', '/yarraa/js/custom/locales/data/locale-')
	   .constant('LOCALE_PREFIX', '/yarraa/js/custom/locales/angular-locale_')
	   .constant('BRAND_TAGLINE',
			   {
		   			'olympus.png':'Your Vision, Our Future'
			   });




app.factory('notify', ['$window', function(win) {
	   return {
		   clearNotify : function()
			  {
				
		   			$("#alertMessage").removeClass();
		   			$("#alertStatus").html('');
		   			$("#alertDesc").html('');
			  },
		   success : function(msg, callback) {
			   if($("#alertMessage").length )
		    	{
				   $("#alertMessage").removeClass();
				   $("#alertMessage").addClass("alert-success");
				   $("#alertStatus").html("Success!");
				   $("#alertDesc").html(msg);
				   $("#alertMessage").focus();
				   setTimeout(function()
						   {
					   			//clear after 10 seconds
					   			$("#alertMessage").removeClass();
					   			$("#alertStatus").html('');
					   			$("#alertDesc").html('');
						   }, 10000);
		    	}
			   
			   else
			   {
			   	win.alert("Success!"+msg);
			   }
			   if(callback)callback();
		     },
	     failure : function(msg, callback) {
	    	if($("#alertMessage").length )
	    	{
	    		 $("#alertMessage").removeClass();
				   $("#alertMessage").addClass("alert-danger");
		    	 //$("#alertStatus").html("Error!");
				   $("#alertDesc").html(msg);
				   $("#alertMessage").focus();
				   
				   setTimeout(function()
						   {
					   			//clear after 10 seconds
					   			$("#alertMessage").removeClass();
					   			$("#alertStatus").html('');
					   			$("#alertDesc").html('');
						   }, 5000);
	    	}
	    	 else
	    	 {
	    		 win.alert("Error!"+msg);		    	 
	    	 }
	    	 
	    	 if(callback)callback();
	    	 
		  } ,
	     info : function(msg) {
	    	 $("#alertMessage").removeClass();
			   $("#alertMessage").addClass("alert-info");
			   $("#alertStatus").html("Loading...");
			   $("#alertDesc").html(msg);
			   $("#alertMessage").focus();
			   
			 //clear after 10 seconds
			   setTimeout(function()
					   {				   
				   			clearNotify();
					   }, 10000);
		  } 
	   };
	 }]);

	app.service('apiCall', ['$http', '$location', function($http,$location, $window ) {
	   return {
		   get : function(url, successCallback, errorCallback) {
			 
			   $http.get(url)
				.then(function(response)
				{					
					if(response.data.errors)
					{
						if(response.data.errors[0] && response.data.errors[0].code == 400)
						{
							localStorage.removeItem('yarraaUser');
							//$location.path("/login");
							location.href="html/index.html";
						}
					}
					successCallback(response);
				}
				,function()
				{
					$window.alert('Technical Error');	
					errorCallback();
				});
		     },
	     failure : function(msg) {
	    	 $("#alertMessage").removeClass();
			   $("#alertMessage").addClass("alert-danger");
	    	 $("#alertStatus").html("Error!");
			   $("#alertStatus").html(msg);
			   $("#alertMessage").focus();
		     } 
	   };
	 }]);
	
	app.directive('userInfo', 
		function()
		{
			return {
				templateUrl:'partials/user-info.html'
			};
		}
	);