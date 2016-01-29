angular.module("starter.filter",[])

/*.filter('ageFilter',function() {
    function calculateAge(birthday) { // birthday is a date
      var today = new Date().getFullYear();
      var dt = new Date(birthday).getFullYear();
      var diff = Number(today) - Number(dt);
      if(diff<0) return 0;
      return diff;
    }

    function monthDiff(d1, d2) {
      if (d1 < d2){
        var months = d2.getMonth() - d1.getMonth();
        return months <= 0 ? 0 : (months);
      }
      return 0;
    }

    function dayDiff(d1,d2) {
      if(d1 < d2) {
        var days = d2.getDate() - d1.getDate();
        return days <= 0 ? 0 : days;
      }

      return 0;
    }


    return function(birthdate) {
      var str = "";
      var age = calculateAge(birthdate);
      var monthdiff = monthDiff(new Date(birthdate), new Date());
      var daydiff = dayDiff(new Date(birthdate), new Date());



      if (age > 1)
        str = str +age+ " years ";
      else if(age == 1)
        str = str +age+ " year ";

      if(monthdiff>1)
        str = str + monthdiff+" months ";
      else if(monthdiff==1)
        str = str + monthdiff+" month ";


      if(daydiff>1)
        str = str + daydiff+" days";
      else if(daydiff==1)
        str = str + daydiff+" day";

      if(str == "")
        str = "0 day";
      return str;

    };
  })*/

.filter('ageFilter',function() {
    function calculateDays(birthday) {
      now = new Date();
      countTo = new Date(birthday);
      difference = (now-countTo);

      days=Math.floor(difference/(60*60*1000*24)*1);

      return days;
    }

    function calculateMonths(days) {
      months = Math.floor(days / 30);
      return months;
    }

    function calculateYears(days) {
      years = Math.floor(days / 365);
      if (years > 1){ days = days - (years * 365)}

      return years;
    }

    return function(birthday) {
      totaldays = calculateDays(birthday);
      month = calculateMonths(totaldays);
      years = calculateYears(totaldays);

      if(month != 0)
      {
        days = (totaldays) % (month * 30);
      }
      else{
        days = totaldays;
      }

      str = '';

      if(years != 0) {
        str = str + years + " years ";
      }

      if(month != 0) {
        str = str + month + " months ";
      }

      if(days != 0) {
        str = str+ days + " days";
      }


      return str;
    }

  })

.filter('picFilter',function() {
    return function(c_id) {
      pic = localStorage.getItem(c_id);

      if(pic != '0')
      {
        if(pic.indexOf('data:image') != -1)
        {
          return pic;
        }
        else
        {
          return "data:image/jpeg;base64,"+pic;
        }
      }
      else
      {
        return 'img/avatar-baby.png';
      }
    }
  })
