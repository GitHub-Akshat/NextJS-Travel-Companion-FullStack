import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get('destination') || ''; 
  
  const options = {
    method: 'GET',
    url: 'https://sky-scanner3.p.rapidapi.com/hotels/auto-complete',
    params: { query: destination },
    headers: {
      'x-rapidapi-key': process.env.AIRBNB_API_KEY,
      'x-rapidapi-host': process.env.AIRBNB_API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch hotel data' }, { status: 500 });
  }
}
