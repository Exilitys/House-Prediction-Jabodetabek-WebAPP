"use client";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import * as featureData from "@/data/featureData";
import Navbar from "@/components/ui/navbar";

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

  const features: Array<{ name: keyof z.infer<typeof FormSchema> }> = [
    { name: "district" },
    { name: "city" },
    { name: "bedrooms" },
    { name: "furnishing" },
    { name: "property_condition" },
    { name: "NumOfFacilities" },
    { name: "certificate" },
    { name: "garages" },
    { name: "building_orientation" },
    { name: "building_age" },
    { name: "carports" },
    { name: "floors" },
    { name: "maid_bedrooms" },
    { name: "electricity" },
    { name: "maid_bathrooms" },
    { name: "bathrooms" },
  ];

  const FormSchema = z.object({
    district: z.string(),
    city: z.string(),
    bedrooms: z.string(),
    furnishing: z.string(),
    property_condition: z.string(),
    NumOfFacilities: z.string(),
    certificate: z.string(),
    garages: z.string(),
    building_orientation: z.string(),
    building_age: z.string(),
    carports: z.string(),
    floors: z.string(),
    maid_bedrooms: z.string(),
    electricity: z.string(),
    maid_bathrooms: z.string(),

    bathrooms: z.string(),
    land_size_m2: z.coerce.number({ invalid_type_error: "Must be a number" }),
    building_size_m2: z.coerce.number({
      invalid_type_error: "Must be a number",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSubmit();
  }

  const handleChange = (value: string, name: string) => {
    setHouseInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(houseInfo);
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
    <>
      <Navbar />
      <div className="text-2xl flex justify-center my-10 font-bold">
        House Prediction Jabodetabek
      </div>
      <div className="flex justify-center w-full items-center overflow-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex justify-center mx-auto items-center flex-col"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {features.map((feature) => (
                <FormField
                  key={feature.name}
                  control={form.control}
                  name={feature.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{feature.name}</FormLabel>
                      <FormDescription>
                        The {feature.name} of your property
                      </FormDescription>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value); // Update react-hook-form state
                          handleChange(value, field.name); // Call your custom function
                        }}
                        defaultValue={
                          typeof field.value === "number"
                            ? String(field.value)
                            : field.value
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`Select a ${feature.name}`}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(
                            featureData[
                              feature.name as keyof typeof featureData
                            ] || []
                          ).map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name="building_size_m2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building Size</FormLabel>
                    <FormDescription>
                      The building size of your property in square meters
                    </FormDescription>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter property building size"
                        onChange={(e) => {
                          field.onChange(e.target.value); // Update react-hook-form state
                          handleChange(e.target.value, field.name); // Call your custom function
                        }}
                        defaultValue={field.value}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="land_size_m2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Land Size</FormLabel>
                    <FormDescription>
                      The land size of your property in square meters
                    </FormDescription>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter property land size"
                        onChange={(e) => {
                          field.onChange(e.target.value); // Update react-hook-form state
                          handleChange(e.target.value, field.name); // Call your custom function
                        }}
                        defaultValue={field.value}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="hover:bg-teal-700 cursor-pointer items-center bg-teal-600"
              size={"lg"}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-2xl flex flex-col justify-center my-10 items-center">
        <div>Predicted Price</div>
        <div className="font-bold text-4xl">
          Rp.{new Intl.NumberFormat("en-US").format(prediction ?? 0)}
        </div>
      </div>
    </>
  );
}
