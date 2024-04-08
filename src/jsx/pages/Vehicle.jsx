import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import VehicleTable from "../components/Tables/VehicleTable";
import { ThemeContext } from "../../context/ThemeContext";
import MainPagetitle from "../layouts/MainPagetitle";
import { clsx } from "clsx";
import VehicleServices from "../../services/api/VehicleService";
import { usePermissions } from "../../context/PermissionContext";
import { deleteVehicles, getVehicles } from "../../services/api/VehicleService";
import usePagination from "../../hooks/usePagination";
import {useTranslation} from 'react-i18next'

const Vehicle = () => {

  const { t } = useTranslation();
  const { isRtl } = useContext(ThemeContext);
  const {can} = usePermissions()
  const arrowleft = clsx({
    "fa-solid fa-angle-right": isRtl,
    "fa-solid fa-angle-left": !isRtl,
  });
  const arrowright = clsx({
    "fa-solid fa-angle-left": isRtl,
    "fa-solid fa-angle-right": !isRtl,
  });
  //   const { setAddVehicle, addVehicle } = useContext(ThemeContext);


  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState();
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({
    id: 0,
    vehicleName: "",
    plateNumber: "",
    simNumber: 0,
    IMEINumber: 0,
    GPSDeviceType: "",
    distanceCounter: 0,
  });
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

  const { page, nextPage, prevPage, goToPage, setCount, totalCount } =
  usePagination();

  async function getVehicleData() {
    try {
      const { data , totalLength,totalCount} = await getVehicles();
      console.log(data)
      setTableData(data);
      // setCount(totalCount);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  }

  console.log(tableData);
  useEffect(() => {
    setData(document.querySelectorAll("#employee-tbl_wrapper tbody tr"));
  }, [test]);

  useEffect(() => {
    getVehicleData();
  }, [deleteId]);

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
  const onConfirmDelete = (id) => {
    deleteVehicles(id);
    getVehicleData(id);
    setDeleteId(id);
  };
  // Edit function
  const editDrawerOpen = (id) => {
    // tableData.map((table) => table.id === id && setEditData(table));

    const data = tableData.filter((item) => item._id === id);
    console.log('myData',data);

    navigate(`edit/${id}`,{ state: { formData: data } });
    // vehicle.current.showModal();
  };


  const vehicle = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle={t('vehicle')}
        pageTitle={t('vehicle')}
        parentTitle={t('home')}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t('vehicle')}</h4>
                    <div>
                     {can('vehicle','add') && <Link
                        to={"/vehicle/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                      >
                        + {t('addVehicleInfo')}
                      </Link>}{" "}
                    </div>
                  </div>
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <table
                      id="empoloyees-tblwrapper"
                      className="table ItemsCheckboxSec dataTable no-footer mb-0"
                    >
                      <thead>
                        <tr>
                          <th>{t('vehicleName')}</th>
                          <th>{t('plateNumber')}</th>
                          <th>{t('branch')}</th>
                          <th>{t('simNumber')}</th>
                          <th>{t('IMEINumber')}</th>
                          <th>{t('registrationNumber')}</th>
                          <th>{t('weightCapacity')}</th>
                          {(can('vehicle','modify') || can('vehicle','delete')) && <th>{t('action')}</th>}
                        </tr>
                      </thead>
                      <tbody>
                        <VehicleTable
                          tableData={tableData}
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
                        />
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                    <div className="dataTables_info">
                          {t("showing")} {(page - 1) * 10 + 1} {t("to")}{" "}
                          {Math.min(page * 10, totalCount)} {t("of")}{" "}
                          {totalCount} {t("entries")}
                        </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                         <Link
                            className={`paginate_button ${
                              page === 1 ? "previous disabled" : "previous"
                            }`}
                            to="/vehicle"
                            onClick={() => prevPage(page - 1)}
                          >
                            <i className={arrowleft} />
                          </Link>
                          <span>
                            {[...Array(Math.ceil(totalCount / 10)).keys()].map(
                              (number) => (
                                <Link
                                  key={number}
                                  className={`paginate_button ${
                                    page === number + 1 ? "current" : ""
                                  }`}
                                  onClick={() => goToPage(number + 1)}
                                >
                                  {number + 1}
                                </Link>
                              )
                            )}
                          </span>
                          <Link
                            className={`paginate_button ${
                              page * 10 >= totalCount ? "next disabled" : "next"
                            }`}
                            to="/vehicle"
                            onClick={() => nextPage(page + 1)}
                          >
                            <i className={arrowright} />
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
