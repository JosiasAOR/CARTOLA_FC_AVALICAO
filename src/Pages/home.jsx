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
      <div className="div-logo">
        <img
          width={250}
          className="img-cartola"
          src="https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png"
          
        />
      </div>
      <div className="fundo-lista">
        {show && (
          <ul>
            {Object.values(data).map((objeto) =>
            
                <Link className="link" to={`jogadores/${objeto.id}`} key={objeto.id}>
                  <div className="times">
                    <img
                      src={objeto.escudos["60x60"]}
                      alt={`${objeto.nome} logo`}
                      width={60}
                      height={60}
                    />
                    <div className="nomes">
                      <p className="p1">{objeto.nome}</p>
                      <p className="p2">{objeto.apelido}</p>
                    </div>
                  </div>
                </Link>
              
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
