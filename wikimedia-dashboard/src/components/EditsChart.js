import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { connect, disconnect } from "../services/websocket";

export default function EditsChart() {
    const [data, setData] = useState({});

    useEffect(() => {
        connect((event) => {
            setData((prev) => ({
                ...prev,
                [event.user]: event.count,
            }));
        });

        return () => disconnect();
    }, []);

    const chartData = Object.entries(data).map(([user, count]) => ({
        user,
        count,
    }));

    return (
        <BarChart width={800} height={400} data={chartData}>
            <XAxis dataKey="user" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
        </BarChart>
    )
}