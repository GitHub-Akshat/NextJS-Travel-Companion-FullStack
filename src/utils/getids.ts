import axios from 'axios';

interface SkyIdResponseItem {
    navigation: {
        relevantFlightParams: {
            skyId: string;
            entityId: string;
            flightPlaceType: string;
        };
    };
}

export const getSkyId = async (cityName: string): Promise<{ skyId: string; entityId: string } | null> => {
    const options = {
        method: 'GET',
        url: 'https://sky-scanner3.p.rapidapi.com/flights/auto-complete',
        params: { query: cityName },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST,
        },
    };

    try {
        const response = await axios.get<{ data: SkyIdResponseItem[] }>(options.url, options);
        const cityEntry = response.data.data.find(
            item => item.navigation.relevantFlightParams.flightPlaceType === 'AIRPORT' 
        );
        
        if (cityEntry) {
            return {
                skyId: cityEntry.navigation.relevantFlightParams.skyId,
                entityId: cityEntry.navigation.relevantFlightParams.entityId,
            };
        }
        
        throw new Error(`No skyId found for city: ${cityName}`);
    } catch (error) {
        console.error(`Error fetching skyId for ${cityName}:`, error);
        return null;
    }
};
