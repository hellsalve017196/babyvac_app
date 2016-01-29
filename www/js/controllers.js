angular.module('starter.controllers', [])

// sign up controllr
  .controller('signupCtrl', function ($scope,$ionicLoading,$state,sign_up_service) {
    console.log($scope.pass_flag);

    $scope.show_error = function(error,flag) {

      if(error.required)
      {
        $ionicLoading.show({ template: 'Following Field is Required', duration: 1500});
      }
      else if(error.pattern)
      {
        if(flag)
        {
          $ionicLoading.show({ template: 'Name must not be only integer/number/special character', duration: 1500});
        }
        else if(flag == '2')
        {
          $ionicLoading.show({ template: "Password doesn't match", duration: 1500});
        }
        else
        {
          $ionicLoading.show({ template: 'Give a valid Email address', duration: 1500});
        }
      }
      else {
        $ionicLoading.show({ template:  "Password Does n't Match", duration: 1500});
      }

    }

    $scope.change = function (confirm,pass) {

      confirm_pass = confirm.$viewValue;
      original = pass.$viewValue;

      if(original === confirm_pass)
      {
        $scope.pass_flag = false;
      }
      else
      {
        $scope.pass_flag = true;
      }

      console.log($scope.pass_flag);
    }

    $scope.final_submittion = function(user,form) {

      if((form.$valid) && !($scope.pass_flag))
      {
        $ionicLoading.show({
          template : "Processing.."
        });

        user['u_type'] = 'guardian';

        response = JSON.parse(sign_up_service(user));

        alert(JSON.stringify(response));

        if(response.status == 'success')
        {
          $ionicLoading.hide();
          alert(response.message);

          $state.go($state.current,{},{reload:true});
        }
        else
        {
          $ionicLoading.hide();
          alert(response.message);
        }
      }
      else
      {
        if(form.fullname.$invalid)
        {
          $scope.fullname_flag = true;
        }
        else
        {
          $scope.fullname_flag = false;
        }

        if(form.email.$invalid)
        {
          $scope.email_flag = true;
        }
        else{
          $scope.email_flag = false;
        }

        if(form.phone.$invalid)
        {
          $scope.phone_flag = true;
        }
        else
        {
          $scope.phone_flag = false;
        }

        if(form.password.$invalid)
        {
          $scope.password_flag = true;
        }
        else
        {
          $scope.password_flag = false;
        }


        if(form.confirm_password.$invalid || $scope.pass_flag)
        {
          $scope.confirm_password_flag = true;
        }
        else
        {
          $scope.confirm_password_flag = false;
        }

        alert("Check Out the Errors")
      }

    }

  })



