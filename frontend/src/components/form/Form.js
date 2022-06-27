import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import "./Form.css";

export default function Form({ onClose }) {
  const [postData, updatePostData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    sex: "",
    location: "",
    blood_group: "",
  });

  const [blood, setBlood] = useState("");
  const [sex, setSex] = useState("");

  const handleBlood = (e) => {
    setBlood(e.target.value);
  };

  useEffect(() => {
    if (blood === "A+") {
      updatePostData({ ...postData, blood_group: "APOS" });
    }
    if (blood === "B+") {
      updatePostData({ ...postData, blood_group: "BPOS" });
    }
    if (blood === "O+") {
      updatePostData({ ...postData, blood_group: "OPOS" });
    }
    if (blood === "A-") {
      updatePostData({ ...postData, blood_group: "ANEG" });
    }
    if (blood === "B-") {
      updatePostData({ ...postData, blood_group: "BNEG" });
    }
    if (blood === "O-") {
      updatePostData({ ...postData, blood_group: "ONEG" });
    }
    if (blood === "AB+") {
      updatePostData({ ...postData, blood_group: "ABPOS" });
    }
    if (blood === "AB-") {
      updatePostData({ ...postData, blood_group: "ABNEG" });
    }
  }, [blood]);

  const handleSex = (e) => {
    setSex(e.target.value);
  };

  useEffect(() => {
    updatePostData({ ...postData, sex: sex });
  }, [sex]);

  const handleChange = (e) => {
    const tempObj = { ...postData };
    tempObj[e.target.name] = e.target.value;
    updatePostData(tempObj);
  };

  const handleSubmit = async () => {
    const res = await axios.post("http://127.0.0.1:8000/api/donor/", {
      firstname: postData.firstname,
      lastname: postData.lastname,
      age: postData.age,
      sex: postData.sex,
      location: postData.location,
      blood_group: postData.blood_group,
    });
    console.log("respose", res);
    if (res.data) {
      onClose();
    }
  };

  return (
    <div className="form">
      <div style={{ marginBottom: "10px" }}>
        <Input
          name="firstname"
          placeolder="Fisrt Name"
          label="Fisrt Name"
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Input
          name="lastname"
          placeolder="Last Name"
          label="Last Name"
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <Input
          name="age"
          placeolder="Age"
          label="Age"
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <FormControl sx={{ minWidth: "100%" }} size="small">
          <InputLabel id="demo-select-small">Sex</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={sex}
            label="Sex"
            onChange={(e) => handleSex(e)}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <Input
          name="location"
          placeolder="Location"
          label="Location"
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        {/* <Input
          name="blood_group"
          placeolder="Blood Group"
          label="Blood Group"
          onChange={handleChange}
        /> */}
        <FormControl sx={{ minWidth: "100%" }} size="small">
          <InputLabel id="demo-select-small">Blood Group</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={blood}
            label="Blood Group"
            onChange={(e) => handleBlood(e)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="O-">O-</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* for button */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
