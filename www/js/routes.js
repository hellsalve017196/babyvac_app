angular.module('starter.routes',[])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      /* login and signup  */

      .state('login',{
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('sign_up',{
        url:'/sign_up',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })

      /* login and signup  */


      /*  parents criteria  */
      .state('arena',{
        url: '/arena',
        abstract: true,
        templateUrl: 'templates/arena_menu.html',
        controller: 'area_menu_Ctrl'
      })

      .state('arena.edit_profile',{
        url:'/edit_profile',
        views: {
          'menuContent' : {
            templateUrl: 'templates/profile_edit.html',
            controller: 'edit_profile_Ctrl'
          }
        }
      })

      .state('arena.home',{
        url:'/home',
        views: {
          'menuContent' : {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })

      .state('arena.template',{
        url:'/template',
        views: {
          'menuContent' : {
            templateUrl: 'templates/template.html'
          }
        }
      })

      .state('arena.child_add',{
        url:'/child_add',
        views: {
          'menuContent' : {
            templateUrl: 'templates/child_add.html',
            controller: 'childaddCtrl'
          }
        }
      })

      .state('arena.child_list',{
        url:'/child_list',
        views: {
          'menuContent' : {
            templateUrl: 'templates/child_list.html',
            controller: 'childListCtrl'
          }
        }
      })

      .state('arena.child_edit',{
        url:'/{c_id}/{c_name}/{c_dob}/{c_gender}',
        views: {
          'menuContent' : {
            templateUrl: 'templates/child_edit.html',
            controller: 'childEditCtrl'
          }
        }
      })

      .state('arena.immuni_info',{
        url:'/{c_id}/{c_name}/{c_dob}',
        views: {
          'menuContent' : {
            templateUrl: 'templates/immune_list.html',
            controller: 'immunelistCtrl'
          }
        }
      })

      .state('arena.immuni_add',{
        url:'/immuni_add',
        views: {
          'menuContent' : {
            templateUrl: 'templates/add_immuni.html',
            controller: 'immuniaddCtrl'
          }
        }
      })

      .state('arena.immune_edit',{
        url:'/{c_id}/{c_i_id}/{c_i_type}/{c_i_date}',
        views: {
          'menuContent' : {
            templateUrl: 'templates/immune_edit.html',
            controller: 'immune_edit_Ctrl'
          }
        }
      })

      .state('arena.immuni_side_effect',{
        url:'/immuni_side_effect',
        views: {
          'menuContent' : {
            templateUrl: 'templates/immune_side_effect_list.html',
            controller : 'immune_side_effect_Ctrl'
          }
        }
      })


      .state('arena.immuni_side_effect_details',{
        url:'/{i_name}',
        views: {
          'menuContent' : {
            templateUrl: 'templates/side_effect_detail.html',
            controller : 'immune_side_effect_detail_Ctrl'
          }
        }
      })

      .state('arena.disease_list',{
        url:'/disease_list',
        views: {
          'menuContent' : {
            templateUrl: 'templates/disease_list.html',
            controller : 'disease_list_Ctrl'
          }
        }
      })


      .state('arena.disease_details',{
        url:'/{d_name}/{d_des}/{covered_by}',
        views: {
          'menuContent' : {
            templateUrl: 'templates/disease_details.html',
            controller : 'disease_details_Ctrl'
          }
        }
      })


    /*  parents criteria  */


    // if none of the above states are matched, use this as the fallback

    if(localStorage.getItem("login") == undefined)
    {
      $urlRouterProvider.otherwise('/login');
    }
    else
    {
      $urlRouterProvider.otherwise('/arena/home');
    }

  });
