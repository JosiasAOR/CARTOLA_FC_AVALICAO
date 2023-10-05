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
        console.log(Object.values(clubesData));
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
          {Object.values(data).map((objeto) => (
            <Link to={`jogadores/${objeto.id}`}>
              <li key={objeto.id}>{objeto.nome}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
