app.controller('LanguageSelect',function ($scope, $translate) { 
    $scope.changeLanguage = function (locale) {
    	$translate.use(locale);
    };
    // Tell the module what language to use by default
    $translate.use('en_US');
 
  });