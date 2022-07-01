import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchemaForm1 } from "../schemas/userSchemas";
import useFormStyles from "../styles/useFormFields";

const Form1 = ({ setStep, setData, data }) => {
  const classes = useFormStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(createUserSchemaForm1),
    defaultValues: { name: data.name, lastName: data.lastName },
  });

  const onSubmit = (val) => {
    const { name, lastName } = val;
    setData({ ...data, name, lastName });
    setStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={classes.formField}
        fullWidth
        id="name"
        label="Nombre"
        defaultValue={""}
        {...(register && {
          ...register("name"),
        })}
        name="name"
        error={Boolean(errors?.name?.message)}
        helperText={errors ? errors?.name?.message : " "}
      />
      <TextField
        className={classes.formField}
        fullWidth
        id="apellido"
        label="Apellido"
        defaultValue={""}
        {...(register && {
          ...register("lastName"),
        })}
        name="lastName"
        error={Boolean(errors?.lastName?.message)}
        helperText={errors ? errors?.lastName?.message : " "}
      />
      <Button variant="contained" type="submit">
        Siguiente
      </Button>
    </form>
  );
};

export default Form1;
