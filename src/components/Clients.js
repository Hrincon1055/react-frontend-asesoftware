import React, { useEffect, useState } from "react";
import { map, size } from "lodash";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
// Mis componentes
import { getcustomersApi, deleteClientApi } from "../api/client";
// Inicio
export default function Clients(props) {
  // props
  const { loading, setLoading, seteditC } = props;
  // state
  const [customers, setCustomers] = useState(null);

  // effect
  useEffect(() => {
    (async () => {
      const response = await getcustomersApi();
      setCustomers(response);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  // funciones
  const deleteClient = async (uid) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      try {
        await deleteClientApi(uid);
        toast("Cliente eliminado.", {
          type: "info",
        });
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const editClient = (uid) => {
    seteditC(uid);
  };
  // returns
  return (
    <>
      {!customers ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : size(customers.clientes) === 0 ? (
        <Alert variant="primary">No tienes clientes Registrados!</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Date of birth</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {map(customers.clientes, (client) => (
              <tr key={client.uid}>
                <td>{client.nombre}</td>
                <td>{client.correo}</td>
                <td>{client.edad}</td>
                <td>{transformDate(client.fecha_nacimiento)}</td>
                <th>
                  <Button variant="warning" onClick={() => editClient(client)}>
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => deleteClient(client.uid)}
                  >
                    Delete
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
// funciones
function transformDate(date) {
  let fecha = new Date(date);
  let options = { year: "numeric", month: "long", day: "numeric" };

  return fecha.toLocaleDateString("es-ES", options);
}
