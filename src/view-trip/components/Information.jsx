import Button from "@mui/material/Button";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import { useEffect, useState } from "react";


const Information = ({ trip }) => {
  const FALLBACK = "/travell.jpg"; // must be inside /public

  const [src, setSrc] = useState(FALLBACK);

  useEffect(() => {
    if (trip?.userChoise?.place) {
      getPlacePhoto();
    }
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userChoise?.place,
    };

    try {
      const res = await GetPlaceDetails(data);
      console.log("Google Places API result:", res.data);

      // Safe checks
      const places = res.data.places;
      if (places && places.length > 0) {
        const photos = places[0].photos;
        if (photos && photos.length > 0) {
          const photoName = photos[0].name; // first photo
          const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
          setSrc(photoUrl);
          return;
        }
      }

      // If no photo found, fallback
      setSrc(FALLBACK);
    } catch (error) {
      console.error("Google Places API error:", error.response?.data || error);
      setSrc(FALLBACK);
    }
  };

  return (
    <div>
      {/* Image with fallback */}
      <img
        src={src}
        alt="travell"
        onError={(e) => {
          console.log("Image load failed, original src:", e.currentTarget.src);
          e.currentTarget.onerror = null; // prevent loops
          setSrc(FALLBACK);
        }}
        className="h-[340px] w-full object-cover rounded-2xl"
      />

      {/* Info Section */}
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-3">
          <h2 className="font-bold text-2xl">{trip?.userChoise?.place}</h2>
          <div className="flex items-center gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              👥 {trip?.userChoise?.travelWith}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🗓️ {trip?.userChoise?.days} days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userChoise?.budget} budget
            </h2>
          </div>
        </div>

        {/* Share button with tooltip */}
        <Button variant="contained" className="relative group">
          <IoIosSend />
          <span
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                   px-2 py-1 text-xs text-white bg-gray-800 rounded-md 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Share
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Information;
