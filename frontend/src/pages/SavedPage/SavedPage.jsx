import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import PropertyCard from "../../components/PropertyCard";
import { selectCurrentToken } from "../../features/auth/authSlice";
import axios from "axios";
import { Link } from "react-router-dom";
function SavedPage() {
  const [savedProperties, setSavedProperties] = useState([]);
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    getSavedData();
    console.log("hii");
  }, []);
  const getSavedData = async () => {
    console.log("token is:", token);
    const result = await axios.get("http://localhost:4000/saved", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("result is", result.data.saved.Items);
    setSavedProperties(result.data.saved.Items);
    // setUserData(result.data.user);
  };

  return (
    <div className="w-full">
      <NavBar />
      <div className="w-full flex flex-col  mt-4">
        <div className="mt-4 flex items-center justify-center font-Jost font-bold text-3xl">
          <h1 className="border-b border-black">SAVED</h1>
        </div>
        <div className="w-[80%] mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-6">
          {savedProperties &&
            savedProperties.map((property) => {
              return (
                <Link
                  to={{
                    pathname: `/propertyDetails/${property.propertyId._id}`,
                  }}>
                  <PropertyCard
                    key={property.propertyId._id}
                    property={property.propertyId}
                  />
                </Link>
              );
            })}
          {/* <PropertyCard />
          <PropertyCard />

          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard /> */}
          {/* <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div> */}
        </div>
      </div>
    </div>
  );
}

export default SavedPage;