// log in controller
  .controller('loginCtrl', function ($scope,$state,$cordovaOauth,$ionicLoading,$http,log_in_service,fb_login_service) {

    $scope.logo = "img/logo.png";

    $scope.show_error = function(error) {

      if(error.required)
      {
        $ionicLoading.show({ template: 'Following Field is Required', duration: 1500});
      }
      else if(error.pattern)
      {
        $ionicLoading.show({ template: 'Give a valid Email address', duration: 1500});
      }

    }

    // login with facebook
    $scope.fb_login = function()
    {
      if((localStorage.getItem("fb_access_id") == undefined) && (localStorage.getItem("fb_email_address") == undefined))
      {
        $cordovaOauth.facebook("468793356659311", ["email", "public_profile"]).then(function(result) {
          localStorage.setItem("access_token",result.access_token);
          $scope.fb_login_test();
        }, function(error) {
          alert("There was a problem signing in!  See the console for logs");
          console.log(error);
        });
      }
      else
      {
        user = {'u_email' : localStorage.getItem("fb_email_address") ,'u_password' : localStorage.getItem("fb_access_id")};

        response = JSON.parse(log_in_service(user));

        if(response.status == 'success')
        {
         localStorage.setItem("login",JSON.stringify(response.data));

          $state.go('arena.home',{},{reload : true});
        }
        else
        {
         alert("error occured in server");
        }
      }
    }

    $scope.fb_login_test = function () {
      if(localStorage.getItem("access_token") != undefined)
      {
        $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: localStorage.getItem("access_token"), fields: "id,name,gender,email", format: "json" }}).then(function(result) {

          localStorage.setItem("fb_access_id",result.data.id);
          localStorage.setItem("fb_email_address",result.data.email);

          user = {'email' : result.data.email,'name' : result.data.name,'pass' : result.data.id,'gender' : result.data.gender};

          $ionicLoading.show({
            template : "Processing.."
          });

          response = JSON.parse(fb_login_service(user));

          if(response.status == 'success')
          {
            $ionicLoading.hide();

            localStorage.setItem("login",JSON.stringify(response.data));

            $state.go('arena.home',{},{reload : true});
          }
          else
          {
            alert(response.message);
          }


        }, function(error) {
          alert("There was a problem getting your profile.  Check the logs for details.");
          console.log(error);
        });
      }
    }

    // login with google +
    $scope.googlelogin = function() {

      if((localStorage.getItem("google_access_id") == undefined) && (localStorage.getItem("google_email_address") == undefined))
      {
        $cordovaOauth.google('112380330416-7tfr4078m8355lofjk9dsgc0g3kg73j6.apps.googleusercontent.com',["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]
        ).then(function(result) {

            localStorage.setItem("access_token",result.access_token);
            $scope.googlelogin_test();

          }, function(error) {
            console.log(error);
          });
      }
      else
      {
        user = {'u_email' : localStorage.getItem("google_email_address") ,'u_password' : localStorage.getItem("google_access_id")};

        response = JSON.parse(log_in_service(user));

        if(response.status == 'success')
        {
          localStorage.setItem("login",JSON.stringify(response.data));

          $state.go('arena.home',{},{reload : true});
        }
        else
        {
          alert("error occured in server");
        }
      }

    }

    $scope.googlelogin_test = function () {

      if(localStorage.getItem("access_token") != undefined)
      {
        $http.get("https://www.googleapis.com/oauth2/v3/userinfo",{params : {
          access_token : localStorage.getItem("access_token")
        }}).then(function(result) {

          localStorage.setItem("google_access_id",result.data.sub);
          localStorage.setItem("google_email_address",result.data.email);

          user = {'email' : result.data.email,'name' : result.data.name,'pass' : result.data.sub,'gender' : result.data.gender};

          $ionicLoading.show({
            template : "Processing.."
          });

          response = JSON.parse(fb_login_service(user));

          if(response.status == 'success')
          {
            $ionicLoading.hide();

            localStorage.setItem("login",JSON.stringify(response.data));

            $state.go('arena.home',{},{reload : true});
          }
          else
          {
            alert(response.message);
          }

        },function(err) {

          alert("check log for details");

        });
      }
    }

    $scope.final_submittion = function(user,form) {

      if(form.$valid)
      {
        $ionicLoading.show({
          template : 'Processing...'
        });
        response = JSON.parse(log_in_service(user));


        if(response.status == 'success')
        {
          $ionicLoading.hide();
          user_data = response.data;

          localStorage.setItem("login",JSON.stringify(user_data));

          $state.go("arena.home",{},{reload:true});
        }
        else
        {
          $ionicLoading.hide();
          alert(response.message);
        }
      }
      else
      {
        if(form.email.$invalid)
        {
          $scope.email_flag = true;
        }
        else
        {
          $scope.email_flag = false;
        }

        if(form.password.$invalid)
        {
          $scope.pass_flag = true;
        }
        else
        {
          $scope.pass_flag = false;
        }

        alert("Check the errors");
      }

    }

  })


  //home
  .controller('homeCtrl',function($scope) {

    $scope.goMainWebsite = function () {

      window.open('http://www.parents.com/baby/care/', '_system');

    }

  })


  // child list controller
  .controller('childListCtrl',function($scope,$state,$cordovaLocalNotification,$ionicPopup,$ionicModal,$ionicLoading,$ionicHistory,parent_info,child_list_get,deleteChildService) {
        $scope.optionpopup = {};

        // next view back button disabling
        $ionicHistory.nextViewOptions({ disableBack : false });


        // ionic option display
        $scope.optiondisplay = function(child)
        {
          this.obj = {};

          $ionicModal.fromTemplateUrl('templates/display_options_child.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            // child scope
            $scope.modal = modal;
            $scope.child = child;

            // child event
            $scope.editing_child = function(child)
            {
              $scope.modal.hide();
              $state.go('arena.child_edit',{'c_id': child.c_id,'c_name': child.c_name,'c_dob': child.c_dob ,'c_gender' : child.c_gender},{reload : true});
            }

            // child event
            $scope.immune_details = function(child)
            {
              $scope.modal.hide();
              $state.go('arena.immuni_info',{ 'c_id': child.c_id ,'c_name': child.c_name,'c_dob': child.c_dob },{reload : true});
            }

            // child event
            $scope.toggole_notification = function(child)
            {
              var confirmPopup = $ionicPopup.confirm({
                title: 'Confirmation',
                template: 'Local Notification',
                okText: 'Enable',
                cancelText: 'Disable'
              });

              confirmPopup.then(function(res) {
                if(res)
                {
                  if(child["i_name"] != "completed")
                  {
                    current = new Date().getTime();

                    var time = new Date(current + 10*1000);

                    $cordovaLocalNotification.add({
                      id: child["c_id"],
                      message: "vaccine pending,check app for details",
                      title: child["c_name"],
                      firstAt: time,
                      every: "week",
                      autoCancel: true,
                      sound: null
                    }).then(function () {
                      console.log("The notification has been set");
                    });
                  }
                }
                else
                {
                  $cordovaLocalNotification.cancel(child["c_id"]).then(function(res) {
                    console.log("notification is removed");
                  });
                }

                $scope.modal.hide();
              });

            }

            // child event
            $scope.child_delete = function(c_id)
            {

              var confirmPopup = $ionicPopup.confirm({
                title: 'Confirmation',
                template: 'Do you want to Delete following Data?'
              });

              confirmPopup.then(function(res) {
                if(res)
                {
                  parent = parent_info.get_data();

                  flag = JSON.parse(deleteChildService(c_id,parent['p_id']));

                  if(flag.status == 'success')
                  {
                    localStorage.removeItem(c_id);
                    $scope.modal.hide();
                    $state.go($state.current,{},{reload:true});
                  }
                  else
                  {
                    alert(flag.message);
                  }
                }
                else {
                  console.log('You are not sure');
                }
              });

            }

            modal.show();
          });

        }

        // creating notification
        $scope.localNotify = function(c_list) {
          //$cordovaLocalNotification.cancelAll();

          if(c_list.length > 0)
          {
            for(i = 0; i < c_list.length; i++)
            {
              current = new Date().getTime();

              var time = new Date(current + 10*1000);

              n_id = Math.floor((Math.random() * 100) + 1);

              /*if(localStorage.getItem("notify") == undefined)
              {
                packet = [];
                packet.push(n_id);
                localStorage.setItem("notify",packet);
              }
              else {
                packet = localStorage.getItem("notify");
                packet.push(n_id);
                localStorage.setItem("notify",packet);
              }*/

              //$cordovaLocalNotification.add({
              //  id: n_id,
              //  message: "Vaccine pending:"+c_list[i]["pending"],
              //  title: c_list[i]["c_name"],
              //  firstAt: time,
              //  every: "minute",
              //  autoCancel: true,
              //  sound: null
              //}).then(function () {
              //  console.log("The notification has been set");
              //});

            }
          }
        }


        $scope.getting_child_list = function()
        {
          $ionicLoading.show({
            template : 'Processing...'
          });

          parent = parent_info.get_data();

          child_list = JSON.parse(child_list_get(parent['p_id']));

          if(child_list.status == 'success')
          {
            $ionicLoading.hide();

            $scope.have_child = true;

            $scope.child_list = child_list.data;

            $scope.localNotify(child_list.data);
            localStorage.setItem("child_list",child_list.data);
          }
          else
          {
            $ionicLoading.hide();

            $scope.have_child = false;
          }

        }

        $scope.child_delete = function(c_id)
        {

          var confirmPopup = $ionicPopup.confirm({
            title: 'Confirmation',
            template: 'Do you want to Delete following Data?'
          });

          confirmPopup.then(function(res) {
            if(res)
            {
              parent = parent_info.get_data();

              flag = JSON.parse(deleteChildService(c_id,parent['p_id']));

              if(flag.status == 'success')
              {
                localStorage.removeItem(c_id);

                $state.go($state.current,{},{reload:true});
              }
              else
              {
                alert(flag.message);
              }
            }
            else {
              console.log('You are not sure');
            }
          });

        }


  })


