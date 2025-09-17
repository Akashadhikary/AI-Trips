import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate();

    const navigateToBasicTripPlan = () => {
        navigate("/create-trip")
    }

  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-bold text-[50px] text-center mt-15">
        <span className="text-orange-400">
          Discover Your Next Adventure with AI:{" "}
        </span>{" "}
        Personalized Itineraries at Your FingerTips
      </h1>
      <p className="border rounded-2xl border-amber-100 p-5 font-semibold">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Button
        variant="contained"
        className="text-green-400 px-10 py-3 border rounded-2xl border-black cursor-pointer shadow-2xs mb-10 transition-transform duration-300 
                   hover:scale-105 hover:bg-green-100"
        onClick={navigateToBasicTripPlan}
      >
        Get Started, Its Free
      </Button>
    </div>
  );
};

export default Hero;
