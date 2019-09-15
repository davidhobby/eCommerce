
// check name
    function checkname(){
      var regstr = /^[\x00-\xff]{1,10000}$/;
      var namestr = document.regform.username.value;
      if(!regstr.test(namestr)){
        alert ("Cannot input number");
        return false;
      }

      return true;
    }

    //check password
    function checkpass(){
      var regstr = /^\w{1,100000}$/;//
      var passstr = document.regform.password.value;
      if(!regstr.test(passstr)){
        return false;
      }
      return true;
    }

    //check confirm password
    function checkpass2(){

      var passstr = document.regform.password.value;
      var passstr2 = document.regform.confirmpassword.value;

// if password=confirmpassword
      if(passstr==passstr2){

        return true;
      }

      alert ("Password are not the same!");
      return false;
    }

    function checkForm(){
      if(checkname()&&checkpass()&&checkpass2())
        return true;
      return false;
    }
