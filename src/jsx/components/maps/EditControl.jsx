import React, { useEffect, useRef, useState } from "react";
import { FeatureGroup, Circle, Polygon, Polyline, Marker } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useParams } from "react-router-dom";

export default function EditControlFC({
  points,
  polygon,
  lineString,
  circles,
  defaultValues,
  setValues,
}) {
  const ref = useRef(null);
  const { id } = useParams();
  const [Layer, setLayer] = useState([]);


  useEffect(() => {
    if (id && defaultValues?.location) {
      setLayer([...defaultValues?.location]);
    }
  },[defaultValues]);

  const editChange = (e) => {
    console.log(e)
    // if (layerType === "circle") {
    //   const newCenter = [layer._latlng.lat, layer._latlng.lng];
    //   const newRadius = layer._mRadius;
    //   console.log(newCenter , newRadius)
    // }
    // const { _latlng } = layer;
    // if (layerType === "circle") {
    //   const data = [
    //     {
    //       type: "Circle",
    //       coordinates: [_latlng.lat, _latlng.lng],
    //       duration: layer._mRadius,
    //     },
    //   ];
    //   console.log(data)
    //   setLayer((lay) => [...lay, ...data]);
    // } else if (layerType === "polygon") {
    //   const coordinates = layer._latlngs[0].map((coords) => [
    //     coords.lat,
    //     coords.lng,
    //   ]);
    //   console.log(coordinates);
    //   setLayer((lay) => [
    //     ...polygon,
    //     ...lay,
    //     {
    //       type: "Polygon",
    //       coordinates: coordinates,
    //     },
    //   ]);
    // } else if (layerType === "marker") {
    //   setLayer((lay) => [
    //     ...points,
    //     ...lay,
    //     {
    //       type: "Point",
    //       coordinates: [layer._latlng.lat, layer._latlng.lng],
    //     },
    //   ]);
    // } else if (layerType === "polyline") {
    //   const coordinates = layer._latlngs.map((coords) => [
    //     coords.lat,
    //     coords.lng,
    //   ]);
    //   setLayer((lay) => [
    //     ...lineString,
    //     ...lay,
    //     {
    //       type: "LineString",
    //       coordinates: coordinates,
    //     },
    //   ]);
    // }
  };

  const deleteHandle = (e) => {
    console.log(e)
    setLayer([])
    setValues("location", null);
  };

  const onCreatedhandler = (e) => {
    const { layerType, layer } = e;
    const { _latlng } = layer;
    if (layerType === "circle") {
      const data = {
        type: "Circle",
        coordinates: [_latlng.lat, _latlng.lng],
        duration: layer._mRadius,
      };
      console.log(data)
      setLayer((lay) => [...lay, data]);

    } else if (layerType === "polygon") {
      const coordinates = layer._latlngs[0].map((coords) => [
        coords.lat,
        coords.lng,
      ]);
      setLayer((lay) => [
        ...lay,
        {
          type: "Polygon",
          coordinates: coordinates,
        },
      ]);
    } else if (layerType === "marker") {
      setLayer((lay) => [
        ...points,
        ...lay,
        {
          type: "Point",
          coordinates: [layer._latlng.lat, layer._latlng.lng],
        },
      ]);
    } else if (layerType === "polyline") {
      const coordinates = layer._latlngs.map((coords) => [
        coords.lat,
        coords.lng,
      ]);
      setLayer((lay) => [
        ...lay,
        {
          type: "LineString",
          coordinates: coordinates,
        },
      ]);
    }
  };

  useEffect(() => {
    if (Layer.length === 0) {
      setValues("location", null);
      return;
    }
    setValues("location", Layer);
  }, [Layer.length]);
console.log(lineString)

  return (
    <FeatureGroup ref={ref}>
      {circles?.map((circle, index) => (
        <Circle
          key={index}
          center={circle.coordinates}
          radius={circle?.duration}
        ></Circle>
      ))}
      {points?.map((point, index) => {
        return <Marker key={index} position={point.coordinates}></Marker>;
      })}

      {polygon?.map((poly, index) => (
        <Polygon
          key={index}
          
          pathOptions={{ color: "#3388FF" }}
          positions={poly.coordinates}
        ></Polygon>
      ))}

      {lineString?.map((line, index) => (
        <Polyline
          key={index}
          editable
          // pathOptions={{ color: "#3388FF",  weight : "4"}}
          positions={line.coordinates}
          path={line.coordinates}
          // positions={[
          //   [25.237136826291625, 55.28349608054715],
          //   [25.222306746512636, 55.26245663929878],
          //   [25.22028785234644, 55.266149275926054],
          //  ]}

        ></Polyline>
      ))}

      {/* <Circle center={[25.2233, 55.2869]} radius={1000} /> */}
      <EditControl
        position="topright"
        onEdited={editChange}
        onCreated={onCreatedhandler}
        onDeleted={deleteHandle}
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
