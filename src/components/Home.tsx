import React, { useEffect, useState } from "react";
import { getAccessToken } from "../utils/getAccessToken";

interface Country {
  country_name: string;
}

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to get the access token
  const getAccessToken = async (): Promise<string | null> => {
    try {
      const response = await fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "api-token": "NvmhGRFXoprN1Q4TAaludqtkRtEZrQQBr5MBY0x3dHp7kFLfUZJ7ebT7taKrGtlNGeg",
          "user-email": "yagnik.infineit2003@gmail.com",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.auth_token;
      } else {
        console.error("Failed to fetch access token");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return null;
  };

  // Function to get the list of countries
  const fetchCountries = async () => {
    const authToken = await getAccessToken();
    if (authToken) {
      try {
        const response = await fetch("https://www.universal-tutorial.com/api/countries/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Accept": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        } else {
          console.error("Failed to fetch countries");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.country_name}>{country.country_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
