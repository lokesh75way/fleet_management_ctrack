import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import MainPagetitle from "../../../../components/MainPagetitle";

const BranchProfile = () => {
  const data = {
    branch: "Branch1",
    country: "India",
    state: "Punjab",
    shortName: "Branch1",
    userName: "CompBranch1any1",
    passwordRecoveryEmail: "Branch1@gmail.com",
    helpDeskEmail: "Branch1help@gmail.com",
    helpDeskTelephoneNumber: "9876543210",
    mobileNumber: "1234567890",
    whatsappContactNumber: "1234567890",
    city: "Mohali",
    zipCode: "301019",
    street1: "C-3, fixed Building",
    street2: "Near Time Square",
    contactPerson: "Person1",
    faxNumber: "123456",
  };

  return (
    <>
      <MainPagetitle
        mainTitle="My Profile"
        pageTitle={"my-profile"}
        parentTitle={"Manage Profile"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">My Profile</h4>
                    <div>
                      <Link
                        to={"/branch/my-profile/edit"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                      >
                        + Edit Profile
                      </Link>{" "}
                    </div>
                  </div>
                  <hr className="m-0" />
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <div className="p-4">
                      <div
                        className="row"
                        style={{ width: "70%", margin: "auto" }}
                      >
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">
                            Branch Name
                          </label>

                          <span className="fs-4 form-control">
                            {data.branch}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">Country</label>
                          <span className="fs-4 form-control">
                            {data.country}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">State</label>

                          <span className="fs-4 form-control">
                            {data.state}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">Short Name</label>

                          <span className="fs-4 form-control">
                            {data.shortName}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">User Name</label>

                          <span className="fs-4 form-control">
                            {data.userName}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">
                            Password Recovery Email
                          </label>

                          <span className="fs-4 form-control">
                            {data.passwordRecoveryEmail}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">
                            Help Desk Email
                          </label>

                          <span className="fs-4 form-control">
                            {data.helpDeskEmail}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">
                            HelpDesk Telephone Number
                          </label>

                          <span className="fs-4 form-control">
                            {data.helpDeskTelephoneNumber}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">
                            Mobile Number
                          </label>

                          <span className="fs-4 form-control">
                            {data.mobileNumber}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">
                            Whatsapp Contact Number
                          </label>

                          <span className="fs-4 form-control">
                            {data.whatsappContactNumber}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">City</label>

                          <span className="fs-4 form-control">{data.city}</span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">Zip Code</label>

                          <span className="fs-4 form-control">
                            {data.zipCode}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">Street1</label>

                          <span className="fs-4 form-control">
                            {data.street1}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">Street2</label>

                          <span className="fs-4 form-control">
                            {data.street2}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">
                            Contact Person
                          </label>

                          <span className="fs-4 form-control">
                            {data.contactPerson}
                          </span>
                        </div>
                        <div className="col-xl-6 mb-3 ">
                          <label className="m-2 fs-4 heading">Fax Number</label>

                          <span className="fs-4 form-control">
                            {data.faxNumber}
                          </span>
                        </div>
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
export default BranchProfile;
