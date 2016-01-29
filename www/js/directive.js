angular.module('starter.directive',[])

  // form validation
  .directive('formManager', function($ionicLoading) {
    return {
      restrict : 'A',
      controller : function($scope) {

        // sign up
        $scope.$watch('faleComigoForm.$valid', function() {

          if($scope.faleComigoForm.$valid)
          {
            $scope.inner = true;
          }
          else
          {
            $scope.inner = false;
          }

          console.log("Form validity changed. Now : " + $scope.faleComigoForm.$valid);
        });

        /*$scope.change = function (confirm) {
            pass = $scope.faleComigoForm.password.$viewValue;

            if(pass === confirm)
            {
                $scope.pass_flag = false;
            }
            else
            {
                $scope.pass_flag = true;
            }

        }*/

        $scope.submit = function(user) {

          if($scope.faleComigoForm.$valid) {

            $scope.final_submittion(user);

          } else {
            $ionicLoading.show({ template: 'Please Fill Form properly', duration: 1500})
          }

        }

      }
    }
  })


