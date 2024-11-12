"use client"; 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { WeatherData } from '@/types/weatherTypes';
import { FlightsDataResponse } from '@/types/flighttype';
import { APIResponse, Hotel, POI } from '@/types/hotelANDpoitypes';
import { useSearchParams } from 'next/navigation';

const Travel = () => {
    const searchParams = useSearchParams();
    const destination = searchParams.get('destination');
    const source = searchParams.get('source');
    const date = searchParams.get('date');

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [flightData, setFlightData] = useState<FlightsDataResponse | null>(null);
    const [airbnbData, setAirBnbData] = useState<Hotel[] | null>(null);
    const [attractionsData, setAttractionsData] = useState<POI[]>([]);  

    const [attractionError, setAttractionError] = useState<string | null>(null);
    const [weatherError, setWeatherError] = useState<string | null>(null);
    const [flightError, setFlightError] = useState<string | null>(null);
    const [airbnbError, setAirBnbError] = useState<string | null>(null);

    const [isWeatherOpen, setWeatherOpen] = useState(false);
    const [isHotelsOpen, setHotelsOpen] = useState(false);
    const [isAttractionsOpen, setAttractionsOpen] = useState(false);

    const selectedDate = date ? new Date(date) : new Date(); 

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!destination) return;
            try {
                const response = await axios.get(`/api/weather`, {
                    params: { destination }
                });
                setWeatherData(response.data);
                setWeatherError(null);
            } catch (error) {
                console.error("Weather API error:", error);
                setWeatherError('Could not retrieve weather data. Please try again.');
            }
        };

        const fetchFlightData = async () => {
            if (!destination || !source) return;
            try {
                const response = await axios.get(`/api/flights`, {
                    params: { destination, source, date }
                });
                setFlightData(response.data);
                setFlightError(null);
            } catch (error) {
                console.error("Flight API error:", error);
                setFlightError('Could not retrieve flight data. Please try again.');
            }
        };

        const fetchAirbnbData = async () => {
            if (!destination) return;
            try {
                const response = await axios.get<APIResponse>(`/api/airbnb`, {
                    params: { destination: encodeURIComponent(destination) }
                });
                const pois = response.data.data.flatMap(item => item.pois || []); 
                const hotels = response.data.data.filter(item => item.class === 'Hotel');
                setAttractionsData(pois);
                setAirBnbData(hotels);
                setAirBnbError(null);
                setAttractionError(null);
            } catch (error) {
                console.error(error);
                setAirBnbError('Could not retrieve hotel data. Please try again.');
            }
        };
        
        fetchWeatherData();
        fetchFlightData();
        fetchAirbnbData();
    }, [destination, source, date]);

    const filteredFlights = flightData
    ? flightData.data.flights.days
        .filter(flight => new Date(flight.day) >= selectedDate) 
        .slice(0, 5) 
    : [];

    const currency = flightData?.data.flights.currency || 'INR'; 

    return (
        <div className="grid grid-row gap-6 p-12 mt-14 px-20">
            {/* Weather Card */}
            <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => setWeatherOpen(!isWeatherOpen)}> Weather </h2>
                {isWeatherOpen && (
                    <>
                        {weatherError && <p style={{ color: 'red' }}>{weatherError}</p>}
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
                                        width={64}     
                                        height={64}   
                                    />  
                                </div>

                                {/* Display 3-day forecast */}
                                <h3 className="text-xl font-semibold mb-4">3-Day Forecast</h3>
                                <div className="space-y-4 flex flex-col sm:flex-row justify-evenly">
                                    {weatherData.forecast.forecastday.map((day, index) => (
                                        <div key={index} className="bg-white bg-opacity-20 p-4 rounded-lg">
                                            <p className="font-semibold">{day.date}</p>
                                            <div className="flex items-center space-x-2">
                                                <Image
                                                    src={`https:${day.day.condition.icon}`} 
                                                    alt={day.day.condition.text} 
                                                    width={64}     
                                                    height={64}    
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
                <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => setHotelsOpen(!isHotelsOpen)}> Flights & Hotels </h2>
                {isHotelsOpen && (
                    <>
                        <div>
                            {flightError && <p style={{ color: 'red' }}>{flightError}</p>}
                            {flightData ? (
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Flight Information:</h3>
                                    <div className="flex flex-col sm:flex-row items-center gap-8 justify-center">
                                        {filteredFlights.length > 0 ? (
                                            filteredFlights.map((flight, index) => (
                                                <div key={index} className="p-4 bg-white rounded shadow mb-4">
                                                    <p><strong>Date:</strong> {flight.day}</p>
                                                    <p><strong>Price:</strong> {flight.price} {currency}</p>
                                                    <p><strong>Price Group:</strong> {flight.group === 'low' ? 'Low' : flight.group === 'medium' ? 'Medium' : 'High'}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No flights available for the selected route and date.</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p>Loading flights...</p>
                            )}
                        </div>
                        <div>
                            {airbnbError && <p style={{ color: 'red' }}>{airbnbError}</p>}
                            {airbnbData ? (
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Hotels in {destination}:</h3>
                                    <div className="flex flex-col sm:flex-row items-center gap-8 justify-center">
                                        {airbnbData.length > 0 ? (airbnbData.map((hotel, index) => (
                                            <div key={index} className="p-4 bg-white rounded shadow mb-4">
                                                <h4>{hotel.entityName}</h4>
                                                <p>{hotel.hierarchy}</p>
                                            </div>
                                            ))) : (
                                            <p>No hotels found.</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p>Loading properties...</p>
                            )}
                        </div>
                    </>               
                )}
            </div>


            {/* Attractions Card */}
            <div className="p-6 bg-yellow-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => setAttractionsOpen(!isAttractionsOpen)}>Places of Interest</h2>
                {isAttractionsOpen && (
                    <div>
                        {attractionError && <p style={{ color: 'red' }}>{attractionError}</p>}
                        {attractionsData.length > 0 ? (
                            <div>
                                {attractionsData.map((poi, index) => (
                                    <div key={index} className="p-4 bg-white rounded shadow mb-4">
                                        <p><strong>{poi.entityName}</strong></p>
                                        <p>Class: {poi.class}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No attractions available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Travel;