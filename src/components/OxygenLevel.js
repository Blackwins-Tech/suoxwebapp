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
import { useState } from "react";
import moment from "moment";
//import uniqueid from "uniqueid";
import axios from "axios";
//import apicalls from "./apicalls";
export default function OxygenLevel() {
  const [value, setValue] = useState(null);
  const [session, setSession] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [bpmValue, setBpmValue] = useState("");

  const handleChange = (event) => {
    setSession(event.target.value);
  };

  const postOxygenData = (oxygenObj) => {
    axios
      .post("https://suoxappbackend.herokuapp.com/api/oxygen", {
        //id: uniqueid(),
        oxygen_value: oxygenObj.oxygen_value,
        month: oxygenObj.month,
        date: oxygenObj.date,
        time: oxygenObj.time,
        bpm: oxygenObj.bpm
      })
      .then((resp) => {
        alert(resp.data);
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
    let timeValue = moment(value).format("hh:mm:ss");
    let formattedDate = `${value.getUTCFullYear()}-${
      value.getUTCMonth() + 1
    }-${value.getUTCDate()}`;
    var oxygenObject = {
      oxygen_value: oxygenLevel,
      month: formattedDate,
      date: value.getDate(),
      time: timeValue,
      bpm: bpmValue
    };
    //console.log(value);

    console.log(oxygenObject);
    postOxygenData(oxygenObject);
  };

  return (
    <div className="App">
      <h3>Patient Oxygen Daily Values</h3>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Test Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div>
        <TextField
          id="standard-basic"
          label="Oxygen Level"
          value={oxygenLevel}
          onChange={(event) => {
            setOxygenLevel(event.target.value);
          }}
          variant="standard"
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="BPM"
          value={bpmValue}
          onChange={(event) => {
            setBpmValue(event.target.value);
          }}
          variant="standard"
        />
      </div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Session</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={session}
          label="Session"
          onChange={handleChange}
        >
          <MenuItem value={10}>Morning (6 AM - 12 PM)</MenuItem>
          <MenuItem value={20}>Afternoon(12 PM - 4 PM)</MenuItem>
          <MenuItem value={30}>Evening (4 PM - 8 PM)</MenuItem>
          <MenuItem value={40}>Night (8 PM - 11 PM)</MenuItem>
        </Select>
      </FormControl>

      <div>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
