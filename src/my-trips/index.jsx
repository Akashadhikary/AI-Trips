import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import UserTrips from "./components/UserTrips";

const MyTrips = () => {

  const [userTrips, setUserTrips] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }    
    setUserTrips([]);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev => [...prev, doc.data()]);
    });
  };
 
  return <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
    <h2 className="font-bold text-3xl">My Trips</h2>
    <div className="grid mt-3 grid-cols-2 md:grid-cols-3 gap-3">
      {
        userTrips.map((trip, index) => (
          <UserTrips trip={trip} key={index}/>
          // <div>
          //   <h1>{trip.userChoise.days}</h1>
          // </div>
        ))
      }
    </div>
  </div>;
};

export default MyTrips;
