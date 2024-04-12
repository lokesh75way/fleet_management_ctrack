import L from 'react-leaflet-draw'
import React, { useEffect, useRef, useState } from "react";
import { FeatureGroup, Circle, Polygon, Polyline, Marker } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useParams } from "react-router-dom";

export default function EditControlFC({ watch, setValues, getValues }) {
  const ref = useRef(null);
  const { id } = useParams();
  const [circles, setCircles] = useState([]);
  const [lineString, setLineString] = useState([]);
  const [polygon, setPolygon] = useState([]);
  const [points, setPoints] = useState([]);
  const watchedValues = watch("location");

  // const [polygonVertices, setPolygonVertices] = useState([]);

  // const poly = [
  //   {
  //     type: "Feature",
  //     properties: {},
  //     geometry: {
  //       type: "Polygon",
  //       coordinates: [
  //         [25.233565349394524, 55.29474574096975],
  //         [25.216560585142492, 55.298524208285514],
  //         [25.220598463683125, 55.30848573965209],
  //         [25.22859617357562, 55.30290384707602]
  //       ]
  //     },
  //   },
  //   {
  //     type: "Feature",
  //     properties: {},
  //     geometry: {
  //       type: "Polygon",
  //       coordinates: [
  //         [25.233565349394524, 55.29474574096975],
  //         [25.216560585142492, 55.298524208285514],
  //         [25.220598463683125, 55.30848573965209],
  //         [25.22859617357562, 55.30290384707602]
  //       ]
  //     },
  //   },
  // ];

  const setShapes = () => {
    const values = getValues("location");
    setCircles([]);
    setPoints([]);
    setPolygon([]);
    setLineString([]);
    values?.map((loc) => {
      if (loc.type === "Circle") {
        setCircles((prev) => [...prev, loc]);
      }
      if (loc.type === "Polygon") {
        setPolygon((prev) => [...prev, loc]);
      }

      if (loc.type === "Point") {
        setPoints((prev) => [...prev, loc]);
      }

      if (loc.type === "LineString") {
        setLineString((prev) => [...prev, loc]);
      }
    });
  };

  const editChange = (e) => {
    let mapLayer = getValues("location") ?? [];
    e.layers.eachLayer(({ editing, options }) => {
      mapLayer = mapLayer.map((l) => {
        if (options.id !== l.id) {
          return l;
        }
        if (l && l.type === "Polygon") {
          const coordinates = editing?.latlngs[0][0].map((coords) => {
            return [coords.lat, coords.lng];
          });
          return l.id === options.id ? { ...l, coordinates } : l;
        }
        if (l && l.type === "Circle") {
          const coordinates = [
            editing._shape._latlng.lat,
            editing._shape._latlng.lng,
          ];
          const duration = editing._shape._mRadius;
          return l.id === options.id ? { ...l, coordinates, duration } : l;
        }
        if (l && l.type === "LineString") {
          const coordinates = editing?.latlngs[0].map((coords) => {
            return [coords.lat, coords.lng];
          });
          return l.id === options.id ? { ...l, coordinates } : l;
        }
        if (l && l.type === "Point") {
          const coordinates = [
            editing._marker._latlng.lat,
            editing._marker._latlng.lng,
          ];
          return l.id === options.id ? { ...l, coordinates } : l;
        }
      });
      setValues("location", mapLayer);
    });
  };

  const deleteHandle = (e) => {
    let mapLayer = getValues("location") ?? [];
    e.layers.eachLayer((ly) => {
      mapLayer = mapLayer.filter((l) => l.id !== ly.options.id);
    });
    setValues("location", mapLayer);
  };

  const onCreatedhandler = (e) => {
    const { layerType, layer } = e;
    const { _latlng } = layer;
    let data = {};
    if (layerType === "circle") {
      data = {
        id: layer._leaflet_id,
        type: "Circle",
        coordinates: [_latlng.lat, _latlng.lng],
        duration: layer._mRadius,
      };
    } else if (layerType === "polygon") {
      const coordinates = layer._latlngs[0].map((coords) => [
        coords.lat,
        coords.lng,
      ]);
      data = {
        id: layer._leaflet_id,
        type: "Polygon",
        coordinates: coordinates,
      };
    } else if (layerType === "marker") {
      data = {
        type: "Point",
        id: layer._leaflet_id,
        coordinates: [layer._latlng.lat, layer._latlng.lng],
      };
    } else if (layerType === "polyline") {
      const coordinates = layer._latlngs.map((coords) => [
        coords.lat,
        coords.lng,
      ]);
      data = {
        id: layer._leaflet_id,
        type: "LineString",
        coordinates: coordinates,
      };
    }
    const values = getValues("location") ?? [];
    setValues("location", [...values, data]);
  };

  useEffect(() => {
    setShapes();
  }, [watchedValues]);

  return (
    <FeatureGroup ref={ref}>
      {circles?.map((circle, index) => (
        <Circle
          key={circle.id}
          center={circle.coordinates}
          radius={circle?.duration}
          id={circle.id}
        ></Circle>
      ))}
      {points?.map((point, index) => {
        return (
          <Marker
            id={point.id}
            key={point.id}
            position={point.coordinates}
          ></Marker>
        );
      })}

      {polygon?.map((poly, index) => (
        <Polygon
          id={poly.id}
          key={poly.id}
          pathOptions={{ color: "red" }}
          positions={poly.coordinates}
        ></Polygon>
      ))}

      {lineString?.map((line, index) => (
        <Polyline
          key={line.id}
          positions={line.coordinates}
          path={line.coordinates}
          id={line.id}
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
        edit={{ edit: true, remove: true }}
      />

      {/* {poly.map((coords, index) => (
        <GeoJSON key={index} data={coords} />
      ))} */}
    </FeatureGroup>
  );
}
