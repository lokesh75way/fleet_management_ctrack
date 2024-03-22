import React from 'react'

import { Dropdown, Nav, Tab } from "react-bootstrap";
/// Scroll
import { Link } from "react-router-dom";
// images
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import avatar4 from "../../../images/avatar/4.jpg";


const Notification = () => {
  return (
   <>

              <div className="card-body">
                <div
           
                  id="DZ_W_Todo1"
                  className="widget-media dz-scroll  ps--active-y"
                >
                  <ul className="timeline">
                    <li>
                      <div className="timeline-panel">
                        <div className="media me-2">
                          <img  alt="" width="50" src={avatar1} />
                        </div>
                        <div className="media-body">
                          <h5 className="mb-1 pe-2">Technician 1</h5>
                       
                        </div>
                        <Dropdown className="dropdown">
                          <Dropdown.Toggle
                            variant="primary light"
                            className=" i-false p-0 sharp"
                          >
                            <svg
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        
                      </div>
                    </li>

                    <li>
                      <div className="timeline-panel">
                        <div className="media me-2 media-info">T2</div>
                        <div className="media-body">
                          <h5 className="mb-1 pe-2">Technician 2</h5>
                      
                        </div>
                        <Dropdown className="dropdown">
                          <Dropdown.Toggle
                            variant="primary light"
                            className=" i-false p-0 sharp"
                          >
                            <svg
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                      <div className="media me-2">
                          <img  alt="" width="50" src={avatar1} />
                        </div>
                        <div className="media-body">
                          <h5 className="mb-1 pe-2">Technician 3</h5>
                         
                        </div>
                        <Dropdown className="dropdown">
                          <Dropdown.Toggle
                            variant="primary light"
                            className=" i-false p-0 sharp"
                          >
                            <svg
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                      <div className="media me-2 media-info">T4</div>
                        <div className="media-body">
                          <h5 className="mb-1 pe-2">Technician 4</h5>
                        </div>
                        <Dropdown className="dropdown">
                          <Dropdown.Toggle
                            variant="primary light"
                            className=" i-false p-0 sharp"
                          >
                            <svg
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="media me-2 media-danger">T5</div>
                        <div className="media-body">
                          <h5 className="mb-1 pe-2">Technician 5</h5>
                       
                        </div>
                        <Dropdown className="dropdown">
                          <Dropdown.Toggle
                            variant="primary light"
                            className=" i-false p-0 sharp"
                          >
                            <svg
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              to="/widget-basic"
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                
                  </ul>
                </div>
              </div>
   </>
  )
}

export default Notification