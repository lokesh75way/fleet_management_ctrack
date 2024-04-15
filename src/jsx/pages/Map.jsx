import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import EditControlFC from "../components/maps/EditControl";

const Map = ({ geofenceHanlder, setValue, watch, getValues, errors }) => {
  const [geojson, setGeojson] = React.useState({
    type: "FeatureCollection",
    features: [],
  });
  const mapId = watch("location")?.length ?? 0;

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
            key={mapId}
            setValues={setValue}
            geofenceHanlder={geofenceHanlder}
            watch={watch}
            getValues={getValues}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
