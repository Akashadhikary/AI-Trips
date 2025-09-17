import React, { useState } from "react";
import Button from "@mui/material/Button";
import { SelectBudgetList, SelectTravelsList } from "../constants/Options";
import locations from "../constants/Locations";
import { toast } from "react-toastify";
import { AI_PROMPT, chatSession } from "../service/AiModel";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore"; 


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    place: "",
    days: "",
    travelWith: "",
    budget: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  // handle change for text inputs
  const handleChange = (field, value) => {
    if (field === "days" && value > 30) {
      toast("Please choose between 1-30 days");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // handle submit
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (
      formData.place === "" ||
      formData.days === "" ||
      formData.budget === "" ||
      formData.travelWith === ""
    ) {
      toast("Please fill all the fields");
      return;
    } else if (!user) {
      setOpenDialog(true);
    }

    setIsLoading(true);

    // console.log("Form Data:", formData);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.place)
      .replace("{days}", formData?.days)
      .replace("{groupType}", formData?.travelWith)
      .replace("{budgetTier}", formData?.budget);

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setIsLoading(false);
    AITripztoDB(result?.response?.text());
  };

  const AITripztoDB = async (tripData) => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"))

    const docID = Date.now().toString();

    // Add a new document named "docID" in collection "AITrips"
    await setDoc(doc(db, "AITrips", docID), {
      userChoise : formData,
      tripData : JSON.parse(tripData),
      userEmail : user?.email,
      id: docID
    });
    setIsLoading(false);
    navigate(`/view-trip/${docID}`)
  };

  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const handleClose = () => {
    setOpenDialog(false);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h1 className="font-semibold text-3xl">
        Tell us your travel preferences
      </h1>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information and our trip planner will generate
        an outstanding itinerary based on your preferences
      </p>

      {/* Destination */}
      <div>
        <h2 className="text-xl my-3 font-medium">What is your destination?</h2>
        <input
          type="text"
          list="locationList"
          value={formData.place}
          placeholder="Ex. Delhi"
          onChange={(e) => handleChange("place", e.target.value)}
          className="p-2 border border-black rounded-2xl w-1/4 mt-2"
        />
        <datalist id="locationList">
          {locations.map((loc) => (
            <option key={loc.id} value={loc.name} />
          ))}
        </datalist>
      </div>

      {/* Days */}
      <div className="mt-4 flex flex-col">
        <h1 className="text-xl my-3 font-medium">How many days?</h1>
        <input
          value={formData.days}
          onChange={(e) => handleChange("days", e.target.value)}
          className="p-2 border border-black rounded-2xl w-1/4 mt-2"
          placeholder="Ex. 3"
        />
      </div>

      {/* Travel With */}
      <div className="flex flex-col mt-4">
        <h1 className="text-xl my-3 font-medium">
          With whom do you want to travel?
        </h1>
        <div className="grid grid-cols-4 gap-2">
          {SelectTravelsList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChange("travelWith", item.prople)}
              className={`border border-black p-1 cursor-pointer text-center rounded-2xl hover:shadow-2xl ${
                formData.travelWith === item.prople ? "border-green-500" : ""
              }`}
            >
              <p className="font-semibold">{item.title}</p>
              <p>{item.prople}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="flex flex-col mt-4">
        <h1 className="text-xl my-3 font-medium">What is your budget?</h1>
        <div className="grid grid-cols-4 gap-2">
          {SelectBudgetList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChange("budget", item.title)}
              className={`border border-black p-4 cursor-pointer text-center rounded-2xl hover:shadow-2xl ${
                formData.budget === item.title ? "border-green-500" : ""
              }`}
            >
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex mt-10 justify-around">
        <Button
          disabled={isLoading} 
          variant="contained"
          onClick={onGenerateTrip}
          className="text-green-700 px-10 py-3 border rounded-2xl border-green-300 cursor-pointer shadow-2xs mb-10 transition-transform duration-300 hover:scale-105 hover:bg-green-100"
        >
          {isLoading? "Loading" : "Generate Trip"}
        </Button>
      </div>

      {openDialog && (
        <>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <DialogContentText>
                You are not authenticated. Please sign in with google
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={() => handleLogin()}>
                Sign In
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default CreateTrip;
