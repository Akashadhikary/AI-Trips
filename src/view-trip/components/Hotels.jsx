import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";

const Hotels = ({ hotels }) => {
  //console.log("hotels", hotels.hotels);

  const FALLBACK = "/hotel.jpeg"; // must be inside /public

  const [src, setSrc] = useState(FALLBACK);

  useEffect(() => {
    hotels && getPlacePhoto()
  }, [hotels]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: hotels?.hotels?.hotel?.hotelName,
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
      <h2 className="font-bold text-xl mt-5">Hotel Recomendations</h2>

      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-5 ">
        {hotels?.hotels?.map((hotel, i) => (
          <Link
            target="_blank"
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName}&${hotel?.address}`}
          >
            <div
              className="bg-amber-50 rounded-2xl hover:scale-105 cursor-pointer transition-all shadow-blue-400 p-5"
              key={i}
            >
              <img
                src={src}
                alt="Hotel"
                onError={(e) => {
                  console.log(
                    "Image load failed, original src:",
                    e.currentTarget.src
                  );
                  e.currentTarget.onerror = null; // prevent loops
                  setSrc(FALLBACK);
                }}
                className="rounded-3xl"
              />
              <div className="my-2 flex flex-col gap-1.5">
                <h2 className="font-medium text-xl">🏠 {hotel?.hotelName}</h2>
                <h4 className="font-light text-gray-400">
                  📍 {hotel?.address}
                </h4>
                <h3>💰 {hotel?.price}$ per night</h3>
                <h3>⭐ {hotel?.rating}/5</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
