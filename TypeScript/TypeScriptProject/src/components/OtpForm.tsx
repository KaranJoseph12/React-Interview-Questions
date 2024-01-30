import React,{useState} from 'react'
import OtpField from './OtpField';


const OtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showField, setshowField] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    // const numericValue:number = parseInt(e.currentTarget.value)
    setPhoneNumber(e.currentTarget.value)
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //phone validation
    const regex = /[^0-9]/g;
    const numbericPhone:number = parseInt(phoneNumber)
    if(numbericPhone < 10 || regex.test(phoneNumber.toString())){
      alert("Please enter a valid phone number")
      return
    }
    setshowField(true)
  }

  const handleSubmitOtp(otp:number){
    console.log("Login successful",otp);
    
  }
  

  return (
    <>
      {!showField ? <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        value={phoneNumber}
        placeholder='Enter phone number'
        onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>:(
          <div>
            <p>The OTP has been sent to {phoneNumber}</p>
            <OtpField length={4} onOtpSubmit={handleSubmitOtp}/>
          </div>
           
      )}

    </>
  )
}

export default OtpForm

