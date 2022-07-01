import { TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchemaForm2 } from "../schemas/userSchemas";
import useFormStyles from "../styles/useFormFields";
import { useEffect, useState } from "react";
import {
  CREATE_USERS_ERROR,
  CREATE_USERS_PENDING,
  CREATE_USERS_SUCCESS,
} from "../utils/const";
import SimpleSnackbar from "./SimpleSnackbar";

const initialValue = { open: false, message: "", loading: false, severity: "" };
const Form2 = ({ setStep, setData, data, createUser, loading, setLoading }) => {
  const classes = useFormStyles();
  const [state, setState] = useState(initialValue);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(createUserSchemaForm2),
    defaultValues: {
      email: data.email,
      phoneNumber: data.phoneNumber,
      cc: data.cc,
    },
  });
  useEffect(() => {
    let { message, severity } = loading;
    switch (loading.createUser) {
      case CREATE_USERS_PENDING:
        setState({ open: false, message: "", loading: true });
        break;
      case CREATE_USERS_SUCCESS:
        setState({ open: true, message, loading: false, severity });
        setData({});
        setTimeout(() => {
          setLoading({});
          setStep(0);
        }, 1000);
        break;
      case CREATE_USERS_ERROR:
        setState({ open: true, message, loading: false, severity });
        break;
      default:
        setState(initialValue);
        break;
    }
  }, [loading.createUser]);

  const handlePrevious = () => {
    const values = getValues();
    setData({ ...data, ...values });
    setStep(0);
  };

  const onSubmit = (val) => {
    let user = { ...data, ...val };
    createUser(user);
  };
  const handleClick = () => {
    setState({ ...state, open: true });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={classes.formField}
          fullWidth
          type="email"
          id="email"
          label="E-mail"
          defaultValue={""}
          {...(register && {
            ...register("email"),
          })}
          name="email"
          error={Boolean(errors?.email?.message)}
          helperText={errors ? errors?.email?.message : " "}
        />
        <TextField
          className={classes.formField}
          fullWidth
          id="phoneNumber"
          label="Teléfono"
          defaultValue={""}
          {...(register && {
            ...register("phoneNumber"),
          })}
          name="phoneNumber"
          error={Boolean(errors?.phoneNumber?.message)}
          helperText={errors ? errors?.phoneNumber?.message : " "}
        />
        <TextField
          className={classes.formField}
          fullWidth
          type="number"
          id="cc"
          label="Documento de identidad"
          defaultValue={""}
          {...(register && {
            ...register("cc"),
          })}
          name="cc"
          error={Boolean(errors?.cc?.message)}
          helperText={errors ? errors?.cc?.message : " "}
        />
        <Button
          className={classes.formButtons}
          variant="outlined"
          onClick={handlePrevious}
        >
          Anterior
        </Button>
        <LoadingButton
          loading={state.loading}
          variant="contained"
          type="submit"
        >
          Enviar
        </LoadingButton>
      </form>
      <SimpleSnackbar
        handleClick={handleClick}
        handleClose={handleClose}
        state={state}
      />
    </>
  );
};

export default Form2;
