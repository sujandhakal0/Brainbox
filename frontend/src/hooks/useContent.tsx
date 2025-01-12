import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useContent = (contentChanged: boolean) => {
    const [contents, setContents] = useState([]);

    const refresh = () => {
        axios.get(`${BACKEND_URL}/content`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((response) => setContents(response.data.content))
            .catch((error) => {
                console.error("Error fetching content", error);
            });
    };

    useEffect(() => {
        // Fetch content whenever contentChanged changes
        refresh();

        // Type `interval` as `number` for browser environment
        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [contentChanged]); // Run this effect whenever contentChanged changes

    return contents;
};