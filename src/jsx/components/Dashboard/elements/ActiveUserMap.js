import React, { useCallback, useEffect } from "react";
import WorldMap from "react-svg-worldmap";
import { createRoot } from "react-dom/client";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import { useTranslation } from "react-i18next";
// import EditControlFC from './EditControl';

import { IMAGES } from "../../../constant/theme";

const listBlog = [
  { title: "India", image: IMAGES.India, barvalue: "80%" },
  { title: "Canada", image: IMAGES.Canada, barvalue: "30%" },
  { title: "Russia", image: IMAGES.Russia, barvalue: "50%" },
  { title: "United Kingdom", image: IMAGES.Uk, barvalue: "40%" },
  { title: "Australia", image: IMAGES.Aus, barvalue: "70%" },
  { title: "United States", image: IMAGES.Usa, barvalue: "65%" },
  { title: "Germany", image: IMAGES.Germany, barvalue: "70%" },
  { title: "UAE", image: IMAGES.Uae, barvalue: "45%" },
  { title: "China", image: IMAGES.China, barvalue: "35%" },
];
const listStateOfUAE1 = [
  { title: "Abu Dhabi", image: IMAGES.Uae, barvalue: "80%" },
  { title: "Dubai", image: IMAGES.Uae, barvalue: "30%" },
  { title: "Sharjah", image: IMAGES.Uae, barvalue: "50%" },
  { title: "Ajman", image: IMAGES.Uae, barvalue: "40%" },
  { title: "Umm Al-Quwain", image: IMAGES.Uae, barvalue: "70%" },
  { title: "Fujairah", image: IMAGES.Uae, barvalue: "65%" },
  { title: "Ras Al Khaimah", image: IMAGES.Uae, barvalue: "70%" },
  { title: "UAE", image: IMAGES.Uae, barvalue: "45%" },
];

const data = [
  { country: "cn", value: 1389618778 },
  { country: "in", value: 1311559204 },
  { country: "us", value: 331883986 },
  { country: "id", value: 264935824 },
  { country: "pk", value: 210797836 },
  { country: "br", value: 210301591 },
  { country: "ng", value: 208679114 },
  { country: "bd", value: 161062905 },
  { country: "ru", value: 141944641 },
  { country: "mx", value: 127318112 },
];

// function svgWidth(){
//     if(window.screenWidth < 1600){
//         return 420;
//     }else if (window.screenWidth < 1400){
//         return 300;
//     }else{
//         return 420;
//     }
// }

const getStyle = ({
  // countryValue,
  // countryCode,
  minValue,
  // maxValue,
  // color,
}) => ({
  // fill: countryCode === "US" ? "blue" : color,
  // fillOpacity: countryValue
  //   ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
  //   : 0,
  // fillOpacity : 1,
  stroke: "rgb(239, 242, 244)",
  // stroke: "#000",
  // fill : "#000",
  //strokeWidth: 1,
  // strokeOpacity: 0.2,
  cursor: "pointer",
});
const ActiveUserMap = ({ usageData }) => {
  const [listState, setListState] = React.useState([]);
  const [markers, setMarkers] = React.useState([]);
  const [centerLat, setCenterLat] = React.useState(25.2233);
  const [centerLon, setCenterLon] = React.useState(55.2869);
  const ShowMapContainer = ({ data }) => {
    const [geojson, setGeojson] = React.useState({
      type: "FeatureCollection",
      features: [],
    });
  };

  useEffect(() => {
    const listStateOfUAE = usageData?.activeUsers?.map((item) => {
      return {
        title: item.title,
        image: IMAGES[item.country],
        barvalue: item.value + "%",
      };
    });
    const mapMarkers = usageData?.activeUsers?.map((item) => {
      return {
        lat: item.lat,
        lon: item.lon,
        name: item.title,
      };
    });
    setMarkers(mapMarkers);
    setCenterLat(
      markers.reduce((total, marker) => total + marker.lat, 0) / markers.length
    );
    setCenterLon(
      markers.reduce((total, marker) => total + marker.lon, 0) / markers.length
    );
    setListState(listStateOfUAE);
  }, [usageData]);

  // Extracted function to render markers
  const renderMarkers = useCallback(() => {
    return markers
      .filter(marker => marker.lat !== undefined && marker.lon !== undefined)
      .map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lon]}>
          <Popup>{marker.name}</Popup>
          <Tooltip>{marker.name}</Tooltip>
        </Marker>
      ));
  }, [markers]);


  const { t } = useTranslation();
  return (
    <>
      <div className="card overflow-hidden">
        <div className="card-header border-0" style={{ paddingBottom: 0 }}>
          <h4 className="heading mb-0">{t("activeUsers")}</h4>
        </div>

        <div className="card-body pe-0">
          <div className="row">
            <div className="col-xl-8 active-map-main">
              {/* <div id="world-map" className="active-map text-center"> */}
              <div style={{ display: "flex", height: "35vh" }}>
                <div style={{ width: "100%" }}>
                  <MapContainer
                    center={[centerLat, centerLon]}
                    zoom={4}
                    zoomControl={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    {renderMarkers()}
                  </MapContainer>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="col-xl-4 active-country dz-scroll overflow-auto p-3 pt-5">
              {listState?.map((item, i) => (
                <div className="country-list" key={i}>
                  <img src={item.image} alt="" />
                  <div className="progress-box mt-0">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 c-name">{item.title}</p>
                      <p className="mb-0">{item.barvalue}</p>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        style={{
                          width: item.barvalue,
                          height: "5px",
                          borderRadius: "4px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveUserMap;
