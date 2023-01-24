import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import Maps from "../../components/Maps";
import "./HomePage.css";
import SearchPage from "../../components/SearchBar";
import PropertyCard from "../../components/PropertyCard";
import Footer from "../../components/Footer";
import MyMap from "../../components/MyMap/MyMap";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
mapboxgl.accessToken =
  "pk.eyJ1IjoidW5kZXI4Njc5IiwiYSI6ImNsY3ZudWhmcjAzYnEzb3BoZHV0bjczc3UifQ._LGzT_f5pMq7-OBSXmb3OA";
function HomePage() {
  const [properties, setProperties] = useState([]);
  const token = useSelector(selectCurrentToken);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(74.8436891311305);
  const [lat, setLat] = useState(22.593023268136676);
  const [coordinates, setCoordinates] = useState([]);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    console.log("hii");
    getPropertyData();
  }, [token]);
  const getPropertyData = async () => {
    console.log("token is:", token);
    const result = await axios.get("http://localhost:4000/property", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("result is", result.data.properties);
    //  setUserData(result.data.user);
    setProperties(result.data.properties);
  };
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // var createGeoJSONCircle = function (center, radiusInKm, points) {
    //   console.log("inside createGeoJSONCircle");
    //   if (!points) points = 64;

    //   var coords = {
    //     latitude: center[1],
    //     longitude: center[0],
    //   };

    //   var km = radiusInKm;

    //   var ret = [];
    //   var distanceX =
    //     km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    //   var distanceY = km / 110.574;

    //   var theta, x, y;
    //   for (var i = 0; i < points; i++) {
    //     theta = (i / points) * (2 * Math.PI);
    //     x = distanceX * Math.cos(theta);
    //     y = distanceY * Math.sin(theta);

    //     ret.push([coords.longitude + x, coords.latitude + y]);
    //   }
    //   ret.push(ret[0]);

    //   return {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [
    //         {
    //           type: "Feature",
    //           geometry: {
    //             type: "Polygon",
    //             coordinates: [ret],
    //           },
    //         },
    //       ],
    //     },
    //   };
    // };
    // map.current.addSource(
    //   "polygon",
    //   createGeoJSONCircle([-93.6248586, 41.58527859], 0.5)
    // );

    // map.current.addLayer({
    //   id: "map",
    //   type: "fill",
    //   source: "polygon",
    //   layout: {},
    //   paint: {
    //     "fill-color": "blue",
    //     "fill-opacity": 0.6,
    //   },
    // });
    // map.current.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true,
    //     },
    //     // When active the map will receive updates to the device's location as it changes.
    //     trackUserLocation: true,
    //     // Draw an arrow next to the location dot to indicate which direction the device is heading.
    //     showUserHeading: true,
    //   })
    // );
  }, []);
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng);
      setLat(map.current.getCenter().lat);
      setZoom(map.current.getZoom().toFixed(2));
    });
    // const marker = new mapboxgl.Marker();

    // function add_marker(event) {
    // const coordinates = event.lngLat;
    // console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
    // marker.setLngLat(coordinates).addTo(map.current);
    // setLat(event.lngLat.lat);
    // setLng(coordinates.lng);
    // console.log("lng state", lng, "lat state:", lat);
    // }
    if (coordinates.length > 0) {
      new mapboxgl.Marker().setLngLat(coordinates).addTo(map.current);
    }

    // map.current.on("mousemove", (e) => {
    //   document.getElementById("info").innerHTML =
    //     // `e.point` is the x, y coordinates of the `mousemove` event
    //     // relative to the top-left corner of the map.
    //     JSON.stringify(e.point) +
    //     "<br />" +
    //     // `e.lngLat` is the longitude, latitude geographical position of the event.
    //     JSON.stringify(e.lngLat.wrap());
    // });
  }, [coordinates]);
  function addGeo() {
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    useEffect(() => {
      //map.on("load", function () {
      //let _center = turf.point([longitude, latitude]);
      // let _radius = 25;
      // let _options = {
      //   steps: 80,
      //   units: "kilometers", // or "mile"
      // };
      // let _circle = turf.circle(coordinates, _radius, _options);
      // map.current.addSource("circleData", {
      //   type: "geojson",
      //   data: _circle,
      // });
      // map.current.addLayer({
      //   id: "circle-fill",
      //   type: "fill",
      //   source: "circleData",
      //   paint: {
      //     "fill-color": "yellow",
      //     "fill-opacity": 0.8,
      //   },
      // });
      //}
      // );
    }, []);

    // function MapboxGeocoder(options) {
    //   this._eventEmitter = new EventEmitter();
    //   this.options = extend({}, this.options, options);
    //   this.inputString = "";
    //   this.fresh = true;
    //   this.lastSelected = null;
    //   this.geolocation = new Geolocation();
    // }

    // MapboxGeocoder.prototype = {
    //   options: {
    //     zoom: 16,
    //     flyTo: true,
    //     trackProximity: true,
    //     minLength: 2,
    //     reverseGeocode: false,
    //     flipCoordinates: false,
    //     limit: 5,
    //     origin: "https://api.mapbox.com",
    //     enableEventLogging: true,
    //     marker: true,
    //     mapboxgl: null,
    //     collapsed: false,
    //     clearAndBlurOnEsc: false,
    //     clearOnBlur: false,
    //     enableGeolocation: false,
    //     addressAccuracy: "street",
    //     getItemValue: function (item) {
    //       return item.place_name;
    //     },
    //     render: function (item) {
    //       var placeName = item.place_name.split(",");
    //       return (
    //         '<div class="mapboxgl-ctrl-geocoder--suggestion"><div class="mapboxgl-ctrl-geocoder--suggestion-title">' +
    //         placeName[0] +
    //         '</div><div class="mapboxgl-ctrl-geocoder--suggestion-address">' +
    //         placeName.splice(1, placeName.length).join(",") +
    //         "</div></div>"
    //       );
    //     },
    //   },
    // };
    // var geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
    // geocoder.addTo("#geocoder-container");
  }
  return (
    <div className="w-full">
      <NavBar />
      <div className="homeBg bg-[url('homebg.jpg')] bg-cover bg-center h-screen flex justify-center items-center">
        <SearchPage
          addGeo={addGeo}
          setCoordinates={setCoordinates}
        />
      </div>
      <div
        className="w-full"
        id="map">
        {/* <MyMap /> */}
        <div className="relative">
          <div
            className="sidebar "
            // onClick={changeMap}
          >
            {/* Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}
          </div>
          <pre id="info"></pre>
          <div
            ref={mapContainer}
            className="h-96"
          />
        </div>
      </div>
      <div className="w-full bg-slate-700">
        <div className="flex justify-between item-center h-16 max-w-[1240px] mx-auto px-4">
          {/* <h1 class="text-3xl font-bold underline">Hello world!</h1> */}
          <h1 className="font-bold text-3xl mt-2 text-white">Sort Options</h1>
          <ul className="hidden md:flex ">
            <li className="p-4">Home</li>
            <li className="p-4">Property Type</li>
            <li className="p-4">Listing Type</li>
            <li className="p-4">Chats</li>
            <li className="p-4">Wishlist</li>
          </ul>
        </div>
      </div>
      {/* <div className=" max-w-[1400px] ml-10 mx-auto  bg-slate-700 grid grid-col-3 grid-flow-col">
        <div className="bg-white  w-[350px] flex items-center flex-col ">
          <div className=" text-2xl font-Jost font-semibold">
            Property For Rent
          </div>
          <div className="font-Jost text-sm">123 street ,NewYork ,USA</div>
          <div className=" container bg-[url('login2.jpg')] h-60 w-80 bg-center bg-cover"></div>
        </div>
        <div className="bg-white  w-[350px] flex items-center flex-col ">
          <div className=" text-2xl font-Jost font-semibold">
            Property For Rent
          </div>
          <div className="font-Jost text-sm">123 street ,NewYork ,USA</div>
          <div className=" container bg-[url('login2.jpg')] h-60 w-80 bg-center bg-cover"></div>
        </div>
        <div className="bg-white  w-[350px] flex items-center flex-col ">
          <div className=" text-2xl font-Jost font-semibold">
            Property For Rent
          </div>
          <div className="font-Jost text-sm">123 street ,NewYork ,USA</div>
          <div className="container bg-[url('login2.jpg')] h-60 w-80 bg-center bg-cover"></div>
        </div>
      </div> */}
      <div className="w-full bg-slate-700">
        <div className="w-[80%] mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {properties &&
            properties.map((property) => {
              return (
                <Link
                  to={{
                    pathname: `/propertyDetails/${property._id}`,
                    property: { property },
                  }}>
                  <PropertyCard
                    key={property._id}
                    property={property}
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
      <div className="bg-slate-900">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
