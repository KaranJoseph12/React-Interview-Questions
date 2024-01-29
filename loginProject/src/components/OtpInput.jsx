import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({length=4,onOtpSubmit=()=>{}}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]); // to directly type the otp instead of going and clicking and we are using array to ref alll 4 of them

  useEffect(() => {
    if(inputRefs.current[0]){
      inputRefs.current[0].focus(); // focuses the very first input field
    }
  }, []);


  const handleChange = (index,e) => {
    const value = e.target.value
    if(isNaN(value)) return;

    const newOtp = [...otp];
    //allow only one input
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)  // setOtp is asynchronous
    console.log(newOtp,"NEWOTP");
    //submit trigger 
    const combinedOtp = newOtp.join("") // we used newOtp and not setOtp because setOtp is async and maybe not be updated
    if(combinedOtp.length === length){
      console.log(combinedOtp,"COMBINEOTP");
      onOtpSubmit(combinedOtp)
    }
    // Move to next input if current field is filled
      if(value && index<length-1 && inputRefs.current[index + 1]){  // value(to check value is  present in the input field)  index<length-1 (checks that input stays within the 4 input fields) inputRefs.current[index + 1](checks if the next input field is available)
        // inputRefs.current[index + 1].focus() // to jump to next box
        inputRefs.current[newOtp.indexOf("")].focus() // to jump to next empty box
      }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1,1)// to move the cursor from left to right in the input field
  
    //Optional
    if(index>0 && !otp[index - 1]){
      inputRefs.current[otp.indexOf("")].focus()
    }
  };
  const handleKeyDown = (index,e) => {
    if(e.key ==="Backspace"&& !otp[index] && index > 0 && inputRefs.current[index - 1]){ // !otp[index] checks if the current input field is empty
      //Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus()
    }
  };
  return (
    <>
      {otp.map((value,index) => {
        return(
          <input
            key={index}
            type="text"
            ref={(input)=>(inputRefs.current[index] = input)}
            value={value}
            onChange={(e)=> handleChange(index,e)}
            onClick={()=> handleClick(index)}
            onKeyDown={(e)=> handleKeyDown(index,e)}
            className='otpInput'
            />
        )
      })}
    </>
  )
}

export default OtpInput