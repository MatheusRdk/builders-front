import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Architect = ({ architectId }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [arquiteto, setArquiteto] = useState([{}]);

    useEffect(() => {
        async function fetchData() {
            const data = await getArchitect(architectId);
            setArquiteto(data);
        }
        fetchData();
    }, [architectId, token]);

    async function getArchitect(id) {        
        const res = await axios.get(`http://ec2-52-91-90-91.compute-1.amazonaws.com:80/architects/${id}`,
            { headers: { 'Authorization':  `Bearer ${token}`} 
        });
        console.log(res.data);
        return res.data;
    }

    return (
        <>
            <p>{arquiteto.name}</p>
        </>
    )
}

export default Architect;
