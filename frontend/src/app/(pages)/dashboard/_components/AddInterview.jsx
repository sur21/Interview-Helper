"use client"
import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddJobDetails = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader,setLoader]=useState(false)
  const [formData, setFormData] = useState({
    jobPosition: '',
    jobDescription: '',
    yearsOfExperience: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoader(true)
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

   const prompt = `
   Job Position: ${formData.jobPosition}
   Job Description : ${formData.jobDescription}
   Years Of Experience : ${formData.yearsOfExperience}


   based upon above mentioned details give me 10 interview question along with answers in json format and dont include any quote in response. Give us question and answer field on JSON.
   Note : First question should be an introduction question e.g. briedly explain about yourself.
   `;

   const result = await model.generateContent(prompt);
      const textContent = result.response.candidates[0].content.parts[0].text;
      const jsonString = textContent.replace(/```json\n|\n```/g, '');
      const parsedQuestions = JSON.parse(jsonString);
      console.log(parsedQuestions)
      if(parsedQuestions.length!==10){
        alert("Kindly refresh the page and fill the details again due to busy resources.")
        location.reload()  
        return
      }
         


      

      
      
      const uuid = uuidv4();
      const interview = {
        uuid:uuid,
        jobPosition:formData.jobPosition,
        jobDescription:formData.jobDescription,
        yearsOfExperience:formData.yearsOfExperience,
        parsedQuestions


      }
      const response = await fetch(`https://intervue2-wgit3nni.b4a.run/interview/savedetails`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:'include',
        body:JSON.stringify(interview)
      })
      if(response.ok){
        router.push(`dashboard/interview/${uuid}`)

      }
      


    
  };

  return (
    <div className="mt-3 px-10">
      
      <div
        onClick={openModal}
        className="p-10 w-[250px] bg-[#6B6B6B] border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className="text-lg text-center text-white">+ Add New</h2>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full mx-4 md:w-3/4 lg:w-1/2">
            <h2 className="font-semibold text-2xl text-black mb-2">Tell us more about your job</h2>
            <p className="text-gray-500 mb-6">Add Details about yout job position/role, job description and years of experience.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Position/Role</label>
                <input
                  type="text"
                  
                  name="jobPosition"
                  value={formData.jobPosition}
                  onChange={handleChange}
                  required
                  className="mt-1 block text-black w-full border border-[#D3D3D3] rounded-3xl shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Backend Developer, MERN Stack Developer"

                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Job Description</label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  className="mt-1 block w-full  text-black border border-gray-300 rounded-3xl shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows="3"
                  placeholder="Brief description of your role"
                ></textarea>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border  text-black border-gray-300 rounded-3xl shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  min="0"
                  placeholder="e.g., 0, 5, 10"

                />
              </div>

             
             
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loader}
                  className="px-4 py-2 bg-black text-white  rounded-3xl hover:bg-[#262626]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loader}
                  className="px-4 py-2 bg-[#007AFF] text-white rounded-3xl hover:bg-blue-700"
                >
                  {!loader?"Submit":<div className='flex justify-center'> Generating from AI  <LoaderCircle className='animate-spin ml-1' /></div>}
                  
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddJobDetails;
