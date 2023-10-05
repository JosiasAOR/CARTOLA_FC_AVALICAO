import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./jogadores.css";

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
    <div className="container2">
        <div className="div-logo">
        <img
          width={250}
          className="img-cartola"
          src="https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png"
        />
      </div>
      <div>
      </div>
<div className="show">

        <h1>{`Jogadores do ${data2.nome}`}</h1>
      {show ? (
          data && data.length > 0 ? (
              <ul>
            {data.map((jogador) => (
                <div className="jogadores" key={jogador.id}>
                <div>
                    {
                        jogador.foto===null ?(<h4>Sem foto</h4>):(<img className="img" src={formatarURL(jogador.foto)} alt={jogador.nome} />)
                    }
                </div>
                <di>
                  <h2>{jogador.nome}</h2>
                </di>
              </div>
            ))}
          </ul>
        ) : (
            <p4>Sem foto de Jogadores</p4>
            )
            ) : (
                <p4>carregando...</p4>
                )}
                </div>
    </div>
  );
}
