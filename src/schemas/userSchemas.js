import * as yup from "yup";

const name = yup
  .string()
  .trim("Nombre no puede incluir espacios iniciales y finales")
  .min(3, "Nombre debe tener al menos 3 caracteres")
  .max(255, "Nombre no puede exceder los 255 caracteres");

const lastName = yup
  .string()
  .trim("Apellido no puede incluir espacios iniciales y finales")
  .min(3, "Apellido debe tener al menos 3 caracteres");

const email = yup.string().email("Debe ser un correo electrónico válido");

const phoneNumber = yup
  .string()
  .matches(/^[0-9]+$/, "Teléfono debe ser un número")
  .min(10, "Teléfono debe tener 10 caracteres.")
  .max(20, "Teléfono debe tener 10 caracteres.");

const cc = yup
  .string()
  .matches(/^[0-9]+$/, "Documento de identidad debe ser un número")
  .min(8, "Documento de identidad debe tener más de 7 dígitos.");

const createUserSchemaForm1 = yup.object({
  name: name.required("Nombre es requerido"),
  lastName: lastName.required("Apellido es requerido"),
});

const createUserSchemaForm2 = yup.object({
  email: email.required("E-mail es requerido"),
  phoneNumber: phoneNumber.required("Teléfono es requerido"),
  cc: cc.required("Documento de identidad es requerido"),
});

const createUserSchema = yup.object({
  name: name.required("Nombre es requerido"),
  lastName: lastName.required("Apellido es requerido"),
  email: email.required("E-mail es requerido"),
  phoneNumber: phoneNumber.required("Teléfono es requerido"),
  cc: cc.required("Documento de identidad es requerido"),
});

export { createUserSchemaForm1, createUserSchemaForm2, createUserSchema };
