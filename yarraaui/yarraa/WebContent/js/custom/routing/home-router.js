app.config(
		function($routeProvider, $locationProvider) {
		    $routeProvider.
		    	when('/', {
		        templateUrl: 'partials/home.html',
		        controller: 'MainCtrl'
		      }).
		      when('/FAQs', {
			        templateUrl: 'partials/FAQs.html'
			      }).
		      when('/contactus', {
			        templateUrl: 'partials/contactus.html'
			      }).
	        when('/copyright', {
		          templateUrl: 'partials/copyright.html'
		        }).
	        when('/privacypolicy', {
		          templateUrl: 'partials/privacypolicy.html'
		        }).  
	        when('/termsandcondition', {
		          templateUrl: 'partials/termsandcondition.html'
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
		      otherwise({
			        redirectTo: '/'
			});
		    
		  }).
		  run(function($rootScope, $location, $http) {
		    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
		    			   
		      if ($rootScope.loggedInUser == null && localStorage.yarraaUser == null) {
		    	//  location.href = "/yarraa/index.html";
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