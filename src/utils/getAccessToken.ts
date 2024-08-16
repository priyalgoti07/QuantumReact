// Function to get the access token
export const getAccessToken = async (): Promise<string | null> => {
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
