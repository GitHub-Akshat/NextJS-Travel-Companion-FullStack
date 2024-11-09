"use client"; // This line ensures the component is rendered on the client side

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { WeatherData } from '@/types/weatherTypes';
import { useSearchParams } from 'next/navigation';

const Travel = () => {
    const searchParams = useSearchParams();
    const destination = searchParams.get('destination');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [isWeatherOpen, setWeatherOpen] = useState(false);
    const [isHotelsOpen, setHotelsOpen] = useState(false);
    const [isAttractionsOpen, setAttractionsOpen] = useState(false);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!destination) return; // Only fetch if destination is available
            try {
                const response = await axios.get(`/api/weather`, {
                    params: { destination: encodeURIComponent(destination || '') }
                });
                setWeatherData(response.data);
                setError(null);
            } catch (error) {
                console.error(error);
                setError('Could not retrieve weather data. Please try again.');
            }
        };

        fetchWeatherData();
    }, [destination]);

    return (
        <div className="grid grid-row gap-6 p-12 mt-14 px-20">
            {/* Weather Card */}
            <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4cursor-pointer" onClick={() => setWeatherOpen(!isWeatherOpen)}> Weather </h2>
                {isWeatherOpen && (
                    <>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {weatherData ? (
                            <div className="mt-10 text-black">
                                <h2 className="text-2xl font-bold">Weather in {destination}</h2>

                                {/* Display current weather */}
                                <div className="mb-6">
                                    <p>Current Temperature: {weatherData.current.temp_c}°C</p>
                                    <p>Condition: {weatherData.current.condition.text}</p>
                                    <Image 
                                        src={`https:${weatherData.current.condition.icon}`} 
                                        alt={weatherData.current.condition.text} 
                                        width={64}     // Required width property
                                        height={64}    // Required height property
                                    />  
                                </div>

                                {/* Display 3-day forecast */}
                                <h3 className="text-xl font-semibold mb-4">3-Day Forecast</h3>
                                <div className="space-y-4 flex justify-evenly">
                                    {weatherData.forecast.forecastday.map((day, index) => (
                                        <div key={index} className="bg-white bg-opacity-20 p-4 rounded-lg">
                                            <p className="font-semibold">{day.date}</p>
                                            <div className="flex items-center space-x-2">
                                                <Image
                                                    src={`https:${day.day.condition.icon}`} 
                                                    alt={day.day.condition.text} 
                                                    width={64}     // Required width property
                                                    height={64}    // Required height property
                                                />
                                                <p>{day.day.condition.text}</p>
                                            </div>
                                            <p>Max Temp: {day.day.maxtemp_c}°C</p>
                                            <p>Min Temp: {day.day.mintemp_c}°C</p>
                                            <p>Chance of Rain: {day.day.daily_chance_of_rain}%</p>
                                            <p>Max Wind: {day.day.maxwind_kph} kph</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>Enter a destination to see the weather.</p>
                        )}
                    </>
                )}
            </div>

            {/* Hotels, Flights & Tickets Card */}
            <div className="p-6 bg-green-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4cursor-pointer" onClick={() => setHotelsOpen(!isHotelsOpen)}>Hotels, Flights & Tickets</h2>
                {isHotelsOpen && (
                    <div>
                        <p>Coming soon! Find the best deals for hotels, flights, and tickets here.</p>
                    </div>
                )}
            </div>

            {/* Attractions Card */}
            <div className="p-6 bg-yellow-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => setAttractionsOpen(!isAttractionsOpen)}>
                    Attractions
                </h2>
                {isAttractionsOpen && (
                    <div>
                        <p>Discover popular attractions for your destination.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Travel;