import React,{useState} from 'react'
import OtpInput from './OtpInput';

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handlePhoneNumber= (e) => {
    setPhoneNumber(e.target.value)
  }

  const handleSubmit= (e) => {
      e.preventDefault();
      // Phone Validations
      const regex = /[^0-9]/g;
      if(phoneNumber < 10 || regex.test(phoneNumber)){
        alert("Please enter a valid phone number")
        return;
      }

      // Call the Api
      // show the OTP Field
      setShowOtpField(true)
  }
  
  const onOtpSubmit = (otp) =>{
    console.log("Login successfull",otp);
  }

  return (
    <div>
    {!showOtpField? <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={phoneNumber}
        placeholder='Enter phone number'
        onChange={handlePhoneNumber}
         />
         <button type='submit'>Submit</button>
      </form>: (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
      )}

    </div>
  )
}

export default PhoneOtpForm