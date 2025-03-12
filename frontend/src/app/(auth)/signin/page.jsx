"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Link from 'next/link'
import { Lobster_Two } from 'next/font/google';
const lobster = Lobster_Two({ subsets: ['latin'], weight: '400' });

import { LoaderCircle } from 'lucide-react';





const Signin = () => {
    const router = useRouter()
    
   
    
    const [username,setUsername]=useState("")
    const [loader,setLoader]=useState(false)
    const [password,setPassword]=useState("")
    const submitHandler= async (e)=>{


        e.preventDefault()
        setLoader(true)
        try{
          
          const response = await fetch("https://intervue2-wgit3nni.b4a.run/auth/signin",{
            method:"POST",
            credentials: "include",
            headers:{"Content-Type":"application/json"},
           
            body:JSON.stringify({username,password})
  
          })

          
          
          if(response.ok){
            
            
            const result = await response.json()
            
            setLoader(false)

            toast.success(result.message)
            localStorage.setItem('username', result.username);


            


           
            setTimeout(()=>{
              router.push("/dashboard")
            },2000)
            

            
          }
          else{
            const result = await response.json()
            setLoader(false)
            toast.error(result.message)
          }
        }
        catch(e){
          alert("Cat")
          const error = e.message

          toast.error(error)

        }
        
        
        


    }










  return (
<>
    <head>
    <title>Interveu • AI-Powered Recruitment Platform</title>
    <meta name="description" content="Streamline the recruitment process with Interveu, an AI-powered platform that helps recruiters interview and hire the best talent faster." />
    </head>

<div>

<ToastContainer />
   <div className='flex items-center justify-center  h-[100vh]  '>
     
     <div
          aria-hidden="true"
          className="absolute  inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] "
          />
        </div>






        <form className="w-[350px] mx-auto border p-4 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg border-white/20" onSubmit={submitHandler}>


        <div className="mb-5 text-black font-bold text-[24px] text-center">
          <Link href=".">
          <h1 className={`${lobster.className} text-[40px] font-bold`}>Interveu</h1></Link>
    
  </div>

  <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
    <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => {
        setUsername(e.target.value);
      }}
      className="bg-white/50 border border-gray-300 text-gray-900 text-sm block w-full p-2 focus:outline-none rounded-lg"
      placeholder="username"
      required
    />
  </div>

  

  <div className="mb-5">
    <label htmlFor="password1" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      placeholder="password"
      className="bg-white/50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:outline-none rounded-lg"
      required
    />
  </div>


<div className='mb-5'>
<button type="submit" className="text-white bg-[#007AFF] block hover:bg-blue-800 focus:ring-4 font-medium text-sm  px-5 py-2.5 text-center rounded-lg transition ease-in-out w-[100%]">
  
    {!loader?<div>Submit</div>:<div className='flex justify-center'> <LoaderCircle className='animate-spin' /></div> }
  </button>
</div>
<div className='mb-5 text-black text-center'>
Don't have an account? <Link href="/signup" className='text-[#007AFF]'>Create account</Link>
  </div>
</form>
</div>
</div>
</>

  )
}

export default Signin
