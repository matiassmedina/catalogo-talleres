import { useState } from "react";
import estilos from "./TarjetaTaller.module.css";
import Boton from "../Boton/Boton";

export default function TarjetaTaller({ taller }) {
  const [expandida, setExpandida] = useState(false);

  const { titulo, categoria, cupo, inscriptos, nuevo, descripcion } = taller;
  const libres = cupo - inscriptos;
  const porcentaje = Math.round((inscriptos / cupo) * 100);

  const estado = libres === 0 ? "completo" : libres <= 3 ? "pocos" : "disponible";

  const clases = [
    estilos.tarjeta,
    estilos[estado],
    expandida ? estilos.expandida : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={clases}>
      {nuevo && <span className={estilos.etiqueta}>Nuevo</span>}

      <h2 className={estilos.titulo}>{titulo}</h2>
      <p className={estilos.categoria}>{categoria}</p>

      {libres === 0 ? (
        <p className={estilos.textoCompleto}>Completo</p>
      ) : (
        <p>Cupos libres: {libres} de {cupo}</p>
      )}

      <div className={estilos.barra}>
        <div className={estilos.relleno} style={{ width: `${porcentaje}%` }} />
      </div>

      <Boton
            variante="secundario"
            activo={expandida}
            onClick={() => setExpandida(!expandida)}
            >
            {expandida ? "Ocultar detalles" : "Ver detalles"}
        </Boton>
      {expandida && <p className={estilos.descripcion}>{descripcion}</p>}
    </article>
  );
}