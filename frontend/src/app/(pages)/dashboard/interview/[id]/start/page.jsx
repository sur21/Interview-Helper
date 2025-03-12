'use client';
import "regenerator-runtime/runtime";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Webcam from "react-webcam";
// import { useSpeechSynthesis } from 'react-speech-kit';

import { Roboto_Mono } from "next/font/google";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from "@google/generative-ai";



const robotoMono = Roboto_Mono({ subsets: ['latin'] });

const Page = () => {
  const router = useRouter();
  const [bigLoader,setBigLoader]=useState(false)
  const { id } = useParams();
  const [feedbackArray, setFeedbackArray] = useState([]);
  const [arr, setArr] = useState([]);
  const [time, setTime] = useState(0); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if rendering on client
  const [loading, setLoading] = useState(true);
  const [qanda, setQandA] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [permissionsDenied, setPermissionsDenied] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const [recording, setRecording] = useState(false);
  const [showInterviewComplete, setShowInterviewComplete] = useState(false);
  const [listening, setListening] = useState(false);
  const [showPopup,setShowPopup]=useState(true)

  // Hook: Speech recognition
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Hook: Speech synthesis
  // const { speak } = useSpeechSynthesis({
  //   onEnd: () => {
  //     setRecording(true);
  //     setIsTalking(false);
  //     setNextButton(true);
  //   }
  // });

  // Effect: Check if client-side rendering is active
  useEffect(() => {
    setIsClient(true);
  }, []);




  // Start Listening
const startListening = () => {
    setListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    
    

  };


//Stop Listening
const stopListening = async () => {
  
  
  setRecording(false);
  setListening(false);
  SpeechRecognition.stopListening();
  

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  if (transcript === "") {
    
    
    
    setFeedbackArray(prevFeedbackArray => [
      ...prevFeedbackArray,
      { rating: "0/10", feedback: "You have not answered the question. Kindly answer the question then only you can get feedback." }
    ]);
    setArr(prevArr => [...prevArr, "You have not answered."]);
    
    
    const currentIndex = qanda.findIndex(q => q.question === currentQuestion);
    if (currentIndex < qanda.length - 1) {
      nextQuestion(); // Call nextQuestion if there's a next question
    } else {
      setIsRunning(false);
      setShowInterviewComplete(true);
    }

    return
  }

  

  const prompt = `
  Question: ${currentQuestion}
  Answer: ${transcript}

  This is a question and answer of that question. Give me rating out of 10 for answer and feedback as area of improvement if any. In just 3 to 5 lines to improve it in JSON format with rating field and feedback field.
  Note: Rating should be in this format  (any digit between 0-10/10) in string
  Note: If there is answer like I dont know or users does not know the answer then give the rating 0 and feedback as Pleas go through that particular topic.
  `;

  const result = await model.generateContent(prompt);
  const textContent = result.response.candidates[0].content.parts[0].text;
  console.log('Raw text content:', textContent); 
  const jsonString = textContent.replace(/```json\n|\n```/g, '');
  const parsedresult = JSON.parse(jsonString);
  setFeedbackArray(prevFeedbackArray => [...prevFeedbackArray, parsedresult]);

  setArr(prevArr => [...prevArr, transcript]);
  
  // Determine if the current question is the last one
  const currentIndex = qanda.findIndex(q => q.question === currentQuestion);
  if (currentIndex < qanda.length - 1) {
      nextQuestion(); // Call nextQuestion if there's a next question
  } else {
      setIsRunning(false);
      setShowInterviewComplete(true);
  }
};


//Start Interview
const startInterview = () => {
    setIsRunning(true)
    setIsTalking(true);
    setShowQuestion(true);
    if ('speechSynthesis' in window) {
      // Create a new SpeechSynthesisUtterance instance
      const utterance = new SpeechSynthesisUtterance(currentQuestion);
      
     
      utterance.onend = () => {
        setRecording(true);
      setIsTalking(false);
      setNextButton(true);
      

      }
       

      window.speechSynthesis.speak(utterance);

    
    } else {
      console.log('Speech synthesis is not supported in this browser.');
    }
    // speak({ text: currentQuestion });
  };


//Next Question
const nextQuestion = () => {
  setNextButton(false);
  setIsTalking(true);
  const currentIndex = qanda.findIndex(q => q.question === currentQuestion);

  if (currentIndex < qanda.length - 1) {
      const nextQ = qanda[currentIndex + 1].question;
      setCurrentQuestion(nextQ);

      if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(nextQ); // Use nextQ
          utterance.onend = () => {
              setRecording(true);
              setIsTalking(false);
              setNextButton(true);
          };
          window.speechSynthesis.speak(utterance);
      } else {
          console.log('Speech synthesis is not supported in this browser.');
      }
  } else {
      setIsRunning(false);
      setShowInterviewComplete(true);
  }
};


//Check Mic and Camera
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const cameraPermission = await navigator.permissions.query({ name: 'camera' });
        const microphonePermission = await navigator.permissions.query({ name: 'microphone' });
        setPermissionsDenied(cameraPermission.state === 'denied' || microphonePermission.state === 'denied');
      } catch (error) {
      }
    };
    checkPermissions();
  }, []);


