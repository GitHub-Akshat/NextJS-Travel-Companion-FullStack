import { NextRequest, NextResponse } from "next/server";
import { fetchFlights } from "@/utils/fetchFlights";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const originCity = searchParams.get('source') || "";
  const destinationCity = searchParams.get('destination') || "";
  const fromDate = searchParams.get('date') || "";

  if (!originCity || !destinationCity || !fromDate) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const flightData = await fetchFlights(originCity, destinationCity, fromDate);

  if (!flightData) {
    return NextResponse.json({ error: "Could not fetch flight data" }, { status: 500 });
  }

  return NextResponse.json(flightData);
}
