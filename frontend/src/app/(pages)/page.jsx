import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/ui/CTA'

import { Outfit } from 'next/font/google'
const outfit = Outfit({
  subsets: ['latin'],
  weights: [100, 200, 300, 400, 500, 600, 700],
});




export const metadata = {
  
  title: {
    template:
      "Interveu • AI-Powered Mock Interview Platform",
    default:
      "Interveu • AI-Powered Mock Interview Platform",
  },
  description:
    "Interveu is an innovative AI-powered platform designed to revolutionize interview preparation. It allows users to input a job description (JD), and based on the provided details, takes a mock interview tailored to the role.",
    icons: {
      icon: "/assets/favicon.png",
    },
};

const page = () => {
  return (
    <>
    <head>
    <title>Interveu • AI-Powered Mock Interview Platform</title>
    <meta name="description" content="Interveu is an innovative AI-powered platform designed to revolutionize interview preparation. It allows users to input a job description (JD), and based on the provided details, takes a mock interview tailored to the role." />
    </head>
  
    
     
<div className='bg-gradient-to-b from-[#F2FFF9] to-[#FFF6F1]'>

<div
  className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 py-20 ">
  <a href=""
    className="border border-white-700 bg-white  rounded-3xl py-2 px-4 text-white-400  text-sm mb-5 transition duration-300 ease-in-out ">
    Enhance Your
Interview
Experience
  </a>
  <h1
    className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-white-300  sm:text-7xl">
    Ace Your Interview Process
    {/* <span className="relative whitespace-nowrap text-white-600 dark:text-gray-300"> Preparation</span> */}
    <span className="relative whitespace-nowrap text-[#007AFF] ">
      <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-[#007AFF] " preserveAspectRatio="none">
        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
      </svg>
      <span className="relative"> with AI</span>
    </span>
  </h1>
  <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-white-400 text-white-500 text-[#545454] leading-7">
  InterVeu is a cutting-edge open-source project, powered by advanced AI technology.
  </h2>
  {/* <Link className="bg-black rounded-[100px] flex justify-center items-center leading-[55px] text-white  font-[16px] w-[239px] h-[55px]  sm:mt-10 mt-8   transition"
    href="">Get started 
    <div className='ml-3'>
    <Image 
        src="/assets/star_group.png" 
        alt="Description of the image" 
        width={30}
        height={30}
      />
      </div>
    </Link> */}

    <CTA/>
</div>











<section id="works" className="relative py-10 sm:py-16 lg:py-10">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl text-black font-extrabold mx-auto md:text-6xl lg:text-5xl">How does it work?</h2>
            <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-2xl">
                Our AI solution will help you from start to finish
            </p>
        </div>
        <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28"><img alt="" loading="lazy" width="1000" height="500" decoding="async" data-nimg="1" className="w-full" style={{color:"transparent"}} src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"/>
            </div>
            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                <div>
                    <div
                        className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700">1</span>
                    </div>
                    <h3 className="mt-6 text-xl  text-black font-semibold leading-tight md:mt-10">Submit Your Job Description</h3>
                    <p className="mt-4 text-base text-black md:text-lg">
                    Enter your job description (JD) into the platform, and our AI analyzes the key skills, requirements, and industry terms.
                    </p>
                </div>
                <div>
                    <div
                        className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700">2</span>
                    </div>
                    <h3 className="mt-6 text-xl text-black font-semibold leading-tight md:mt-10">Receive Customized Interview</h3>
                    <p className="mt-4 text-base text-black md:text-lg">
                    The system generates tailored interview based on the job description to assess the candidate’s skills and suitability.
                    </p>
                </div>
                <div>
                    <div
                        className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700">3</span>
                    </div>
                    <h3 className="mt-6 text-xl text-black font-semibold leading-tight md:mt-10">Get Instant Feedback</h3>
                    <p className="mt-4 text-base text-black md:text-lg">
                    After answering, the AI provides instant, personalized feedback to help you improve and prepare for your interview.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
        style={{background:"radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)"}}>
    </div>
</section>








{/* <section className="">
  <div className="container max-w-xl p-6 mx-auto space-y-12 lg:px-8 lg:max-w-7xl">
    <div>
      <h2 className="text-3xl font-bold text-center sm:text-5xl">New Features</h2>
      <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">Explore the latest features that enhance your learning experience and make it even more exciting.</p>
    </div>
    <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
      <div>
        <div className="mt-4 space-y-12">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-rocket">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z">
                  </path>
                  <path
                    d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z">
                  </path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg></div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium leadi ">Advanced Learning Algorithms</h4>
              <p className="mt-2 ">Discover our improved learning algorithms that adapt to your preferences and provide even more personalized learning suggestions.</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-bookmark-plus">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                  <line x1="12" x2="12" y1="7" y2="13"></line>
                  <line x1="15" x2="9" y1="10" y2="10"></line>
                </svg></div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium leadi ">Interactive Learning Resources</h4>
              <p className="mt-2 ">Access an extensive library of interactive resources that make your learning journey engaging and interactive.</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-video">
                  <path d="m22 8-6 4 6 4V8Z"></path>
                  <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
                </svg></div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium leadi ">Enhanced Video Streaming</h4>
              <p className="mt-2 ">Experience seamless video integration with enhanced streaming capabilities, providing a better and more uninterrupted learning experience.</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-file-question">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"></path>
                  <path d="M12 17h.01"></path>
                </svg></div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium leadi ">Advanced Quiz Generation </h4>
              <p className="mt-2 ">Take your knowledge testing to the next level with advanced quiz generation, providing more customization options for your quizzes.</p>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="mt-10 lg:mt-0">
        <img width="600" height="600" src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080" className="mx-auto rounded-lg shadow-lg dark-bg-gray-500" style={{color:"transparent"}}/>
      </div>
    </div>
  </div>
</section> */}


<Testimonials/>







<div>
  <h1 className={`text-center font-semibold text-[40px] ${outfit.className}`}>It's time to kick off your first mock interview. Try now.</h1>
  <div className='flex justify-center'>
  <CTA/>
  </div>
 
</div>
<br />
<br />
<br />



<Footer/>



</div>
</>
     
  )
}

export default page
