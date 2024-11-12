import { getSkyId } from "@/utils/getids";
import axios from "axios";

interface FlightData {
    price: number;
    currency: string;
    departureDate: string;
    returnDate?: string;
    airline: string;
    flightDuration: string;
    stops: number;
    additionalDetails?: Record<string, unknown>; 
  }
  
  
export const fetchFlights = async (originCity: string, destinationCity: string, fromDate: string): Promise<FlightData | null> => {
    const origin = await getSkyId(originCity);
    const destination = await getSkyId(destinationCity);

    if (!origin || !destination) {
        console.error("Invalid origin or destination skyId.");
        return null;
    }

    const flightOptions = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar',
        params: {
            originSkyId: origin.skyId,
            destinationSkyId: destination.skyId,
            fromDate: fromDate,
            currency: 'INR'
        },
        headers: {
            'x-rapidapi-key': process.env.FLIGHT_API_KEY,
            'x-rapidapi-host': process.env.FLIGHT_API_HOST
        }
    };

    try {
        const response = await axios.request<FlightData>(flightOptions);
        return response.data;
    } catch (error) {
        console.error("Error fetching flights:", error);
        return null;
    }
};