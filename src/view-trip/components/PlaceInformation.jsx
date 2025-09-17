import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaceInformation = ({ place }) => {
  return (
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md">
      <img
        src={place.placeImageUrl}
        alt="place image not available"
        className="w-[130px] h-[130px] rounded-xl"
      />
      <div>
        <h2 className="font-bold text-lg">{place.placeName}</h2>
        <p className="text-sm text-gray-400">{place.placeDetails}</p>
        <h2 className="mt-2 font-bold">
          Avarage travel time:{" "}
          <span className="text-gray-400">{place.travelTimeMinutes} Mins.</span>
        </h2>
        <h2 className="font-bold">
          Ticket Price: <span className="text-gray-400">{place?.amount}$</span>
        </h2>
        <h2>Rating: {place.rating}/ 5</h2>
        <Link
          target="_blank"
          to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}+${place?.geo?.lat},${place?.geo?.lng}`}
        >
          <button className="text-3xl mt-2 cursor-pointer relative group">
            <FaMapLocationDot />

            {/* Tooltip */}
          <span
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                   px-2 py-1 text-xs text-white bg-gray-500 rounded-md 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Click for Location
          </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceInformation;