//child add
  .controller('childaddCtrl',function($scope,$state,$ionicHistory,$ionicPopup,$ionicLoading,$cordovaCamera,$cordovaImagePicker,parent_info,addChildService) {
    $scope.c_pic = 'img/avatar-baby.png';

    $scope.show_error = function(error,flag) {

      if(error.required)
      {
        $ionicLoading.show({ template: 'Following Field is Required', duration: 1500});
      }
      else if(error.pattern)
      {
        if(flag)
        {
          $ionicLoading.show({ template: 'Name must not be only integer/number/special character', duration: 1500});
        }
        else
        {
          $ionicLoading.show({ template: 'Give a valid Email address', duration: 1500});
        }

      }


    }

    $scope.takepic = function()
    {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmation',
        template: 'Choose Image from the followings:',
        scope : $scope,
        buttons: [
          {
              text: '<i class="icon ion-camera"></i>', onTap: function(e) {

              var options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
              };

              $cordovaCamera.getPicture(options).then(function(imageData) {

                alert("successfully taken");

                //success
                $scope.c_pic = "data:image/jpeg;base64," + imageData;  // setting the img src


                localStorage.setItem("c_pic",imageData);

              }, function(err) {
                //error
                alert("Select a image");

              });

              return true;
            }
          },
          { text: '<i class="icon ion-image"></i>',onTap:function(e) {

            var options = {
              maximumImagesCount: 1,
              width: 100,
              height: 100,
              quality: 80
            };

            $cordovaImagePicker.getPictures(options)
              .then(function (results) {

                for(i = 0;i < results.length;i++)
                {
                  $scope.c_pic = results[i];

                  //success
                  window.plugins.Base64.encodeFile($scope.c_pic, function(base64){  // Encode URI to Base64 needed for contacts plugin

                    $scope.c_pic = base64;  // setting the img src

                    console.log(base64);

                    localStorage.setItem("c_pic",base64);
                  });
                }

                alert("successfully taken");

              }, function(error) {
                alert("error occured");
              });


            return true;
          }},
          { text: '<i class="icon ion-close-round"></i>', onTap: function(e) { return true; } },
        ]
      });


    }

    $scope.add_child = function(data,form)
    {
      if(form.$valid)
      {
        $ionicLoading.show({
          template : 'Processing...'
        });

        if(localStorage.getItem("c_pic") != undefined)
        {
          data['c_pic'] = localStorage.getItem("c_pic");
          localStorage.removeItem("c_pic");
        }
        else
        {
          data['c_pic'] = '0';
        }

        temp = JSON.parse(JSON.stringify(data));

        temp['c_dob'] = ((new Date(data['c_dob']).getTime())/1000);
        user = parent_info.get_data();
        temp['p_id'] = user['p_id'];

        flag = JSON.parse(addChildService(temp));

        if(flag.status === 'success')
        {
          localStorage.setItem(flag.c_id,data['c_pic']);

          $ionicLoading.hide();

          // disabling back and unexpected navigation dissapearence :D
          $ionicHistory.nextViewOptions({
            disableBack : true
          });

          $state.go("arena.child_list",{},{reload:true});
        }
        else
        {
          $ionicLoading.hide();

          alert(flag.message);
        }
      }
      else
      {

        if(form.c_name.$invalid)
        {
          $scope.c_name_flag = true;
        }
        else
        {
          $scope.c_name_flag = false;
        }

        if(form.c_gender.$invalid)
        {
          $scope.c_gender_flag = true;
        }
        else
        {
          $scope.c_gender_flag = false;
        }

        if(form.c_dob.$invalid)
        {
          $scope.c_dob_flag = true;
        }
        else
        {
          $scope.c_dob_flag = false;
        }

        alert("Check Out The Errors");
      }

    }

  })


