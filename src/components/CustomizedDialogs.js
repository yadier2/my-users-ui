import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, TextField } from "@mui/material";
import useFormStyles from "../styles/useFormFields";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Skeleton from "./Animations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "../schemas/userSchemas";
import {
  UPDATE_USER_ERROR,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  USER_SUCCESS,
} from "../utils/const";
import SimpleSnackbar from "./SimpleSnackbar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({
  open,
  idUser,
  handleClose,
  updateUser,
  getUser,
  user,
  loading,
  setLoading,
}) {
  const initialValue = {
    open: false,
    message: "",
    loading: false,
    severity: "",
  };
  const [state, setState] = React.useState(initialValue);
  const classes = useFormStyles();
  React.useEffect(() => {
    getUser(idUser);
  }, []);

  React.useEffect(() => {
    if (loading.getUser === USER_SUCCESS) {
      let { name, lastName, email, phoneNumber, cc } = user;
      setValue("name", name, { shouldValidate: true });
      setValue("lastName", lastName, { shouldValidate: true });
      setValue("email", email, { shouldValidate: true });
      setValue("phoneNumber", phoneNumber, { shouldValidate: true });
      setValue("cc", cc, { shouldValidate: true });
    }
  }, [loading.getUser]);

  React.useEffect(() => {
    let { message, severity } = loading;
    switch (loading.updateUser) {
      case UPDATE_USER_PENDING:
        setState({ open: false, message: "", loading: true });
        break;
      case UPDATE_USER_SUCCESS:
        setState({ open: true, message, loading: false, severity });

        setTimeout(() => {
          setLoading({});
          handleClose();
        }, 1000);
        break;
      case UPDATE_USER_ERROR:
        setState({ open: true, message, loading: false, severity });
        break;
      default:
        setState(initialValue);
        break;
    }
  }, [loading.updateUser]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(createUserSchema),
    defaultValues: { user },
  });

  const onSubmit = (val) => {
    updateUser(val, idUser);
  };
  const handleClick = () => {
    setState({ ...state, open: true });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };
  return (
    <BootstrapDialog
      fullWidth="md"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {loading.getUser === USER_SUCCESS ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              Editar Usuario
            </BootstrapDialogTitle>

            <DialogContent dividers>
              <Box sx={{ p: 2, pb: 0 }}>
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
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>

              <LoadingButton
                loading={false}
                autoFocus
                variant="contained"
                type="submit"
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Guardar cambios
              </LoadingButton>
            </DialogActions>
          </form>

          <SimpleSnackbar
            handleClick={handleClick}
            handleClose={handleCloseAlert}
            state={state}
          />
        </>
      ) : (
        <>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Editar Usuario
          </BootstrapDialogTitle>
          <Box sx={{ p: 5, pt: 0 }}>
            <Skeleton />
          </Box>
        </>
      )}
    </BootstrapDialog>
  );
}
