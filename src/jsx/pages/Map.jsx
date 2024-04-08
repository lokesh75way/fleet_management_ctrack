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

const Map = ({ geofenceHanlder, setValue, getValues, defaultValues }) => {
  const [lineString , setLineString] = useState([]);
  const [points, setPoints] = useState([]);
  const [circles, setCircles] = useState([]);
  const [polygon, setPolygon] = useState([]);
  const [geojson, setGeojson] = React.useState({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {
    if (defaultValues?.location) {
      defaultValues?.location.map((loc) => {
        if (loc.type === "Circle") {
          setCircles((prev) => [
            {
              type: loc?.type,
              coordinates: loc?.coordinates.reverse(),
              duration: loc?.duration,
            },
          ]);
        }
        if (loc.type === "Polygon") {
          const coords = loc.coordinates.map((cor) =>
            cor.map((c) => c.reverse())
          );
          setPolygon((prev) => [
            {
              type: loc.type,
              coordinates: coords,
            },
          ]);
        }

        if (loc.type === "Point") {
          setPoints((prev) => [
            {
              type: loc.type,
              coordinates: loc.coordinates.reverse(),
            },
          ]);
        }
        console.log(loc);

        if (loc.type === "LineString") {
          const coords = loc.coordinates.map((cor) =>
           cor.reverse()
          );
          setLineString((prev) => [
            {
              type: loc.type,
              coordinates:coords,
            },
          ]);
        }
      });
    }
  }, [defaultValues]);

  return (
    <div
      style={{
        display: "flex",
        height: "85vh",
        border: !getValues("location") ? "3px solid #ff5e5e" : null,
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
          {points.map((point, index) => {
            return (
              <Marker
                key={index}
                styles={{ background: "red" }}
                position={point.coordinates}
              ></Marker>
            );
          })}
          <EditControlFC
            geojson={geojson}
            setGeojson={setGeojson}
            geofenceHanlder={geofenceHanlder}
            setValue={setValue}
          />
          {circles?.map((circle, index) => (
            <Circle
              key={index}
              center={circle.coordinates}
              radius={circle?.duration}
            ></Circle>
          ))}

          {polygon?.map((poly, index) => (
            <Polygon
              key={index}
              pathOptions={{ color: '#3388FF' }}
              positions={poly.coordinates}
            ></Polygon>
          ))}

          {
            lineString?.map((line,index)=>(
              <Polyline
              key={index}
              pathOptions={{ color: '#3388FF' }}
              positions={line.coordinates}
            ></Polyline>
            ))
          }
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
