import L from 'react-leaflet-draw'
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FeatureGroup,
  Circle,
  Polygon,
  Polyline,
  Marker,
  GeoJSON,
} from "react-leaflet";
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
  const [mapLayer, setmapLayer] = useState([]);
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

  useEffect(() => {
    if (id && defaultValues?.location) {
      setmapLayer([...defaultValues?.location]);
    }
  }, [defaultValues]);

  const editChange = (e) => {
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      // console.log(_leaflet_id);
      setmapLayer((layers) =>
        mapLayer.map((l) => {
          if (_leaflet_id !== l.id) {
            return l;
          }
          if (l && l.type === "Polygon") {
            const coordinates = editing?.latlngs[0][0].map((coords) => {
              return [coords.lat, coords.lng];
            });
            return l.id === _leaflet_id ? { ...l, coordinates } : l;
          }
          if (l && l.type === "Circle") {
            const coordinates = [
              editing._shape._latlng.lat,
              editing._shape._latlng.lng,
            ];
            const duration = editing._shape._mRadius;
            return l.id === _leaflet_id ? { ...l, coordinates, duration } : l;
          }
          if (l && l.type === "LineString") {
            const coordinates = editing?.latlngs[0].map((coords) => {
              return [coords.lat, coords.lng];
            });
            return l.id === _leaflet_id ? { ...l, coordinates } : l;
          }
          if (l && l.type === "Point") {
            const coordinates = [
              editing._marker._latlng.lat,
              editing._marker._latlng.lng,
            ];
            return l.id === _leaflet_id ? { ...l, coordinates } : l;
          }
        })
      );
    });
  };

  const deleteHandle = (e) => {
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map((_leaflet_id) => {
      setmapLayer((layer) =>
        layer.filter((l) => l.id !== _leaflet_id._leaflet_id)
      );
    });
  };

  const onCreatedhandler = (e) => {
    const { layerType, layer } = e;
    const { _latlng } = layer;
    if (layerType === "circle") {
      setmapLayer((lay) => {
        return [
          ...lay,
          {
            id: layer._leaflet_id,
            type: "Circle",
            coordinates: [_latlng.lat, _latlng.lng],
            duration: layer._mRadius,
          },
        ];
      });
    } else if (layerType === "polygon") {
      const coordinates = layer._latlngs[0].map((coords) => [
        coords.lat,
        coords.lng,
      ]);
      setmapLayer((lay) => [
        ...lay,
        {
          id: layer._leaflet_id,
          type: "Polygon",
          coordinates: coordinates,
        },
      ]);
    } else if (layerType === "marker") {
      setmapLayer((lay) => [
        ...points,
        ...lay,
        {
          type: "Point",
          id: layer._leaflet_id,
          coordinates: [layer._latlng.lat, layer._latlng.lng],
        },
      ]);
    } else if (layerType === "polyline") {
      const coordinates = layer._latlngs.map((coords) => [
        coords.lat,
        coords.lng,
      ]);
      setmapLayer((lay) => [
        ...lay,
        {
          id: layer._leaflet_id,
          type: "LineString",
          coordinates: coordinates,
        },
      ]);
    }
  };

  useEffect(() => {
    if (mapLayer.length === 0) {
      setValues("location", null);
      return;
    }

    setValues("location", mapLayer);
  }, [mapLayer]);
  return (
    <FeatureGroup ref={ref}>
      {circles?.map((circle, index) => (
        <Circle
          key={circle.id}
          center={circle.coordinates}
          radius={circle?.duration}
        ></Circle>
      ))}
      {points?.map((point, index) => {
        return <Marker key={index} position={point.coordinates}></Marker>;
      })}

      {polygon?.map((poly, index) => (
        <Polygon
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
        ></Polyline>
      ))}

      {/* <Circle center={[25.2233, 55.2869]} radius={1000} /> */}
      <EditControl
        key={mapLayer.length}
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
