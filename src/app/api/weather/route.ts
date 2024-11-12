import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get('destination') || '';

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: {
            q: destination ,
            days: '3'
        },
        headers: {
            'x-rapidapi-key':process.env.WEATHER_API_KEY,
            'x-rapidapi-host':process.env.WEATHER_API_HOST
        }
    };

    try 
    {
        const response = await axios.request(options);
        return NextResponse.json(response.data);
    } 
    catch (error) 
    {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }
}