// child edit
  .controller('childEditCtrl',function($scope,$rootScope,$stateParams,$state,$ionicPopup,$ionicLoading,$cordovaCamera,$cordovaImagePicker,editChildService) {


    $scope.child = $stateParams;
    $scope.child.c_dob = new Date(parseInt($stateParams['c_dob'] * 1000));

    if(localStorage.getItem($stateParams.c_id) != '0')
    {

      pic = localStorage.getItem($stateParams.c_id);

      if(pic.indexOf('data:image') != -1)
      {
        $scope.c_pic = pic;
      }
      else
      {
        $scope.c_pic = "data:image/jpeg;base64,"+pic;
      }

    }
    else
    {
      $scope.c_pic = "img/avatar-baby.png";
    }


    $scope.show_error = function(error,flag) {

      if(error.required)
      {
        $ionicLoading.show({ template: 'Following Field is Required', duration: 1500});
      }
      else if(error.pattern)
      {
        if(flag)
        {
          $ionicLoading.show({ template: 'Name must not be only integer/number/special character', duration: 1500});
        }
        else
        {
          $ionicLoading.show({ template: 'Give a valid Email address', duration: 1500});
        }

      }

    }

    $scope.takepic = function()
    {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmation',
        template: 'Choose Image from the followings:',
        scope : $scope,
        buttons: [
          {
            text: '<i class="icon ion-camera"></i>', onTap: function(e) {

            var options = {
              quality: 80,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 100,
              targetHeight: 100,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              //success
              $scope.c_pic = "data:image/jpeg;base64," + imageData;  // setting the img src


              localStorage.setItem("c_pic",imageData);

              alert("successfully taken");

            }, function(err) {
              //error
              alert("Select a image");

            });

            return true;
          }
          },
          { text: '<i class="icon ion-image"></i>',onTap:function(e) {

            var options = {
              maximumImagesCount: 1,
              width: 100,
              height: 100,
              quality: 100
            };

            $cordovaImagePicker.getPictures(options)
              .then(function (results) {

                for(i = 0;i < results.length;i++)
                {
                  $scope.c_pic = results[i];

                  //success
                  window.plugins.Base64.encodeFile($scope.c_pic, function(base64){  // Encode URI to Base64 needed for contacts plugin

                    $scope.c_pic = base64;  // setting the img src

                    console.log(base64);

                    localStorage.setItem("c_pic",base64);
                  });
                }

                alert("successfully taken");
              }, function(error) {
                alert("error occured");
              });

            return true;
          }},
          { text: '<i class="icon ion-close-round"></i>', onTap: function(e) { return true; } },
        ]
      });


    }

    $scope.edit_child = function(data,form)
    {

      if(form.$valid)
      {
        $ionicLoading.show({
          template : 'Processing...'
        });

        if(localStorage.getItem("c_pic") != undefined)
        {
          data['c_pic'] = localStorage.getItem("c_pic");
          localStorage.removeItem("c_pic");
        }
        else
        {
          data['c_pic'] = localStorage.getItem(data['c_id']);
        }

        temp = JSON.parse(JSON.stringify(data));

        temp['c_dob'] = (new Date(data['c_dob']).getTime()/1000);

        flag = JSON.parse(editChildService(temp));

        if(flag.status === 'success')
        {
          localStorage.setItem(data['c_id'],data['c_pic']);

          $ionicLoading.hide();
          $state.go("arena.child_list",{},{reload:true});
        }
        else
        {
          $ionicLoading.hide();
          alert(flag.message);
        }
      }
      else
      {
        if(form.c_name.$invalid)
        {
          $scope.c_name_flag = true;
        }
        else
        {
          $scope.c_name_flag = false;
        }

        if(form.c_gender.$invalid)
        {
          $scope.c_gender_flag = true;
        }
        else
        {
          $scope.c_gender_flag = false;
        }

        if(form.c_dob.$invalid)
        {
          $scope.c_dob_flag = true;
        }
        else
        {
          $scope.c_dob_flag = false;
        }

        alert("Check Out Errors");
      }

    }

  })