//Token Validation
  useEffect(() => {
    const auth = async () => {
      const username = localStorage.getItem('username');  
      if (!username) {
        router.push('/signin');
        return;
      }
      try {
        

        const response = await fetch(`https://intervue2-wgit3nni.b4a.run/auth/validate/${username}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({ id })
        });

        if (response.status === 404) {
          router.push('/signin');
        } else if (response.status === 405) {
          router.push('/dashboard');
        } else {
          const result = await response.json();
          const interviewId = result.interviewid;
          setQandA(interviewId.questionsandanswers);
          setCurrentQuestion(interviewId.questionsandanswers[0]?.question || "");
          setLoading(false);
        }
      } catch (error) {
        router.push('/signin');
      }
    };
    auth();
  }, [router, id]);


//Complete Interview
const Complete = async ()=>{

  setBigLoader(true)

  

  


  
  const response = await fetch("https://intervue2-wgit3nni.b4a.run/interview/updatedetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify({ answers: arr,id,feedback:feedbackArray })  
  });
  if(response.ok){
    if (document.fullscreenElement) {
      document.exitFullscreen();
  }
  setBigLoader(true)
    // router.push("/dashboard")
    router.push(`/feedback/${id}`);
  }

  
    
   
}


//Full Screen
const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setShowPopup(false);
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
};


//Full Screen
  useEffect(() => {
    const handleFullscreenChange = () => {
        // Check if the user has exited fullscreen
        if (!document.fullscreenElement) {
            setShowPopup(true); 
        }
    };

    // Add event listener
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Clean up the event listener on component unmount
    return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
}, []);


//Timer
useEffect(() => {
  let timer;
  if (isRunning) {
    timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }
  return () => clearInterval(timer); // cleanup on component unmount or stop
}, [isRunning]);


//Format Time
const formatTime = (seconds) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isClient) return null;
  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  return (
    <div className="bg-gray-50 p-8 custom">
       {bigLoader&&( 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        
        <LoaderCircle className="animate-spin absolute top-[48%] text-indigo-700 w-[100px] h-[100px] "/>
        </div>
  )}
      {permissionsDenied && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Permissions Needed</h2>
            <p className="text-gray-700 mb-4">
              Camera and microphone access are required to proceed. Please enable permissions in your browser settings.
            </p>
          </div>
        </div>
      )}
       
       {showPopup && (
                <div className='fixed inset-0 flex items-center justify-center bg-[#0000002a]'>
                    <div className='bg-white p-5 rounded shadow-md'>
                        <button 
                            className='bg-red-500 text-white py-2 px-4 rounded'
                            onClick={toggleFullScreen}>
                            Enter full screen
                        </button>
                    </div>
                </div>
            )}

      <div className="h-full bg-white shadow-lg rounded-lg">
        
        <div className="text-center">
          <h2 className="lg:text-2xl text-sm font-semibold text-gray-700">Current Question</h2>
          {!showQuestion && <p className="lg:text-lg text-sm text-gray-600 mt-1 lg:mt-4 h-[100px] ">Click On Start Button</p>}
          {showQuestion && <p className="lg:text-lg text-sm text-gray-600 mt-1 lg:mt-4 h-[100px] ">{currentQuestion}</p>}

          <div className="flex justify-between flex-col lg:flex-row items-center">
            <Image
              className="lg:h-[500px] lg:w-[500px] h-[250px] w-[250px]"
              src="/robot.png"
              width={500}
              height={500}
              alt="Picture of the author"
            />

            {!recording ? (
              <div>
                {!nextButton && (
                  <button className={`p-2 rounded mb-3 lg:mr-28 px-4 text-white ${isTalking ? "bg-gray-600 text-gray-700" : "bg-indigo-700"}`} disabled={isTalking} onClick={startInterview}>
                    {!isTalking ? "Start" : "Interviewer is Talking"}
                  </button>
                )}
               {nextButton && (
                  <button className="p-2 rounded mb-6 bg-gray-600 text-white lg:mr-28 px-4 " disabled onClick={nextQuestion}>
                    Next Question...
                  </button>
                )} 
              </div>
            ) : (
              <div>
                {!listening ? (
                  <button className="p-2 rounded mb-6 bg-indigo-700 lg:mr-28 px-4 text-white" onClick={startListening}>
                    Start Recording
                  </button>
                ) : (
                  <button className="p-2 rounded mb-6 bg-indigo-700 lg:mr-28 px-4 text-white" onClick={stopListening}>
                    Stop Recording
                  </button>
                )}
              </div>
            )}

            <div className="h-[150px] w-[200px] mt-5 lg:h-[300px] lg:w-[300px] bg-white lg:mr-32">
              {!permissionsDenied && <Webcam />}
            </div>

          </div>
            <div className={` ${robotoMono.className} text-[24px]`}>{formatTime(time)}</div>
        </div>
      </div>


      {showInterviewComplete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Interview Completed!</h2>
            <p className="text-gray-700 mb-4">Thank you for completing the interview. Click below to proceed to feedback.</p>
            <button
              className="bg-indigo-700 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={Complete}
            >
              Go to Feedback
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default Page;
