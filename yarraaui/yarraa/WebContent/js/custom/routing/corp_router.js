
app.config(
		  function($routeProvider, $locationProvider) {
		    $routeProvider.
			   when('/', {
			        templateUrl: 'partials/corp_landing.html',
			        controller: 'UploadCtrl'
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
