import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getAccessToken } from "../../utils/getAccessToken";

interface Country {
  country_name: string;
}

interface CountrySelectProps {
  value: string | null;
  onChange: (event: any, newValue: string | null) => void;
  error?: boolean;  // Error state passed from the parent component
  helperText?: string; // Error message to display
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, error, helperText }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <>
      <Autocomplete
        freeSolo
        value={value || ""} // Ensure the value is always controlled
        onChange={onChange}
        options={countries.map((country) => country.country_name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            variant="filled"
            error={error} // Apply error state
            helperText={helperText} // Show error message
          />
        )}
        loading={loading}
      />
    </>
  );
};

export default CountrySelect;
