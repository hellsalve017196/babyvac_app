angular.module('starter.services',[])

  // sign up service
  .service('sign_up_service',[function () {
    var serviceMethod = function (user) {

      var request;
      if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
      }

      try{
        request.open('POST', localStorage.getItem("url") + "login_app/sign_up", false);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send("user="+JSON.stringify(user));
      }
      catch(e)
      {
        return 0;
      }

      if (request.status === 200) {
        return request.responseText;
      }

    };
    return serviceMethod;
  }])


  // login service
  .service('log_in_service',[
    function() {
      var serviceMethod = function (user) {

        var request;
        if (window.XMLHttpRequest) {
          request = new XMLHttpRequest();
        }

        try{
          request.open('POST', localStorage.getItem("url") + "login_app/getting_in", false);
          request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          request.send("user="+JSON.stringify(user));
        }
        catch(e)
        {
          alert("error:"+e);
          return 0;
        }

        if (request.status === 200) {
          return request.responseText;
        }

      };
      return serviceMethod;
    }
  ])


  // facebook login
  .service('fb_login_service',[
    function() {

      var serviceMethod = function (user) {

        var request;
        if (window.XMLHttpRequest) {
          request = new XMLHttpRequest();
        }

        try{
          url = localStorage.getItem("url") + "login_app/sign_up_with_facebook?email="+user.email+"&name="+user.name+"&pass="+user.pass+"&gender="+user.gender;

          request.open('GET',url, false);
          request.send(null);

        }
        catch(e)
        {
          alert(e);
          return 0;
        }

        if (request.status === 200) {
          return request.responseText;
        }

      };
      return serviceMethod;
    }
  ])


  // parent info
  .service('parent_info',function() {
      this.get_data = function()
      {
        user = JSON.parse(localStorage.getItem("login"));

        return user;
      }
  })


  // getting child list
  .service('child_list_get',[function () {

    var child_list = function (key) {
        var request = new XMLHttpRequest();

      try{
        request.open('GET', localStorage.getItem("url") + "guardian_app/getting_child_list?p_id="+key, false);
        request.send(null);
      }
      catch(e)
      {
        console.log("error");
        return 0;
      }

      if (request.status === 200) {
        return request.responseText;
      }
    }

    return child_list;
  }])


  // child delete
  .service('deleteChildService',[
    function() {

      var child_delete = function(c_id,p_id) {

        req = new XMLHttpRequest();

        try
        {
          req.open("GET",localStorage.getItem("url") + "guardian_app/removing_child?c_id="+c_id+"&p_id="+p_id,false);
          req.send(null);

        }
        catch(e)
        {
          console.log("error");

          return 0;
        }

        if(req.status === 200)
        {
          return req.responseText;
        }

      }

      return child_delete;

    }
  ])


  // add child
  .service('addChildService',[
    function() {

      var child_add = function(child)
      {
        var request = new XMLHttpRequest();

        try{
          request.open("POST",localStorage.getItem("url") + "guardian_app/adding_child/",false);
          request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          request.send("child="+JSON.stringify(child));
        }
        catch(e)
        {
          console.log("error");
          return 0;
        }

        if(request.status === 200) {
          return request.responseText;
        }

      }

      return child_add;

    }
  ])


  // editing child
  .service('editChildService',[
    function() {

      var child_edit = function (child) {
        var request = new XMLHttpRequest();

        try {
          request.open("POST", localStorage.getItem("url") + "guardian_app/editing_child/", false);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          request.send("child=" + JSON.stringify(child));
        }
        catch (e) {
          console.log("error");
          return 0;
        }

        if (request.status === 200) {
          return request.responseText;
        }

      }

      return child_edit;
    }])


  .service('childpicService',[
    function () {

      var child_pic = function(c_id) {
        var request = new XMLHttpRequest();

        try {
          request.open("GET", localStorage.getItem("url") + "guardian_app/getting_child_pic?c_id="+c_id, false);
          request.send(null);
        }
        catch (e) {
          console.log("error");
          return 0;
        }

        if (request.status === 200) {
          return request.responseText;
        }

      }

      return child_pic;
    }
  ])

    // initial immunization history for a child
  .service('immuni_history_service',[
        function() {
          var get_immuni_history = function(key) {
              req = new XMLHttpRequest();

              try{
                req.open("GET",localStorage.getItem("url")+"guardian_app/initial_vaccine_info_list?c_id="+key,false);
                req.send(null);
              }
              catch(e)
              {
                return 0;
              }

              if(req.status == 200)
              {
                return req.responseText;
              }
          }

          return get_immuni_history;
        }
      ])


      // detail immunization history for a child
  .service('immuni_history_detail_service',[
    function() {
      var get_immuni_history = function(key) {
        req = new XMLHttpRequest();

        try{
          req.open("GET",localStorage.getItem("url")+"guardian_app/detail_vaccine_info?c_i_id="+key,false);
          req.send(null);
        }
        catch(e)
        {
          return 0;
        }

        if(req.status == 200)
        {
          return req.responseText;
        }
      }

      return get_immuni_history;
    }
  ])


  // all vaccine list
  .service('vaccine_list_service',[
    function() {
      var get_immuni_history = function() {
        req = new XMLHttpRequest();

        try{
          req.open("GET",localStorage.getItem("url")+"guardian_app/vaccine_list",false);
          req.send(null);
        }
        catch(e)
        {
          return 0;
        }

        if(req.status == 200)
        {
          return req.responseText;
        }
      }

      return get_immuni_history;
    }
  ])

  // disease list
  .service('disease_list_service',[
    function() {
      var get_immuni_history = function() {
        req = new XMLHttpRequest();

        try{
          req.open("GET",localStorage.getItem("url")+"guardian_app/disease_list",false);
          req.send(null);
        }
        catch(e)
        {
          return 0;
        }

        if(req.status == 200)
        {
          return req.responseText;
        }
      }

      return get_immuni_history;
    }
  ])

  // available vaccine list
  .service('available_vaccine_service',[
    function () {
      var get_immuni_history = function(key) {
        req = new XMLHttpRequest();

        try{
          req.open("GET",localStorage.getItem("url")+"guardian_app/vaccine_list_by_child?c_id="+key,false);
          req.send(null);
        }
        catch(e)
        {
          return 0;
        }

        if(req.status == 200)
        {
          return req.responseText;
        }
      }

      return get_immuni_history;
    }
  ])

  // add immunization
  .service('add_immune_service',[
    function() {
      var add_immune = function(data) {
        xml = new XMLHttpRequest();

        try{
          xml.open("POST",localStorage.getItem("url")+"guardian_app/insert_vaccine_info_for_child",false);
          xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          xml.send("child_info="+JSON.stringify(data));
        }
        catch(e)
        {
          return 0;
        }

        if(req.status == 200)
        {
          return req.responseText;
        }
      }

      return add_immune;
    }
  ])

  // delete immunization
  .service('delete_immune_service',[
    function () {
        var delete_immune = function (key) {
          req = new XMLHttpRequest();

          try{
            req.open("GET",localStorage.getItem("url")+"guardian_app/delete_vaccine_info_for_child?c_i_id="+key,false);
            req.send(null);
          }
          catch(e)
          {
            return 0;
          }

          if(req.status == 200)
          {
            return req.responseText;
          }
        }

        return delete_immune;
    }
  ])

  // edit immunization
  .service('edit_immune_service',[
    function() {

      var edit_immune = function(packet) {

        req = new XMLHttpRequest();

        try{
          req.open("POST",localStorage.getItem("url")+"guardian_app/edit_vaccine_info_for_child",false);
          req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          req.send("child_info="+JSON.stringify(packet));
        }
        catch(e)
        {
          return 0;
        }

        if(req.status == 200)
        {
          return req.responseText;
        }

      }

      return edit_immune;
    }
  ])


  // edit profile
  .service('edit_profile_service',[
    function() {
      var edit_profile = function(data) {
        xml = new XMLHttpRequest();

        try{
          xml.open("POST",localStorage.getItem("url")+"guardian_app/edit_profile",false);
          xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          xml.send("user="+JSON.stringify(data));
        }
        catch(e)
        {
          return 0;
        }

        if(xml.status == 200)
        {
          return xml.responseText;
        }
      }

      return edit_profile;
    }
  ])
