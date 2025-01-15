import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UsernamePassword from './usernamePassword';
const DOBPromot = ({user,email}) => {
  const month = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
  let date = new Date(),
  currentYear = date.getFullYear(),
  currentMonth = date.getMonth();
  const [day,setDay]=useState("")
  const [currMonth,setCurrMonth]=useState()
  const [currYear,setCurrYear]=useState("")
  const [days,setDays]=useState([])
  const [gender,setGender]=useState("")
  const [genderw,setGenderw]=useState("Please select your gender")    
  const [success,setSuccess]=useState(false)
  const years=[]
  const daysStuff=[]
  const minYear=currentYear-7
  let dobFormat=`${currYear}-${currMonth}-${day}`
  const daysOfMonth=(a,b)=>{
    const template=[] 
    for (let i = a; i <=b; i++) {
      template.push(i)
      setDays(template)
    }
  }
  useEffect(()=>{
    let lastDateofMonth = new Date(currYear, currMonth, 0).getDate()
    daysOfMonth(1,lastDateofMonth)
  },[currMonth])
  useEffect(()=>{
    let lastDateofMonth = new Date(currYear, currMonth, 0).getDate()
    daysOfMonth(1,lastDateofMonth)
  },[currYear])
  for (let i = 100; i > -1; i--) {
    years.push(minYear-i)
  }
   const verification_to_next =(e)=>{
    e.preventDefault()
     if (!currMonth || !currYear || !day){
       return
     }else{
      setSuccess(true)
     }
   }
  return (
    <>{ !success? (
        <>
          <p className="intro-text pad-1 route_header tx-center">Almost done</p>
          <p className="light-text pad-1 text-md route_body tx-center">Enter and select your date of birth and gender so we can verify your registration process
          </p>
          <form onSubmit={(e)=>e.preventDefault()}>
              <p className="light-text text-md txt-white">Date of birth</p>
              <div className='select_holder'>
                <div className='month_select select_wrapper'>
                  <label htmlFor='months'>
                    <p className='text-md'>Month</p>
                  </label>
                  <select onChange={(e)=>setCurrMonth(e.target.value)} id='months'>
                    <option value=""></option>
                    {month.map((item,index)=>(<option key={item} value={eval(index +1)}>{item}</option>))}
                  </select>
                </div>
                <div className='days_select select_wrapper'>
                  <label htmlFor='days'>
                    <p className='text-md'>Day</p>
                  </label>
                  <select onChange={(e)=>setDay(e.target.value)} id='days'> 
                    <option value=""></option>
                    {days.map(item=>(<option key={item}>{item}</option>))}
                  </select>
                </div>
                <div className='year_select select_wrapper'>
                  <label htmlFor='year'>
                    <p className='text-md'>Year</p>
                  </label>
                  <select onChange={(e)=>setCurrYear(e.target.value)} id='year'>
                    <option value=""></option>
                    {years.map(item=>(<option value={item} key={item}>{item}</option>))}
                  </select>
                </div>
              </div>
              
              <p className="light-text text-md txt-white margin-top-2">Select your Gender</p>
              <div className="gender_selection">
                <div className='gender_select'>
                  {/* <label>
                    <p className='text-md'>Gender</p>
                  </label> */}
                  <div className='selector_gender'>
                    <select onChange={(e)=>setGender(e.target.value)} aria-placeholder='hi jdjd'>
                      <option value=""></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>
                
              </div>
              <button className="btn-btn1 btn-blue" disabled={!currMonth || !day || !currYear || !gender? true :false} onClick={(e)=>verification_to_next(e)} type="submit">Next</button>
              {/* <Link to={"/welcome/login"}>Already have an account ?</Link> */}
          </form>
        </>
        ):(
          <div>
            <UsernamePassword user={user} email={email} gender={gender} dobFormat={dobFormat}/>
          </div>
        )}
    </>
  )
}

export default DOBPromot