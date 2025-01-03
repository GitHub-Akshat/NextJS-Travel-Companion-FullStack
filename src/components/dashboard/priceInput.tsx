"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SessionHomepage = () => {
    const router = useRouter();
    const [destination, setDestination] = useState('');
    const [source, setSource] = useState('');
    const [fromDate, setFromDate] = useState('');

    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromDate(e.target.value);
    };

    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDestination(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!destination || !source || !fromDate) {
            console.error("Missing one or more required parameters: destination, source, or date.");
            return; 
        }
        router.push(`/travel-essential-details?destination=${encodeURIComponent(destination)}&source=${encodeURIComponent(source)}&date=${encodeURIComponent(fromDate)}`);
    };
    

    return (
        <div className="relative h-screen w-full">
            <video src="/video.mp4" autoPlay loop muted className="h-screen w-full object-cover" />
            
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col px-20">
                <div className="mt-48 items-center justify-start text-white ">
                <h1 className="text-4xl md:text-6xl font-bold">
                    Hii, Welcome to Tripology
                </h1>
                </div>

                <div className="md:px-40 mt-24 ">
                    <form onSubmit={handleSubmit} className="flex flex-col font-semibold bg-white bg-opacity-50 rounded-lg lg:flex-row lg:space-x-20 items-center justify-between px-6 py-3">
                        <label className="flex flex-col my-2 w-full">
                            Search Your Destination
                            <input type="text" value={destination} onChange={handleDestinationChange} className="mt-1 p-2 rounded text-black" placeholder="Enter destination" />
                        </label>
                        <label className="flex flex-col my-2 w-full">
                            Your city
                            <input type="text" value={source} onChange={handleSourceChange} className="mt-1 p-2 rounded text-black" placeholder="Enter your city" />
                        </label>
                        <label className="flex flex-col my-2 w-full">
                            Select Your Date
                            <input type="date" value={fromDate} onChange={handleDateChange} className="mt-1 p-2 rounded"/>
                        </label>
                        <button type="submit" className="my-4 p-2 bg-neutral-300 text-black rounded hover:scale-105 active:scale-95">Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SessionHomepage



