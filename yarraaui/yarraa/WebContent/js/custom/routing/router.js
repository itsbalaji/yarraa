
app.config(
		  function($routeProvider, $locationProvider) {
		    $routeProvider.
		    	when('/', {
		        templateUrl: 'partials/landing.html',
		        controller: 'ProductCtrl'
		      }).
		      when('/login', {
		        templateUrl: 'partials/login.html',
		        controller: 'LoginCtrl'
		      }).
		      when('/forgotPass', {
		          templateUrl: 'partials/forgotpassword.html',
		          controller: 'LoginCtrl'
		        }).
	        when('/signup', {
		          templateUrl: 'partials/signup.html',
		          controller: 'SignupCtrl'
		        }).
	        when('/landing', {
		          templateUrl: 'partials/landing.html',
		          controller: 'ProductCtrl'
		        }).
	        when('/newProduct', {
		          templateUrl: 'partials/addProduct.html',
		          controller: 'ProductAddCtrl'
		        }).
	        when('/servicecenters', {
		          templateUrl: 'partials/servicecenters.html',
		          controller: 'ServiceCtrl'
		        }).
	        when('/extwarranty', {
		          templateUrl: 'partials/purchasewarranty.html',
		          controller: 'PurchaseCtrl'
		        }).
	        when('/service404', {
		        templateUrl: 'partials/service404.html'
		      }).
		      otherwise({
		        redirectTo: '/'
		      });
		    
		    //$locationProvider.html5Mode({ enabled: true, requireBase: false });
		    
		  
		    
		  })
		  .
		  run(function($rootScope, $location, $http) {
		    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
		    			   
		      if ($rootScope.loggedInUser == null && localStorage.yarraaUser == null) {		    	
			        // no logged user, redirect to /login
			       /* if ( next.templateUrl === "partials/login.html" || next.templateUrl === "partials/forgotpassword.html"
			        	|| next.templateUrl === "partials/signup.html") {
			        	//do nothing. Direct forward to the template
			        } else {
			          $location.path("/");
			        }*/
		    	  
		    	  location.href = "/yarraa/index.html";
		      }
		      else if(localStorage.yarraaUser != null)
		      {
		    	 
		    	  	$rootScope.loggedInUser = JSON.parse(localStorage.yarraaUser);
					$http.defaults.headers.common.Authorization = $rootScope.loggedInUser.session_token; 
					$http.defaults.headers.common['Accept'] = 'application/json';
					$http.defaults.headers.common['Content-Type'] = 'application/json';
		      }
		    });
		  });
