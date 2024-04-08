import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

export default function EditControlFC({
  geojson,
  setGeojson,
  geofenceHanlder,
  setValue,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current?.getLayers().length === 0 && geojson) {
      L.geoJSON(geojson).eachLayer((layer) => {
        if (
          layer instanceof L.Polyline ||
          layer instanceof L.Polygon ||
          layer instanceof L.Marker
        ) {
          if (layer?.feature?.properties.radius && ref.current) {
            new L.Circle(layer.feature.geometry.coordinates.slice().reverse(), {
              radius: layer.feature?.properties.radius,
            }).addTo(ref.current);
          } else {
            ref.current?.addLayer(layer);
          }
        }
      });
    }
  }, [geojson]);

  const handleChange = () => {
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === "FeatureCollection") {
      setGeojson(geo);
    }
  };
  const onCreatedhandler = (e) => {
    if(e.layerType === 'circle'){
      const geo = ref.current?.toGeoJSON();
      const data = geo.features.map((loc) => ({
        type: 'Circle',
        coordinates: loc.geometry.coordinates,
        duration : e.layer._mRadius
      }));
      setValue("location", data);
    }else{

      const geo = ref.current?.toGeoJSON();
      const data = geo.features.map((loc) => ({
        type: loc.geometry.type,
        coordinates: loc.geometry.coordinates,
      }));
      setValue("location", data);
    }
   
  };

  return (
    <FeatureGroup ref={ref}>
      <EditControl
        position="topright"
        onEdited={handleChange}
        onCreated={onCreatedhandler}
        onDeleted={handleChange}
        draw={{
          rectangle: false,
          circle: true,
          polyline: true,
          polygon: true,
          marker: true,
          circlemarker: false,
        }}
      />
    </FeatureGroup>
  );
}
