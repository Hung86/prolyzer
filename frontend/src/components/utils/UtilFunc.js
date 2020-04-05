 function validateField(obj) {
     let hasError = true;
    if (obj.state.hasOwnProperty("username") && obj.state.username == "") {
        obj.setState({errors : {
            ...obj.state.errors,
            blank_field : [...obj.state.errors.blank_field, "Username"]
        }});
        hasError = false;
    }
    if (obj.state.hasOwnProperty("email") && obj.state.email == "") {
        obj.setState({errors : {
            ...obj.state.errors,
            blank_field : [...obj.state.errors.blank_field, "Email"]
        }});
        hasError = false;
    }
    
    if (obj.state.hasOwnProperty("password") && obj.state.password == "") {
        obj.setState({errors : {
            ...obj.state.errors,
            blank_field : [...obj.state.errors.blank_field, "Password"]
        }});
        hasError = false;
    }
    if (obj.state.hasOwnProperty("confirm_password") && obj.state.confirm_password == "") {
        obj.setState({errors : {
            ...obj.state.errors,
            blank_field : [...obj.state.errors.blank_field, "confirm password"]
        }});
        hasError = false;
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