// immune list for a child
  .controller('immunelistCtrl',function($scope,$stateParams,$state,$ionicModal,$ionicPopup,$ionicLoading,immuni_history_service,delete_immune_service) {

    $scope.c_name = $stateParams.c_name;
    localStorage.setItem("c_id",$stateParams.c_id);

    $scope.getting_immune_history = function()
    {
      $ionicLoading.show({
        template : 'Processing...'
      });

      packet = JSON.parse(immuni_history_service(localStorage.getItem("c_id")));

      if(packet.status == 'success')
      {
        $ionicLoading.hide();

        $scope.have_history = true;
        $scope.immune_history = packet.data;
      }
      else
      {
        $ionicLoading.hide();

        $scope.have_history = false;
      }
    }

    $scope.getting_immune_history();


    // ionic option display
    $scope.optiondisplay = function(immune)
    {
      this.obj = {};

      $ionicModal.fromTemplateUrl('templates/display_options_immune.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        // child scope
        $scope.modal = modal;
        $scope.immune = immune;

        $scope.immune_edit = function(immune){
          $scope.modal.hide();

          $state.go('arena.immune_edit',{'c_id': immune.c_id,'c_i_id': immune.c_i_id,'c_i_type':immune.c_i_type,'c_i_date': immune.c_i_date},{reload : true});
        }

        $scope.immune_delete = function(c_i_id)
        {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Confirmation',
            template: 'Do you want to Delete following Data?'
          });

          confirmPopup.then(function(res) {
            if(res)
            {
              flag = JSON.parse(delete_immune_service(c_i_id));

              if(flag.status == "success")
              {
                $scope.modal.hide();
                $state.go($state.current,{},{reload : true});
              }
              else
              {
                $scope.modal.hide();
                alert("error occured");
              }
            }
            else{
              console.log("wassup");
            }
          });
        }

        modal.show();
      });

    }

  })

  .controller('immuniaddCtrl',function($scope,$state,$ionicLoading,available_vaccine_service,add_immune_service) {

    $ionicLoading.show({
      template : 'Processing...'
    });

    vaccine_packet = JSON.parse(available_vaccine_service(localStorage.getItem("c_id")));

    if(vaccine_packet.status == 'success')
    {
      $ionicLoading.hide();
      $scope.vaccine_list = vaccine_packet.data;
    }

    // error handling
    $scope.show_error = function(error,flag) {

      if(error.required)
      {
        $ionicLoading.show({ template: 'Following Field is Required', duration: 1500});
      }
      else if(error.pattern)
      {
        if(flag)
        {
          $ionicLoading.show({ template: 'must not be only integer/number/special character', duration: 1500});
        }
        else
        {
          $ionicLoading.show({ template: 'Give a valid Email address', duration: 1500});
        }

      }

    }

    //adding immunization
    $scope.add_immune = function(immune,form)
    {
        if(form.$valid)
        {
          $ionicLoading.show({
            template : 'Processing...'
          });

          packet = {};

          packet["initial_info"] = {"c_i_type" : immune["c_i_type"],"c_i_date" : (new Date(immune['c_i_date']).getTime()/1000),"c_id" : localStorage.getItem("c_id")};
          packet["detail_info"] = {"doctor_name" : immune['doctor_name'],"Lot" : immune['Lot'],"i_id" : immune['i_id'],"c_id" : localStorage.getItem("c_id")};

          flag = JSON.parse(add_immune_service(packet));


          if(flag.status == 'success')
          {
            $ionicLoading.hide();
            alert("successfully added");

            $state.go($state.current,{},{reload : true});
          }
          else
          {
            $ionicLoading.hide();
            alert("error occured");
          }

        }
        else
        {
            if(form.c_i_type.$invalid)
            {
              $scope.c_i_type_flag = true;
            }
            else
            {
              $scope.c_i_type_flag = false;
            }

            if(form.c_i_date.$invalid)
            {
              $scope.c_i_date_flag = true;
            }
            else
            {
              $scope.c_i_date_flag = false;
            }

            if(form.doctor_name.$invalid)
            {
              $scope.doctor_name_flag = true;
            }
            else
            {
              $scope.doctor_name_flag = false;
            }

            if(form.Lot.$invalid)
            {
              $scope.Lot_flag = true;
            }
            else
            {
              $scope.Lot_flag = false;
            }

            if(form.i_id.$invalid)
            {
              $scope.i_id_flag = true;
            }
            else
            {
              $scope.i_id_flag = false;
            }
        }
    }


  })


  // immune edit
  .controller('immune_edit_Ctrl',function($scope,$state,$stateParams,$ionicLoading,immuni_history_detail_service,vaccine_list_service,edit_immune_service) {

    $ionicLoading.show({
      template : 'Processing...'
    });
    vaccine_packet = JSON.parse(vaccine_list_service());

    if(vaccine_packet.status == 'success')
    {
      $ionicLoading.hide();
      $scope.vaccine_list = vaccine_packet.data;
    }

    detail_packet = JSON.parse(immuni_history_detail_service($stateParams.c_i_id));

    if(detail_packet.status == 'success')
    {
      $scope.immune = detail_packet.data;
      $scope.immune.c_i_date = new Date(detail_packet.data.c_i_date*1000);
    }

    // error handling
    $scope.show_error = function(error,flag) {

      if(error.required)
      {
        $ionicLoading.show({ template: 'Following Field is Required', duration: 1500});
      }
      else if(error.pattern)
      {
        if(flag)
        {
          $ionicLoading.show({ template: 'must not be only integer/number/special character', duration: 1500});
        }
        else
        {
          $ionicLoading.show({ template: 'Give a valid Email address', duration: 1500});
        }

      }

    }

    $scope.edit_immune = function(immune,form)
    {
      temp = JSON.parse(JSON.stringify(immune));

      if(form.$valid)
      {
        $ionicLoading.show({
          template : 'Processing...'
        });
        packet = {};

        packet["initial_info"] = {"c_i_id" : immune["c_i_id"],"c_i_type" : immune["c_i_type"],"c_i_date" : (new Date(immune['c_i_date']).getTime()/1000),"c_id" : localStorage.getItem("c_id")};
        packet["detail_info"] = {"c_i_d_id" : immune["c_i_d_id"],"doctor_name" : immune['doctor_name'],"Lot" : immune['Lot'],"i_id" : immune['i_id'],"c_id" : localStorage.getItem("c_id")};

        flag = JSON.parse(edit_immune_service(packet));

        if(flag.status == "success")
        {
          $ionicLoading.hide();
          alert(flag.message);

          $state.go("arena.child_list",{},{reload:true});
        }
        else{
          $ionicLoading.hide();
          alert("Error from the Server");
        }

      }
      else
      {
          if(form.c_i_type.$invalid)
          {
            $scope.c_i_type_flag = true;
          }
          else
          {
            $scope.c_i_type_flag = false;
          }

          if(form.c_i_date.$invalid)
          {
            $scope.c_i_date_flag = true;
          }
          else
          {
            $scope.c_i_date_flag = false;
          }

          if(form.doctor_name.$invalid)
          {
            $scope.doctor_name_flag = true;
          }
          else
          {
            $scope.doctor_name_flag = false;
          }

          if(form.Lot.$invalid)
          {
            $scope.Lot_flag = true;
          }
          else
          {
            $scope.Lot_flag = false;
          }

          if(form.i_id.$invalid)
          {
            $scope.i_id_flag = true;
          }
          else
          {
            $scope.i_id_flag = false;
          }
      }


    }


  })


