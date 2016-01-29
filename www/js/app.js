// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','starter.directive','starter.routes', 'starter.controllers','starter.services','starter.filter'])

.run(function($ionicPlatform,$rootScope,$timeout,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }



    // base url
    localStorage.setItem("url","http://rupamit.com/app/babyvax/service/index.php/");
    //localStorage.setItem("url","http://10.0.100.27:8080/babyvac/service/index.php/");
    //localStorage.setItem("url","http://192.168.0.101:80/babyvac/service/index.php/");

    if(sessionStorage.getItem("side_effect_first_time") != undefined)
    {
      sessionStorage.removeItem("side_effect_first_time");
    }

    if(sessionStorage.getItem("disease_list_first_time") != undefined)
    {
      sessionStorage.removeItem("disease_list_first_time");
    }

    // click on the notification
    /*$timeout(function() {
      $state.go("arena.child_list",{},{reload : true});
    });*/

  });
})

