import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Circle,
  Polygon,
  Polyline,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import EditControlFC from "../components/maps/EditControl";

const Map = ({ geofenceHanlder, setValue, getValues, defaultValues ,errors}) => {
  const [lineString, setLineString] = useState([]);
  const [points, setPoints] = useState([]);
  const [circles, setCircles] = useState([]);
  const [polygon, setPolygon] = useState([]);
  const [geojson, setGeojson] = React.useState({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {
    if (defaultValues?.location) {
      setLineString([])
      setCircles([]);
      setPoints([]);
      setPolygon([]);
      defaultValues?.location.map((loc) => {
        if (loc.type === "Circle") {
          setCircles((prev) => [...prev, loc]);
        }
        if (loc.type === "Polygon") {
          setPolygon((prev) => [...prev,
            {
              type: loc.type,
              coordinates: loc.coordinates,
            },
          ]);
        }

        if (loc.type === "Point") {
          setPoints((prev) => [...prev, loc]);
        }

        if (loc.type === "LineString") {
          setLineString((prev) => [...prev, loc]);
        }
      });
    }
   
  }, [defaultValues]);

  return (
    <div
      style={{
        display: "flex",
        height: "85vh",
        border: errors.location ? "3px solid #ff5e5e" : null,
      }}
    >
      <div style={{ width: "100%" }}>
        <MapContainer center={[25.2233, 55.2869]} zoom={14} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker styles={{ background: "red" }} position={[25.2233, 55.2869]}>
            <Popup>Dubai Trade Center</Popup>
            <Tooltip>Dubai Trade Center</Tooltip>
          </Marker>
        
          <EditControlFC
            points={points}
            lineString={lineString}
            circles={circles}
            polygon={polygon}
            setValues={setValue}
            geofenceHanlder={geofenceHanlder}
            defaultValues={defaultValues}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
