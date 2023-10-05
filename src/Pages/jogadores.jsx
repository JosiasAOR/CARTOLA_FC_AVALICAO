import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Jogadores() {
  const [data2, setData2] = useState([]);
  const [data, setData] = useState([]);
  const [show2, setShow2] = useState(false);
  const [show, setShow] = useState(false);
  const { nome } = useParams();

  useEffect(() => {
    apiCartolaFC();
  }, [nome]);

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

    axios
      .get(`https://api.cartola.globo.com/clubes`)
      .then((response) => {
        const clubesData = response.data;
        setData2(clubesData[nome]);
        console.log(clubesData);
        setShow2(true);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
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
      <h1>{`Jogadores do ${data2.nome}`}</h1>
      {show ? (
        data && data.length > 0 ? (
          <ul>
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
