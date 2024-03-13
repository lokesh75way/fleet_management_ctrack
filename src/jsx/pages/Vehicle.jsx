import React, {useState, useRef, useEffect, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {VehicleData} from '../components/Tables/Tables'
import VehicleTable from '../components/Tables/VehicleTable';
import { ThemeContext } from '../../context/ThemeContext';
import MainPagetitle from '../layouts/MainPagetitle';

const Vehicle = () => {  
    const {setAddVehicle, addVehicle} = useContext(ThemeContext)
    const userData = JSON.parse(localStorage.getItem("userJsonData"));
    const VehicleData = userData.filter((item)=>item.designation === 'vehicle')
    const navigate = useNavigate();
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
	const activePage = useRef(0);
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

    useEffect(()=>{
        console.log("enter herer")
    },[])

   activePage.current === 0 && chageData(0, sort);
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);
	const onClick = (i) => {
		activePage.current = i;
		chageData(activePage.current * sort, (activePage.current + 1) * sort);
		settest(i);
	};
    // delete function
    const onConfirmDelete =(id)=>{
        const updatedData = tableData.filter(item => item.id !== id);
        setTableData(updatedData);

         // Remove item from local storage
     const updatedLocalStorageData = VehicleData.filter((item) => item.id !== id);
     localStorage.setItem('vehicleData', JSON.stringify(updatedLocalStorageData));
    
       }
    // Edit function
    const editDrawerOpen = (item)=>{
        tableData.map((table)=>(
            table.id === item && setEditData(table)
        ))
        navigate(`edit/${item}`);
        // vehicle.current.showModal();
    }

    const handleSubmit=(e)=>{
        console.log("I am here")
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
        <MainPagetitle mainTitle="Vehicle" pageTitle={'Vehicle'} parentTitle={'Home'} />
            <div className="container-fluid">
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
                                                    <th>Branch</th>
                                                    <th>Vehicle Name</th>
                                                    <th>Plate Number</th>
                                                    <th>SIM Number</th>
                                                    <th>IMEI Number</th>
                                                    <th>Registration Number</th>
                                                    <th>DVIR Number</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <VehicleTable tableData={tableData} onConfirmDelete={onConfirmDelete} editDrawerOpen={editDrawerOpen}  />
                                            </tbody>
                                            
                                        </table>
                                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                                            <div className="dataTables_info">
                                                Showing {activePage.current * sort + 1} to{" "}
                                                {data.length > (activePage.current + 1) * sort
                                                    ? (activePage.current + 1) * sort
                                                    : data.length}{" "}
                                                of {data.length} entries
                                            </div>
                                            <div
                                                className="dataTables_paginate paging_simple_numbers"
                                                id="example2_paginate"
                                            >
                                                <Link
                                                    className="paginate_button previous disabled"
                                                    to="/vehicle"
                                                    onClick={() =>
                                                        activePage.current > 0 &&
                                                        onClick(activePage.current - 1)
                                                    }
                                                >
                                                    <i className="fa-solid fa-angle-left" />
                                                </Link>
                                                <span>
                                                    {paggination.map((number, i) => (
                                                    <Link
                                                        key={i}
                                                        to="/vehicle"
                                                        className={`paginate_button  ${
                                                            activePage.current === i ? "current" : ""
                                                        } `}
                                                        onClick={() => onClick(i)}
                                                    >
                                                        {number}
                                                    </Link>
                                                    ))}
                                                </span>
                                                <Link
                                                    className="paginate_button next"
                                                    to="/vehicle"
                                                    onClick={() =>
                                                        activePage.current + 1 < paggination.length &&
                                                        onClick(activePage.current + 1)
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