import { useState, cloneElement } from "react";

import {
  Container,
  Step,
  Stepper,
  StepLabel,
  Box,
  Grid,
  Button,
} from "@mui/material";

import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import TableData from "./components/Table";
import useUsers from "./hooks/useUsers";
import { USERS_PENDING, USERS_SUCCESS } from "./utils/const";
import DenseAppBar from "./components/DenseAppBar";
import Animations from "./components/Animations";

const steps = [
  {
    label: "Paso 1",
    componente: <Form1 />,
  },
  {
    label: "Paso 2",
    componente: <Form2 />,
  },
];

const App = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const {
    users,
    createUser,
    loading,
    setLoading,
    deleteUser,
    updateUser,
    user,
    getUser,
  } = useUsers();

  return (
    <>
      <DenseAppBar />

      <Container
        fixed
        style={{
          padding: "3em",
        }}
      >
        <Grid container spacing={6}>
          <Grid item md={4} sm={12} xs={12}>
            <Stepper activeStep={step}>
              {steps.map((step, key) => (
                <Step key={key}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box
              style={{
                marginTop: "4em",
              }}
            >
              {cloneElement(
                steps[step].componente,
                {
                  setStep,
                  setData,
                  data,
                  createUser,
                  loading,
                  setLoading,
                },
                null
              )}
            </Box>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            {loading.getUsers === USERS_PENDING ? (
              <Animations />
            ) : (
              <TableData
                users={users}
                deleteUser={deleteUser}
                loading={loading}
                updateUser={updateUser}
                user={user}
                getUser={getUser}
                setLoading={setLoading}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
