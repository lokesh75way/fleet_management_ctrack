import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Collapse from "react-bootstrap/Collapse";
import MenusBlog from "./MenusBlog";
import MenusBlog2 from "./MenusBlog2";
import PageTitle from "../../layouts/PageTitle";

const options = [
  { value: "1", label: "India" },
  { value: "2", label: "Information" },
  { value: "3", label: "New Menu" },
  { value: "4", label: "Page Menu" },
];

const Menu = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <PageTitle activeMenu="Menus" motherMenu="CMS" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="filter cm-content-box box-primary">
              <div className="content-title">
                <div className="cpa">
                  <i className="fa fa-list-alt me-1"></i>Menus
                </div>
                <div className="tools">
                  <Link
                    to={"#"}
                    className={`SlideToolHeader ${open ? "collapse" : "expand"}`}
                    onClick={() => setOpen(!open)}
                  >
                    <i className="fas fa-angle-up" />
                  </Link>
                </div>
              </div>
              <Collapse in={open}>
                <div className="cm-content-body form excerpt">
                  <div className="card-body">
                    <div className="row align-items-center p-3">
                      <div className="col-xl-3 col-xxl-3 mb-xl-0 mb-3">
                        <h6 className="mb-0">
                          Select a menu to edit:{" "}
                          <span className="required">* </span>
                        </h6>
                      </div>
                      <div className="col-xl-6 col-xxl-5 mb-xl-0 mb-3 Cms-selecter">
                        <Select
                          isSearchable={false}
                          options={options}
                          className="custom-react-select"
                        />
                      </div>
                      <div className="col-xl-3 col-xxl-4  mb-xl-0 mb-3">
                        <Link to={"#"} className="btn btn-primary">
                          Select
                        </Link>
                        <span className="mx-2">or</span>
                        <Link to={"#"} className="text-primary">
                          create new menu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="row">
              <div className="col-xl-4">
                <MenusBlog />
              </div>
              <div className="col-xl-8">
                <MenusBlog2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Menu;
