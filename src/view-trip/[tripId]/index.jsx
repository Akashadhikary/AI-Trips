import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../service/firebaseConfig";
import Information from "../components/Information";
import Hotels from "../components/Hotels";
import DailyPlan from "../components/DailyPlan";
import Footer from "../components/Footer";

const ViewTrip = () => {
  //this {tripId} should be same as [tipId] from the folder name
  const { tripId } = useParams();
  const [tripDetails, setTripDetails] = useState([]);

  useEffect(() => {
    getTripData(tripId);
  }, [tripId]);

  const getTripData = async (tripId) => {
    if (!tripId) {
      console.error("tripId is missing");
      return;
    }

    const dbRef = doc(db, "AITrips", tripId);
    const dbSnap = await getDoc(dbRef);

    if (dbSnap.exists()) {
      console.log("trip details", dbSnap.data());
      setTripDetails(dbSnap.data());
    } else {
      toast("No Trip details found");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <Information trip={tripDetails} />

      <Hotels hotels={tripDetails.tripData}/>

      <DailyPlan plans={tripDetails.tripData}/>

      <Footer/>
    </div>
  );
};

export default ViewTrip;
