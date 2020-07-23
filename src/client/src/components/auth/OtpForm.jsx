import React, { Component } from "react";
import styles from "./Form.module.css";

export default class OtpForm extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      digit1:"",
      digit2:"",
      digit3:"",
      digit4:"",
      isError:false
    }
  }
  handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  handleVerifyOtp = (e)=>{
    e.preventDefault()
    const{digit1,digit2,digit3,digit4} = this
    if(!digit1 || !digit2 || !digit3 || !digit4){
      return this.setState({isError:true})
    }
    
      let otp = [digit1,digit2,digit3,digit4].join("")
      otp = Number(otp)
      
    }
  render() {

    const {isError} = this
    return (
      <form id={styles.signupform}>
        <div className="form-group">
          <div id={styles.loginHeader}>Share OTP</div>
          <label>We have sent a temporary passcode to you at +91-8340663803</label>
          <label className="text-danger">Use a different number</label>
          <div id={styles.codeHeader}>Enter your 4-digit passcode</div>
          <input type="number" name="digit1"  value={digit1} onChange={handleChange} id={styles.otp} maxLength="1" />
          <input type="number" name="digit2"  value={digit2} onChange={handleChange} id={styles.otp} maxLength="1" />
          <input type="number" name="digit3"  value={digit3} onChange={handleChange} id={styles.otp} maxLength="1" />
          <input type="number" name="digit4"  value={digit4} onChange={handleChange} id={styles.otp} maxLength="1" />
        </div>
        {
          isError && <small>please enter valid 4 digit otp</small>
        }

        <button disabled id={styles.button} type="submit" className="btn btn-primary">
          Submit
        </button>
        <div id={styles.formFooter}>
          <span className="text-danger">Resend Code</span>{" "}
        </div>
      </form>
    );
  }
}
