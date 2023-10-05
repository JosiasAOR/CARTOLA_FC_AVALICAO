import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function Jogadores() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const { nome } = useParams()

    useEffect(() => {
        apiCartolaFC();
    }, []);

    function apiCartolaFC() {
        axios.get(`https://api.cartola.globo.com/atletas/mercado/${nome}`)
            .then((response) => {
                const joadores = response.data;
                setData(joadores.atletas);
                console.log(joadores.atletas)
                setShow(true);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }


    return (
        <div>
            {show && (
                <ul>
                    {data.map((jogador) => (
                <div className="video-card">
                  <p>{jogador.nome}</p>
                  <img
                    src={()=>{
                        let url = jogador.foto;
                        url = url.replace(/FORMATO/g, '220x220');
                         return url
                        }}
                  />
                <button onClick={()=>{
                    let url = jogador.foto;
                    url = url.replace(/FORMATO/g, '220x220');
                    window.open(url);
                    }}></button>
                </div>
            ))}
                </ul>
            )}
        </div>
    )
}