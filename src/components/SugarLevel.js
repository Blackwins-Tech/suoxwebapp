import "../styles.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import moment from "moment";
//import uniqueid from "uniqueid";
import axios from "axios";
export default function SugarLevel() {
  const [value, setValue] = useState(null);
  const [session, setSession] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");

  const handleChange = (event) => {
    setSession(event.target.value);
  };

  const postData = (sugarObject) => {
    axios
      .post("https://suoxappbackend.herokuapp.com/api/sugar", {
        //id: uniqueid(),
        sugar_value: sugarObject.sugar_value,
        month: sugarObject.month,
        date: sugarObject.date,
        time: sugarObject.time
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSave = (event) => {
    /*var sessionValue = "";
    if (session === 10) {
      sessionValue = "Morning";
    } else if (session === 20) {
      sessionValue = "Afternoon";
    } else if (session === 30) {
      sessionValue = "Evening";
    } else if (session === 40) {
      sessionValue = "Night";
    } else {
      sessionValue = "";
    }*/

    //moment(value).format("hh:mm:ss")
    let timeValue = moment(value).format("hh:mm:ss");
    let formattedDate = `${value.getUTCFullYear()}-${
      value.getUTCMonth() + 1
    }-${value.getUTCDate()}`;
    var sugarObject = {
      sugar_value: sugarLevel,
      month: value.getUTCMonth() + 1,
      date: formattedDate,
      time: timeValue
    };
    console.log(sugarObject);
    console.log(value);
    postData(sugarObject);
  };

  return (
    <div component={Paper}>
      <h3>Patient Sugar Entry Form</h3>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Test Date"
          value={value}
          color="primary"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div>
        <TextField
          id="standard-basic"
          label="Sugar Level"
          color="primary"
          value={sugarLevel}
          onChange={(event) => {
            setSugarLevel(event.target.value);
          }}
          variant="standard"
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Session</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={session}
            color="primary"
            label="Session"
            onChange={handleChange}
          >
            <MenuItem value={10}>Morning (6 AM - 12 PM)</MenuItem>
            <MenuItem value={20}>Afternoon(12 PM - 4 PM)</MenuItem>
            <MenuItem value={30}>Evening (4 PM - 8 PM)</MenuItem>
            <MenuItem value={40}>Night (8 PM - 11 PM)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
