import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Jogadores() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const { nome } = useParams();

  useEffect(() => {
    apiCartolaFC();
  }, []);

  function apiCartolaFC() {
    axios
      .get(`https://api.cartola.globo.com/atletas/mercado/${nome}`)
      .then((response) => {
        const jogadores = response.data;
        setData(jogadores.atletas || []);
        setShow(true);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
        setData([]);
        setShow(true);
      });
  }

  function formatarURL(url) {
    if (url) {
      let foto = url.replace(/FORMATO/g, "220x220");
      return foto;
    } else {
      return null;
    }
  }

  return (
    <div>
        <button onClick={()=>{
            console.log(data)
        }}>mostart</button>
      {show ? (
        data && data.length > 0 ? (
          <ul>
            <h1>{data.id_clube}</h1>
            {data.map((jogador) => (
              <div className="video-card" key={jogador.id}>
                <p>{jogador.nome}</p>
                {jogador.foto ? (
                  <img src={formatarURL(jogador.foto)} alt={jogador.nome} />
                ) : (
                  <p>No photo available</p>
                )}
              </div>
            ))}
          </ul>
        ) : (
          <p>Sem foto de Jogadores</p>
        )
      ) : (
        <p>carregando...</p>
      )}
    </div>
  );
}
