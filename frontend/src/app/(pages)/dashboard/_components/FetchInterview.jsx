"use client"
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment'; 
const FetchInterview = () => {
  const router = useRouter()
    
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
           
            try {
              const response = await fetch("https://intervue2-wgit3nni.b4a.run/interview/showdetails", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
              });
              const result = await response.json();
              const details = result.message || []; 
              setInterviews(details);
            } catch (e) {
              const error = e.message
              toast.error(error)
    
            }
          
        };
        fetchData();
      }, []);
    
      
    
      const handleFeedbackClick = (uuid) => {
        router.push(`/feedback/${uuid}`);
      };
  return (
    <div>
       <div className="grid p-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.slice(0, 6).map((interview, index) => (
          <div key={index} className="bg-white rounded border p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold  text-[#262626]">{interview.jobposition}</h2>
              <p className="text-sm text-gray-400 mt-2">
                Date Created: {moment(interview.createdAt).format('MMMM Do YYYY')}
              </p>
            </div>
            <button
              onClick={() => handleFeedbackClick(interview.uuid)}
              className="mt-4 px-4 py-2 bg-[#262626] hover:bg-black rounded text-white"
            >
              See Feedback
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FetchInterview
