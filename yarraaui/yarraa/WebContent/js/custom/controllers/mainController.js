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


app.run(function($rootScope, $location) {
	/**
	 * Event-Listner for Back-Button
	 */
	$rootScope.$on('$locationChangeStart', function(event, next, current){   
		
		if(current.indexOf('/html/index.html') > -1 && 
				next.indexOf('/html/index.html') > -1)
		{
			
		}
		else if(next != current)
		{
			event.stopPropagation();
			// Here you can take the control and call your own functions:
			   // alert('Sorry ! Back Button is disabled');
			    // Prevent the browser default action (Going back):
			    event.preventDefault();      
		}
	          
	});
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
	
		
}).filter('ifEmpty', function() {
    return function(input, defaultValue) {
        if (angular.isUndefined(input) || input === null || input === '') {
            return defaultValue;
        }

        return input;
    }
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
			  
			   /*if($("#alertMessage").length )
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
		    	}*/
			   if($("#notofyModal").length )
		    	{				   
				   $("#alertMessage").removeClass();
				   $("#alertMessage").addClass("alert-success");		    	
				   $("#alertDesc").html(msg);				  
				   $('#notofyModal').openModal();
				   $("#confirmActionBtns").remove();
		    	}
			   
			   else
			   {
			   	win.alert("Success!"+msg);
			   }
			   if(callback)callback();
		     },
	     failure : function(msg, callback) {
	    	 
	    	/*if($("#alertMessage").length )
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
	    	}*/
	    	 if($("#notofyModal").length )
		    	{
				  
				   $("#alertMessage").removeClass();
				   $("#alertMessage").addClass("alert-danger");		    	
				   $("#alertDesc").html(msg);
				   //$("#alertMessage").focus();
				   $('#notofyModal').openModal();
				   $("#confirmActionBtns").remove();
				   
		    	}
	    	 else
	    	 {
	    		 win.alert("Error!"+msg);		    	 
	    	 }
	    	 
	    	 if(callback)callback();
	    	 
		  } ,
	     info : function(msg) {  
	    	 
	    	if($("#notofyModal").length )
	    	{				   
			   $("#alertMessage").removeClass();
			   $("#alertMessage").addClass("alert-info");		    	
			   $("#alertDesc").html(msg);
			   $("#confirmActionBtns").remove();
			   $('#notofyModal').openModal();
	    	}
		  },
		  confirm : function(msg, callbackYes, callbackCancel) {	    	 
		    
		    	
		    	$("#alertMessage").removeClass();
				$("#alertMessage").addClass("alert-danger");		    	
				$("#alertDesc").html(msg);
				
				$('#notofyModal').openModal();				
				$("#confirmActionBtns").remove();
				
//				var $newdiv1 = $( '<div id="confirmActionBtns" class="row">' +
//	                '<div class="col s6" style="padding:20px;">' + 
//	                	'<button class="btn waves-effect waves-light left" ng-click="callbackYes()" name="action">{{"YES"|translate}}</button> &nbsp;<span class="buttonbar"></span>' +
//	                    '<button class="btn waves-effect waves-light left" ng-click="callbackCancel()" name="action">{{"NO"|translate}}</button>' +                   
//	               '</div>'+
//               '</div>');
				var $newdiv1 = $( '<button id="confirmActionBtns" class="btn waves-effect waves-light left"  name="action">DELETE</button> ');
				$("#alertMessage .modal-footer").append($newdiv1);
				
				$("#confirmActionBtns").click(function() {
					$('#notofyModal').closeModal();	
					callbackYes();
				});
				
		    	 
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
			   $("#alertDesc").html(msg);
			   $('#notofyModal').openModal();
			   $("#confirmActionBtns").remove();
		     } 
	   };
	 }]);
	
	app.directive('userInfo', ['AppConstants',
		function(AppConstants)
		{
			return {				
				templateUrl:'partials/user-info.html',
				controller: function($scope)
				{
					$scope.REST_URL = AppConstants.REST_URL;
				}
			};
		}]
	);
