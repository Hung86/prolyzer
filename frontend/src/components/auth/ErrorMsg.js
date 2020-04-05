import React from "react";

export default function ErrorMsg(props) {
    console.log("ErrorMsg :" + props.errors.password_notmatch + " size : " + props.errors.blank_field.length);
    if (props.errors.blank_field.length > 0 || props.errors.password_notmatch) {
        return (
            <div className="text-danger container">
                <div className="row justify-content-center">
                    {props.errors.password_notmatch ? "Password value does not match confirm password value" : ""}
                </div>
                {
                props.errors.blank_field.map((val)=>{
                  return (<div className="row justify-content-center">
                          {val} is required 
                         </div>)
                  })
                }
            </div> 

          );
    } else if (props.errors.cognito_msg != "") {
        return (
            <div className="text-danger container">
              <div className="row justify-content-center">
                {props.errors.cognito_msg}
              </div>
            </div>
          );
    } else {
        return <div />;
    }
};