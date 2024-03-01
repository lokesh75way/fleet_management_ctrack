import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ChromePicker } from 'react-color';

import Map from './Map';
import { BiNoEntry } from 'react-icons/bi';

const GeofenceDetail = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    category: '',
    geofenceAccess: '',
    geofenceGroup: '',
    geofenceType: '',
    contactNumber: '',
    address: '',
    color: '',
    tolerance: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const mapContainerStyle = {
    height: '100%',
    width: '100%',
  };

  const defaultCenter = {
    lat: -3.745,
    lng: -38.523,
  };

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    map.fitBounds(bounds);
    setMap(map);
  }, [defaultCenter]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleColorChange = (color) => {
    setFormData((prevData) => ({ ...prevData, color: color.hex }));
  };


  return (
    <div>
        <div style={{padding : '10px', backgroundColor : '#FFFDFD' }}>
    <h2 style={{fontSize : '20px'}}>Geofence Detail</h2>
        </div>

    <div className="" style={{ display: 'flex', height: '88vh',}}>
      {/* Left side */}

      
      <div className="col-md-3" style={{ padding : '15px',boxShadow: '9px 0 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff', }}>
        <form>
          <div className="mb-2">
            <label htmlFor="company" className="form-label">
              Company:
            </label>
            <input
              type="text"
              className="form-control"
              name="company"
              value={formData.company}
              onChange={handleChange}
              />
          </div>
          <div className="mb-2">
            <label htmlFor="company" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="company"
              value={formData.company}
              onChange={handleChange}
              />
          </div>

          {/* Add other form fields similarly */}

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              >
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Geofence Access:</label>
            <div style={{display : 'flex', flexDirection : 'row', gap : '5rem'}}>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="geofenceAccess"
                value="read"
                onChange={handleChange}
                />
              <label className="form-check-label">Public</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="geofenceAccess"
                value="write"
                onChange={handleChange}
                />
              <label className="form-check-label">Private</label>
            </div>
                </div>
          </div>

          {/* Add other form fields similarly */}

          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number:
            </label>
            <input
              type="text"
              className="form-control"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              />
          </div>

          {/* Add other form fields similarly */}

           {/* Color Picker */}
           <div className="mb-3">
            <label htmlFor="color" className="form-label">
              Color:
            </label>
            <ChromePicker
              color={formData.color}
              onChangeComplete={(color) => handleColorChange(color)}
            />
          </div>

          {/* Add other form fields similarly */}

          <div className="mb-3">
            <label htmlFor="tolerance" className="form-label">
              Tolerance:
            </label>
            <select
              className="form-select"
              name="tolerance"
              value={formData.tolerance}
              onChange={handleChange}
              >
              <option value="tolerance1">5</option>
              <option value="tolerance2">10</option>
              <option value="tolerance2">15</option>
              <option value="tolerance2">20</option>
              <option value="tolerance2">40</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              />
          </div>

          {/* Add other form fields similarly */}

        </form>
      </div>


      {/* Right side */}
      <div className="col-md-9" style={{ paddingLeft: '15px' }}>
       <Map/>
      </div>
    </div>
    </div>
  );
};

export default GeofenceDetail;
