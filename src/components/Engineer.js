import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Engineer = ({ engineerId }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [engenheiro, setEngenheiro] = useState([{}]);

    useEffect(() => {
        async function fetchData() {
            const data = await getEngineer(engineerId);
            setEngenheiro(data);
        }
        fetchData();
    }, [engineerId, token]);

    async function getEngineer(id) {        
        const res = await axios.get(`http://ec2-52-91-90-91.compute-1.amazonaws.com:80/engineers/${id}`,
            { headers: { 'Authorization':  `Bearer ${token}`} 
        });
        console.log(res.data);
        return res.data;
    }

    return (
        <>
            <p>{engenheiro.name}</p>
        </>
    )
}

export default Engineer;
