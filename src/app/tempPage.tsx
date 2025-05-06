"use client";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import SelectFeatures from "@/components/ui/selectFeatures";

export default function Home() {
  type HouseInfoType = {
    [key: string]: string;
  };

  const [houseInfo, setHouseInfo] = useState<HouseInfoType>({
    district: "",
    bedrooms: "",
    furnishing: "",
    property_condition: "",
    NumOfFacilities: "",
    certificate: "",
    garages: "",
    building_orientation: "",
    building_age: "",
    carports: "",
    city: "",
    floors: "",
    maid_bedrooms: "",
    electricity: "",
    maid_bathrooms: "",
    land_size_m2: "",
    bathrooms: "",
    building_size_m2: "",
  });

  const [prediction, setPrediction] = useState(null);

  const [submittedInfo, setSubmittedInfo] = useState(null);

  const handleChange = (value: string) => {
    setHouseInfo((prevInfo) => ({
      ...prevInfo,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(houseInfo),
      });

      const result = await response.json();

      if (response.ok) {
        setPrediction(result.Result);
        console.log(result.Result);
      } else {
        console.log("Not OK");
      }
    } catch (error) {
      console.log("Error:");
    }
  };

  return (
    <div>
      {/* <h1>House Information</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(houseInfo).map((key) => (
          <div key={key}>
            <label>{key.replace(/_/g, " ")}:</label>
            <input
              type="text"
              name={key}
              value={houseInfo[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Prediction Result</h2>
        <p>The predicted value is: {prediction}</p>
      </div> */}
    </div>
  );
}
