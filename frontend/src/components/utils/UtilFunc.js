 function validateField(obj) {
     let isOk = true;
     let blank_field_array = [];
     let is_password_notmatch = false;
    if (obj.state.hasOwnProperty("username") && obj.state.username === "") {
        blank_field_array.push("Username");
        isOk = false;
    }
    if (obj.state.hasOwnProperty("email") && obj.state.email === "") {
        blank_field_array.push("Email");
        isOk = false;
    }
    
    if (obj.state.hasOwnProperty("password") && obj.state.password === "") {
        blank_field_array.push("Password");
        isOk = false;
    }
    if (obj.state.hasOwnProperty("confirmpassword") && obj.state.confirmpassword === "") {
        blank_field_array.push("Confirm password");
        isOk = false;
    }

    if (obj.state.hasOwnProperty("password") &&
        obj.state.hasOwnProperty("confirmpassword") &&
        obj.state.password !== obj.state.confirmpassword
      )  {
        is_password_notmatch = true;

        isOk = false;
      }

      if (!isOk) {
          if (is_password_notmatch) {
            obj.setState({errors : {
                ...obj.state.errors,
                blank_field : blank_field_array,
                password_notmatch : is_password_notmatch
            }});
          } else {
            obj.setState({errors : {
                ...obj.state.errors,
                blank_field : blank_field_array
            }});
          }

      }
      return isOk;
}

 function clearStateError(state) {
    if (state.hasOwnProperty("errors") && state.errors.hasOwnProperty("cognito_msg")) {
        state.errors.cognito_msg = "";
    }
    if (state.hasOwnProperty("errors") && state.errors.hasOwnProperty("blank_field")) {
        state.errors.blank_field = []   ;
    }
    if (state.hasOwnProperty("errors") && state.errors.hasOwnProperty("password_notmatch")) {
        state.errors.password_notmatch = false;
    }
}

export {
    validateField,
    clearStateError
  }