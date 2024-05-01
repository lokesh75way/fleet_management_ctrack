import React, {useState, useRef, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {VehicleData} from '../Tables/Tables'
import VehicleTable from '../Tables/VehicleTable';
import VehicleOffCanvas from '../../constant/VehicleOffCanvas';
import { ThemeContext } from '../../../context/ThemeContext';

const Vehicle = () => {  
    const {setAddVehicle, addVehicle} = useContext(ThemeContext)
    const [data, setData] = useState(
		document.querySelectorAll("#employee-tbl_wrapper tbody tr")
	);
    const [tableData, setTableData] = useState(VehicleData)
    const [editData, setEditData] = useState({
        id:0,
        vehicleName:'',
        plateNumber:'',
        simNumber:0,
        IMEINumber:0,
        GPSDeviceType:'',
        distanceCounter:0
    })
	const sort = 10;
	const activePag = useRef(0);
	const [test, settest] = useState(0);
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
   
   useEffect(() => {
      setData(document.querySelectorAll("#employee-tbl_wrapper tbody tr"));
	}, [test]);

  

   activePag.current === 0 && chageData(0, sort);
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};
    // delete function
    const onConfirmDelete =(id)=>{
        const updatedData = tableData.filter(item => item.id !== id);
        setTableData(updatedData);
    
       }
    // Edit function
    const editDrawerOpen = (item)=>{
        tableData.map((table)=>(
            table.id === item && setEditData(table)
        ))
        vehicle.current.showModal();
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(editData.id === 0){
            editData.id = editData.simNumber-1
            tableData.push(editData)
        }
        else{
            const updateTable = tableData.map((table)=>{
                if(table.id === editData.id) {
                    return {...table, ...editData };
                }
                return table;
            })
            setTableData(updateTable)
        }
    }  
   
    const vehicle = useRef();
    return (
        <>
            <div className="">
				<div className="row">
			    	<div className="col-xl-12">
                        <div className="card">            
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">Vehicle</h4> 
                                        <div>
                                            
                                            <Link to={'/vehicle/create'} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"                                            
                                            >+ Add Vehicle Info</Link> {" "}
                                        </div>                                          
                                    </div>          
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>                                                   
                                                    <th>Plate Number</th>
                                                    <th>Vehicle Name</th>
                                                    <th>SIM Number</th>
                                                    <th>IMEI Number</th>
                                                    <th>GPS Device Type</th>
                                                    <th>Distance Counter</th>
                                                    <th>Speed Detection</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <VehicleTable tableData={tableData} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen}  />
                                            </tbody>
                                            
                                        </table>
                                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                                            <div className="dataTables_info">
                                                Showing {activePag.current * sort + 1} to{" "}
                                                {data.length > (activePag.current + 1) * sort
                                                    ? (activePag.current + 1) * sort
                                                    : data.length}{" "}
                                                of {data.length} entries
                                            </div>
                                            <div
                                                className="dataTables_paginate paging_simple_numbers"
                                                id="example2_paginate"
                                            >
                                                <Link
                                                    className="paginate_button previous disabled"
                                                    to="/general"
                                                    onClick={() =>
                                                        activePag.current > 0 &&
                                                        onClick(activePag.current - 1)
                                                    }
                                                >
                                                    <i className="fa-solid fa-angle-left" />
                                                </Link>
                                                <span>
                                                    {paggination.map((number, i) => (
                                                    <Link
                                                        key={i}
                                                        to="/general"
                                                        className={`paginate_button  ${
                                                            activePag.current === i ? "current" : ""
                                                        } `}
                                                        onClick={() => onClick(i)}
                                                    >
                                                        {number}
                                                    </Link>
                                                    ))}
                                                </span>
                                                <Link
                                                    className="paginate_button next"
                                                    to="/general"
                                                    onClick={() =>
                                                        activePag.current + 1 < paggination.length &&
                                                        onClick(activePag.current + 1)
                                                    }
                                                >
                                                    <i className="fa-solid fa-angle-right" />
                                                </Link>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Vehicle;