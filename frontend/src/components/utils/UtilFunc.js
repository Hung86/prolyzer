 function validateField(obj) {
     let hasError = true;
     let blank_field_array = []
    if (obj.state.hasOwnProperty("username") && obj.state.username == "") {
        blank_field_array.push("Username");
        hasError = false;
    }
    if (obj.state.hasOwnProperty("email") && obj.state.email == "") {
        blank_field_array.push("Email");
        hasError = false;
    }
    
    if (obj.state.hasOwnProperty("password") && obj.state.password == "") {
        blank_field_array.push("Password");
        hasError = false;
    }
    if (obj.state.hasOwnProperty("confirm_password") && obj.state.confirm_password == "") {
        blank_field_array.push("Confirm password");
        hasError = false;
    }

    if (blank_field_array.length > 0) {
        obj.setState({errors : {
            ...obj.state.errors,
            blank_field : blank_field_array
        }});
    }
    if (obj.state.hasOwnProperty("password") &&
        obj.state.hasOwnProperty("confirm_password") &&
        obj.state.password != obj.state.confirm_password
      )  {
        obj.setState({errors : {
            ...obj.state.errors,
            password_notmatch : true 
        }});
        hasError = false;
      }
      return hasError;
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