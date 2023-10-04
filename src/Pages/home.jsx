import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './home.css'

import axios from 'axios';
export default function Home() {

    const [data, setData] = useState("")
    const [show, setShow] = useState("")

    useEffect(() => {
        apiCartolaFC();
    }, []);

    function apiCartolaFC() {

        axios.get(`https://api.cartola.globo.com/clubes`)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setShow(true);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }


    return (
        <div>
             {show ? (
          <div className="times-grid">
            <h1>times</h1>
            {data.nome}
          </div>
        ) : (
          <p className="loading">Carregando...</p>
        )}
        </div>
    )
}