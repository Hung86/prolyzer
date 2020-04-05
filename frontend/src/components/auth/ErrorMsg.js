import React from "react";

export default function ErrorMsg(props) {
    console.log("ErrorMsg :" + props.errors.password_notmatch);
    if (props.errors.blank_field.length > 0 || props.errors.password_notmatch) {
        return (
            <div className="error container help is-danger">
                <div className="row justify-content-center">
                    {props.errors.password_notmatch ? "Password value does not match confirm password value" : ""}
                </div>
            </div>
          );
    } else if (props.errors.cognito_msg != "") {
        return (
            <div className="error container help is-danger">
              <div className="row justify-content-center">
                {props.errors.cognito_msg}
              </div>
            </div>
          );
    } else {
        return <div />;
    }
};