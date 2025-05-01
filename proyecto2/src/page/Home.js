import { useEffect, useState } from "react";
import PropiedadCard from "../components/PropiedadCard";
import "../styles/home.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuesta = await fetch(
          "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json"
        );
        const data = await respuesta.json();
        setItems(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    cargarDatos();
  }, []);

  const filtrados = items.filter((el) =>
    el.description.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="encabezado-app">
        <div className="banner-contenido">
          <h3>Book unique places to stay and things to do.</h3>
          <h3>Unforgettable trips start with Airbnb.</h3>
          <div className="campo-busqueda">
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          </div>
        </div>
      </header>

      <main className="listado-propiedades">
        {filtrados.length > 0 ? (
          filtrados.map((item) => (
            <PropiedadCard key={item.id} propiedad={item} />
          ))
        ) : (
          <p style={{ color: "white", fontSize: "2em" }}>
            No se encontraron propiedades.
          </p>
        )}
      </main>
    </div>
  );
}
