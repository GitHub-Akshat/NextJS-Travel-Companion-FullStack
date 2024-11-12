export type FlightDay = {
    day: string;
    price: number;
    group: 'low' | 'medium' | 'high';
};

export type FlightsData = {
    days: FlightDay[];
    currency: string;
    noPriceLabel: string;
    groups: {
        id: 'low' | 'medium' | 'high';
        label: string;
    }[];
};

export type FlightsDataResponse = {
    status: boolean;
    timestamp: number;
    data: {
        flights: FlightsData;
    };
};
