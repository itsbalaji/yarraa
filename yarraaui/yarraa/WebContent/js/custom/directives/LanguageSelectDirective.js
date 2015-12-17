/**
 * @ngdoc function
 * @name directive:LanguageSelectDirective
 * @description
 * # LanguageSelectDirective
 * Directive to append language select and set its view and behavior
 */
app.directive('ngTranslateLanguageSelect', function () {
    'use strict';

    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'chooseLanguage.html'
     
    };
  });


