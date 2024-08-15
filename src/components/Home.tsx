import React, { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", "API_KEY");

        const requestOptions: RequestInit = {
          method: 'GET',
          headers: headers,
          redirect: 'follow',
        };

        const response = await fetch("https://api.countrystatecity.in/v1/countries", requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json(); // Assuming the response is in JSON format
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <h1>Welcome to the Home Page</h1>
  );
};

export default Home;
