import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserTrips = ({ trip }) => {
  const tripid = useParams();
  const navigate = useNavigate();

  console.log(tripid);

  return (
    // <Link to={"view-trip/:tripId"}>
    <div className="mb-5 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all" onClick={() => navigate(`/view-trip/${trip.id}`)}>
      <img src="travell.jpg" className="object-cover rounded-xl"></img>
      <div>
        <h1 className="font-bold text-xl">{trip.userChoise.place}</h1>
        <h2 className="text-sm text-gray-500">
          {trip.userChoise.days} days trip with {trip.userChoise.travelWith}
        </h2>
        <h2 className="text-sm text-gray-500">
          {trip.userChoise.budget} package
        </h2>
      </div>
    </div>
    // </Link>
  );
};

export default UserTrips;
