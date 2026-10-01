import { useState, useEffect } from "react";
import { talleres } from "./data/talleres";
import TarjetaTaller from "./components/TarjetaTaller/TarjetaTaller";
import Boton from "./components/Boton/Boton";
import estilos from "./App.module.css";

export default function App() {
  const [tema, setTema] = useState("claro");
  const [vista, setVista] = useState("grilla");
  const [compacto, setCompacto] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-tema", tema);
  }, [tema]);

  const claseColumna = vista === "grilla" ? "col-12 col-md-6 col-lg-4" : "col-12";

  return (
    <main className={`container ${compacto ? "py-2" : "py-5"}`}>
      <h1>Catálogo de Talleres</h1>

      <div className={estilos.barra}>
        <Boton onClick={() => setTema(tema === "claro" ? "oscuro" : "claro")}>
          {tema === "claro" ? "Tema oscuro" : "Tema claro"}
        </Boton>
        <Boton variante="secundario" activo={vista === "grilla"} onClick={() => setVista("grilla")}>
          Grilla
        </Boton>
        <Boton variante="secundario" activo={vista === "lista"} onClick={() => setVista("lista")}>
          Lista
        </Boton>
        <Boton variante="secundario" activo={compacto} onClick={() => setCompacto(!compacto)}>
          Modo compacto
        </Boton>
      </div>

      <div className={`row ${compacto ? "g-2" : "g-4"}`}>
        {talleres.map((taller) => (
          <div key={taller.id} className={claseColumna}>
            <TarjetaTaller taller={taller} horizontal={vista === "lista"} />
          </div>
        ))}
      </div>
    </main>
  );
}

