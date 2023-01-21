import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./PropertyMap.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidW5kZXI4Njc5IiwiYSI6ImNsY3ZudWhmcjAzYnEzb3BoZHV0bjczc3UifQ._LGzT_f5pMq7-OBSXmb3OA";

export default function PropertyMap({ longitude, lattitude, zoom }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [zm, setZm] = useState();
  useEffect(() => {
    setLat(lattitude);
    setLng(longitude);
    setZm(zoom);
  }, [longitude]);

  //   console.log("Lng:", longitude, "Lat:", lattitude);

  useEffect(() => {
    //   console.log("use ef Lng:", longitude, "useF Lat:", lattitude);
    //   console.log("typee", typeof lattitude);
    //console.log("use ef Lng:", longitude, "useF Lat:", lattitude);

    if (map.current) return; // initialize map only once
    if (lat) {
      console.log("hiii89");
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true,
        })
      );
      // map.current.addControl(
      //   new MapboxGeocoder({
      //     accessToken: mapboxgl.accessToken,
      //     mapboxgl: mapboxgl,
      //   })
      // );
      let newLat = parseFloat(longitude).toFixed(4);
      //  console.log("parsed lat");
      let newLong = parseFloat(lattitude).toFixed(4);
      //  console.log("parsed lpng");
      const coordinates = [newLat, newLong];
      console.log("cordiiiii", coordinates);
      new mapboxgl.Marker().setLngLat(coordinates).addTo(map.current);
    }
  }, [lat]);
  console.log("new lat", lat, "new lng", lng);
  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   // map.current.on("move", () => {
  //   //   setLng(map.current.getCenter().lng);
  //   //   setLat(map.current.getCenter().lat);
  //   //   setZoom(map.current.getZoom().toFixed(2));
  //   // });
  //   const marker = new mapboxgl.Marker();
  //   console.log("defined lat", lat, "new lng", lng);
  //   function add_marker(event) {
  //     console.log("inside marker");
  // let newLat = parseFloat(longitude);
  // console.log("parsed lat");
  // let newLong = parseFloat(lattitude);
  // console.log("parsed lpng");
  // const coordinates = { lng, lat };

  //     console.log("coordinates 1", coordinates);
  //     //console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
  //     marker.setLngLat(coordinates).addTo(map.current);
  //     //   setLat(event.lngLat.lat);
  //     //   setLng(coordinates.lng);
  //     // console.log("lng state", lng, "lat state:", lat);
  //   }
  //   map.current.on("click", add_marker);

  //   // map.current.on("mousemove", (e) => {
  //   //   document.getElementById("info").innerHTML =
  //   //     // `e.point` is the x, y coordinates of the `mousemove` event
  //   //     // relative to the top-left corner of the map.
  //   //     JSON.stringify(e.point) +
  //   //     "<br />" +
  //   //     // `e.lngLat` is the longitude, latitude geographical position of the event.
  //   //     JSON.stringify(e.lngLat.wrap());
  //   // });
  // }, [longitude]);

  return (
    <div className="relative">
      <div
        className="sidebar "
        // onClick={changeMap}
      >
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <pre id="info"></pre>
      <div
        ref={mapContainer}
        className="h-96"
      />
    </div>
  );
}
