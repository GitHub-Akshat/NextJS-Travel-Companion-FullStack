export type WeatherData = {
    location: {
      name: string;
      region: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    };
    forecast: {
      forecastday: Array<{
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          daily_chance_of_rain: number;
          maxwind_kph: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      }>;
    };
  };
  