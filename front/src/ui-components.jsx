import styled from 'styled-components';

const UlMensajes = styled.ul`
  max-width: 800px;
  margin: 30px auto;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Aumenté el espacio entre elementos */
  padding: 0; /* Agregué un reset de padding */
`;

const LiMensaje = styled.li`
  background-color: lightblue;
  border: 2px solid dodgerblue;
  border-radius: 10px; /* Agregué bordes redondeados */
  padding: 10px; /* Ajusté el padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Agregué una suave sombra */
`;

export { UlMensajes, LiMensaje };