// log out controller

  .controller('area_menu_Ctrl', function ($scope,$state) {

    $scope.getting_out = function()
    {
        localStorage.removeItem("login");
        console.log("log out");
        $state.go("login",{},{reload:true});

    }


  })


  .controller('immune_side_effect_Ctrl',function($scope,$ionicPopup,$ionicLoading,vaccine_list_service) {
      $ionicLoading.show({
        template:"Processing..."
      });

      vaccine_packet = JSON.parse(vaccine_list_service());

      if(vaccine_packet.status == 'success')
      {
        $ionicLoading.hide();

        if(sessionStorage.getItem("side_effect_first_time") == undefined)
        {
          $ionicLoading.show({ template: 'Tap on the name to get side effect of the information', duration: 2500});

          sessionStorage.setItem("side_effect_first_time","1");
        }


        $scope.immune_list = vaccine_packet.data;
      }
      else{

      }

  })


  .controller('immune_side_effect_detail_Ctrl',function($scope,$stateParams) {
          $scope.i_name = $stateParams.i_name;
  })


  .controller('disease_list_Ctrl',function($scope,$ionicLoading,$ionicPopup,disease_list_service) {
    $ionicLoading.show({
      template:"Processing..."
    });

    try
    {
      disease_packet = JSON.parse(disease_list_service());

      if(disease_packet.status == 'success')
      {
        $ionicLoading.hide();

        if(sessionStorage.getItem("disease_list_first_time") == undefined)
        {
          $ionicLoading.show({ template: 'Tap on the name to get Disease information', duration: 2500});

          sessionStorage.setItem("disease_list_first_time","1");
        }

        $scope.disease_list = disease_packet.data;
      }
      else{

      }
    }
    catch(e)
    {
      console.log(e);
    }

  })


  .controller('disease_details_Ctrl', function ($scope,$stateParams) {
      $scope.disease = $stateParams;
  })


  .controller('edit_profile_Ctrl',function($scope,$state,$ionicHistory,$ionicLoading,edit_profile_service) {
    $scope.message = JSON.parse(localStorage.getItem("login"));
    $scope.readOnly = true;
    // next view back button disabling
    $ionicHistory.nextViewOptions({ disableBack : false });

    $scope.readorwrite = function () {

      $scope.readOnly = ($scope.readOnly)?false:true;

    }

    $scope.show_error = function(error,flag) {

      if(error.required)
      {
        $ionicLoading.show({ template: 'Following Field is Required', duration: 1500});
      }
      else if(error.pattern)
      {
        if(flag)
        {
          $ionicLoading.show({ template: 'Name must not be only integer/number/special character', duration: 1500});
        }
        else if(flag == '2')
        {
          $ionicLoading.show({ template: "Password doesn't match", duration: 1500});
        }
        else
        {
          $ionicLoading.show({ template: 'Give a valid Email address', duration: 1500});
        }
      }
      else {
        $ionicLoading.show({ template:  "Password Does n't Match", duration: 1500});
      }

    }

    $scope.final_submittion = function(user,form) {

      if((form.$valid))
      {
        $ionicLoading.show({
          template : "Processing.."
        });

        user = {"user":{ 'u_email' : user.u_email ,'u_id' : user.u_id},"parent":{'p_id' : user.p_id,'p_gender' : user.p_gender,'p_name' : user.p_name,'p_phone' : user.p_phone,'p_address' : user.p_address,'p_region' : user.p_region}};

        console.log(JSON.stringify(user));

        response = edit_profile_service(user);

        response = JSON.parse(response);

        if(response.status == 'success')
        {
          $ionicLoading.hide();
          alert(response.message);

          localStorage.setItem("login",JSON.stringify(response.data));

          $state.go('arena.home',{},{reload:true});
        }
        else
        {
          $ionicLoading.hide();
          alert(response.message);
        }
      }
      else
      {
        if(form.fullname.$invalid)
        {
          $scope.fullname_flag = true;
        }
        else
        {
          $scope.fullname_flag = false;
        }

        if(form.email.$invalid)
        {
          $scope.email_flag = true;
        }
        else{
          $scope.email_flag = false;
        }


        //if(form.confirm_password.$invalid || $scope.pass_flag)
        //{
        //  $scope.confirm_password_flag = true;
        //}
        //else
        //{
        //  $scope.confirm_password_flag = false;
        //}

        alert("Check Out the Errors")
      }

    }
  })


