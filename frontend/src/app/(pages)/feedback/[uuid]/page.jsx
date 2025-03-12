"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LoaderCircle } from 'lucide-react';
import { CircleChevronUp, CircleChevronDown } from 'lucide-react';






const Page = () => {
    const { uuid } = useParams();
    const [interviewDetails, setInterviewDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [improvementTips, setImprovementTips] = useState('');
    const [loader, setLoader] = useState(true);
    const [expandedQuestions, setExpandedQuestions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://intervue2-wgit3nni.b4a.run/interview/showdetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({ uuid })
                });

                const result = await response.json();
                const details = result.message || [];
                setInterviewDetails(details[0]);
            } catch (fetchError) {
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [uuid]);

    useEffect(() => {
        const fetchImprovements = async () => {
            const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `
                Based on the following interview details:
                Job Position: ${interviewDetails.jobposition}
                Job Description: ${interviewDetails.jobdescription}
                Questions and Answers: ${JSON.stringify(interviewDetails.questionsandanswers)}
                User's Answers: ${JSON.stringify(interviewDetails.usersanswers)}
                Rate this candidate on the behalf of like average, below average, best something like that just One word answer.
            `;

            try {
                const result = await model.generateContent(prompt);
                const textContent = result.response.candidates[0].content.parts[0].text;
                setImprovementTips(textContent);
            } catch (error) {
            } finally {
                setLoader(false);
            }
        };

        if (interviewDetails) {
            fetchImprovements();
        }
    }, [interviewDetails]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!interviewDetails) {
        return <div className="text-center py-10">No interview details found.</div>;
    }

    const {
        jobposition,
        jobdescription,
        questionsandanswers,
        usersanswers,
        feedback,
    } = interviewDetails;

    const toggleExpand = (index) => {
        setExpandedQuestions((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 p-6 lg:px-20">
            <h1 className="text-4xl font-bold mb-6 bg-white text-black text-center py-4">Interview Feedback</h1>

            <section className="mb-8">
                <h3 className="text-2xl font-medium mb-4 text-gray-700">Questions & Answers</h3>
                <ul className="space-y-6">
                    {questionsandanswers.map((qa, index) => {
                        const currentFeedback = feedback[index];
                        const rating = currentFeedback ? currentFeedback.rating : "No rating provided";
                        const feedbackText = currentFeedback ? currentFeedback.feedback : "No feedback available";

                        return (
                            <li
                                key={qa._id}
                                onClick={() => toggleExpand(index)}
                                className={`p-6 hover:cursor-pointer border border-gray-300 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-600`}
                            >
                                <div className="flex flex-col">
                                    <div>
                                        <div className="text-lg font-bold flex items-center justify-between text-indigo-600">
                                            <div>
                                                Question: <span className="text-gray-800">{qa.question}</span>
                                            </div>
                                            <div className={`${expandedQuestions[index] ? "rotate-180" : ""} transition-all`}>
                                                <CircleChevronDown />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <hr />
                                    <br />
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedQuestions[index] ? "max-h-[500px]" : "max-h-0"}`} // Use a class for max-height
                                    >
                                        <p className="text-lg font-bold border rounded-lg p-4 text-red-700 border-red-300 bg-red-100 ">
                                            Your Answer: <span className=" font-normal">{usersanswers[index] || "No answer provided"}</span>
                                        </p>
                                        <br />
                                        <p className="text-lg font-bold border rounded-lg p-4 text-indigo-700 border-indigo-300 bg-indigo-100">
                                            Rating: <span className=" font-normal">{rating}</span>
                                        </p>
                                        <br />
                                        <p className="text-lg font-bold border rounded-lg p-4 text-green-700 border-green-300 bg-green-100">
                                            Feedback: <span className=" font-normal">{feedbackText}</span>
                                        </p>
                                        <br />
                                        <p className="text-lg font-bold border rounded-lg p-4 text-yellow-700 border-yellow-300 bg-yellow-100">
                                            Answer From Expert: <span className=" font-normal">{qa.answer}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Overall Performance Section */}
            {/* <section className="mt-8 p-6 border border-gray-300 rounded-lg bg-white shadow">
                <h3 className="text-2xl font-medium mb-4 text-black">Overall Performance<span>{loader && <LoaderCircle className='animate-spin ml-1' />}</span></h3>
                <ReactMarkdown className="leading-relaxed font-bold text-indigo-700">
                    {improvementTips}
                </ReactMarkdown>
            </section> */}
        </div>
    );
};

export default Page;
