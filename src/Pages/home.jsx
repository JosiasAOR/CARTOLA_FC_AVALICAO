import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    apiCartolaFC();
  }, []);

  function apiCartolaFC() {
    axios
      .get(`https://api.cartola.globo.com/clubes`)
      .then((response) => {
        const clubesData = response.data;
        setData(clubesData);
        setShow(true);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }

  return (
    <div className="container">
      <div>

      <img
        width={200}
        className="img-cartola"
        src="https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png"
        alt=""
      />
      </div>
      <div className="fundo-lista">

      {show && (
        <ul>
          {Object.values(data).map((objeto) =>
            objeto.escudos["30x30"] ===
            "https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_30x30.png" ? null : (
              <Link to={`jogadores/${objeto.id}`} key={objeto.id}>
               
                <li>{objeto.nome}</li>
                <img
                  src={objeto.escudos["30x30"]}
                  alt={`${objeto.nome} logo`}
                  />
              </Link>
            )
            )}
        </ul>
      )}
      </div>
    </div>
  );
}
