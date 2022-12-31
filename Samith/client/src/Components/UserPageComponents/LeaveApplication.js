import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const theme = createTheme();

function LeaveForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const totalValid = true;
    setEmployerID(event.target.employerid);
    // setLeaveType(event.target.leavetype);
    if (fromValue < toValue) {
      setValid(true);
    } else {
      setValid(false);
      let totalValid = false;
    }

    if (totalValid) {
      axios
        .post("http://localhost:3001/leave-application", {
          employerID: data.get("employerid"),
          leaveType: leaveType,
          fromValue: fromValue,
          toValue: toValue,
          // username: data.get("username"),
          // password: data.get("password"),
        })
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const [employerID, setEmployerID] = React.useState("");
  const [leaveType, setLeaveType] = React.useState("");
  const [fromValue, setFromValue] = React.useState(null);
  const [toValue, setToValue] = React.useState(null);
  const [valid, setValid] = React.useState(false);

  const typeChange = (event) => {
    setLeaveType(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Leave Application
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="employerid"
                  required
                  fullWidth
                  id="employerid"
                  label="Employer ID"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="leave-type-label" defaultValue={""}>
                    Leave Type
                  </InputLabel>
                  <Select
                    // labelId="leave-type-label"
                    id="leavetype"
                    value={leaveType}
                    label="Leave Type"
                    onChange={typeChange}
                    defaultValue=""
                  >
                    <MenuItem value={"Annual_leave"}>Annual_leave</MenuItem>
                    <MenuItem value={"Maternal_leave"}>Maternal_leave</MenuItem>
                    <MenuItem value={"Casual_leave"}>Casual_leave</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format
                    label="From"
                    value={fromValue}
                    onChange={(newValue) => {
                      setFromValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To"
                    value={toValue}
                    onChange={(newValue) => {
                      setToValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            {!valid && (
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="#ff0000"
              >
                *Wrong Date
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LeaveForm;
