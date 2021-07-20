import React, { useEffect } from "react";
import { Form, Col, Row, InputGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
// Mis componentes
import { registerClientApi, updateClientApi } from "../api/client";
// Inicio
export default function FormClient(props) {
  // props
  const { setLoading, editC, seteditC } = props;

  // effect
  useEffect(() => {
    (async () => {
      if (editC) {
        await formik.setFieldValue("nombre", editC.nombre);
        await formik.setFieldValue("correo", editC.correo);
        await formik.setFieldValue("edad", editC.edad);
        await formik.setFieldValue("fecha_nacimiento", editC.fecha_nacimiento);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editC]);
  // constantes
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        if (!editC) {
          const response = await registerClientApi(formData);
          setLoading(true);
          if (response.errors) {
            throw response.errors[0].msg;
          } else {
            toast("Cliente Creado.", {
              type: "success",
            });
            seteditC(null);
            await formik.resetForm();
          }
        } else {
          console.log("edit");
          const response = await updateClientApi(editC.uid, formData);
          setLoading(true);
          if (response.errors) {
            throw response.errors[0].msg;
          } else {
            toast("Cliente Actualizado.", {
              type: "success",
            });
            seteditC(null);
            await formik.resetForm();
          }
        }
      } catch (error) {
        console.log(error);
        toast(error, {
          type: "warning",
        });
      }
    },
  });
  // returns

  return (
    <>
      <Form noValidate className="mb-4" onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              isInvalid={formik.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                name="correo"
                value={formik.values.correo}
                onChange={formik.handleChange}
                isInvalid={formik.errors.correo}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.correo}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              name="edad"
              value={formik.values.edad}
              onChange={formik.handleChange}
              isInvalid={formik.errors.edad}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.edad}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date of birth"
              name="fecha_nacimiento"
              value={formik.values.fecha_nacimiento}
              onChange={formik.handleChange}
              isInvalid={formik.errors.fecha_nacimiento}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.fecha_nacimiento}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" variant="primary" size="lg">
          {editC ? "Edit Client" : " New Client"}
        </Button>
      </Form>
    </>
  );
}
// funciones
function initialValues() {
  return {
    nombre: "",
    correo: "",
    edad: "",
    fecha_nacimiento: "",
  };
}
function validationSchema() {
  return {
    nombre: Yup.string().required("El nombre es obligatorio."),
    correo: Yup.string()
      .min(5, true)
      .max(60, true)
      .required("El correo es obligatorio."),
    edad: Yup.string()
      .min(1, true)
      .max(3, true)
      .required("La edad es obligatoria."),
    fecha_nacimiento: Yup.string()
      .min(10, true)
      .required("La fecha de nacimiento es obligatoria."),
  };
}
