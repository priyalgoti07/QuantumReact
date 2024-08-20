import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getAccessToken } from "../../utils/getAccessToken";

interface State {
    state_name: string;
}

interface StateSelectProps {
    country: string | null;
    value: string | null;
    onChange: (event: any, newValue: string | null) => void;
    error: boolean; // Add error prop
    helperText: string | undefined; // Add helperText prop
}

const StateSelect: React.FC<StateSelectProps> = ({ country, value, onChange, error, helperText }) => {
    const [states, setStates] = useState<State[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchStates = async (country: string) => {
        setLoading(true);
        const authToken = await getAccessToken();
        if (authToken) {
            try {
                const response = await fetch(`https://www.universal-tutorial.com/api/states/${country}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                        "Accept": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStates(data);
                } else {
                    console.error("Failed to fetch states");
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
        if (country) {
            fetchStates(country);
        } else {
            setStates([]);
        }
    }, [country]);

    return (
        <Autocomplete
            freeSolo
            value={value}
            onChange={onChange}
            options={states.map((state) => state.state_name)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="State"
                    variant="filled"
                    error={error} // Pass error prop to TextField
                    helperText={helperText} // Pass helperText prop to TextField
                    // disabled={!country || loading}
                />
            )}
            loading={loading}
        />
        
    );
};

export default StateSelect;
