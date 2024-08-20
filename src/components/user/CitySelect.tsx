import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getAccessToken } from "../../utils/getAccessToken";

interface City {
    city_name: string;
}

interface CitySelectProps {
    state: string | null;
    value: string | null;
    onChange: (event: any, newValue: string | null) => void;
    error: boolean; // Add error prop
    helperText: string | undefined; // Add helperText prop
}

const CitySelect: React.FC<CitySelectProps> = ({ state, value, onChange, error, helperText }) => {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCities = async (state: string) => {
        setLoading(true);
        const authToken = await getAccessToken();
        if (authToken) {
            try {
                const response = await fetch(`https://www.universal-tutorial.com/api/cities/${state}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                        "Accept": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCities(data);
                } else {
                    console.error("Failed to fetch cities");
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
        if (state) {
            fetchCities(state);
        } else {
            setCities([]);
        }
    }, [state]);

    return (
        <Autocomplete
            freeSolo
            value={value}
            onChange={onChange}
            options={cities.map((city) => city.city_name)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="City"
                    variant="filled"
                    error={error} // Pass error prop to TextField
                    helperText={helperText} // Pass helperText prop to TextField
                />
            )}
            loading={loading}
        />


    );
};

export default CitySelect;
