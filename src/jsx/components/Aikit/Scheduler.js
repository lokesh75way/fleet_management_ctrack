import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';
import TopMenus from './TopMenus';

import MainContent from './MainContent';

const schedulerTable = [
    { keyword:'lion'},
    { keyword:'tegr'},
    { keyword:'Fres'},
    { keyword:'Tiney'},
    { keyword:'lion'},
    { keyword:'tegr'},
    { keyword:'Fres'},
    { keyword:'Tiney'},
    { keyword:'lion'},
    { keyword:'tegr'},
    { keyword:'Fres'},
    { keyword:'Tiney'},
    
];

const numb = [1,2,3];

const Scheduler = () => {
    const [data, setData] = useState(
		document.querySelectorAll("#employee-tbl_wrapper tbody tr")
	);
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
    return (
        <>
            <PageTitle activeMenu={'Scheduler'} motherMenu={'AiKit'} />
            <div className="container-fluid">
                <div className="row">
					<div className="col-xl-12">                        
                        <MainContent  detail="This is a demo of AIKit plugin made for you to test the experience of using the plugin. " 
                            subtitle="AIKit Scheduled AI Generators allow you to schedule content to be generated by AI. Please review and edit before publishing for best results. This is not a substitute for human editing, but a drafting aid. Happy writing!"
                        />
						<TopMenus  id={2}/>
                        <div className="card h-auto">
							<div className="card-body p-0">
								<div id="employee-tbl_wrapper" className="table-responsive dataTables_wrapper active-projects style-1">								
									<table  id="empoloyees-tblwrapper" className="table dataTable dataTables_wrapper no-footer mb-0">
										<thead>
											<tr>
												<th>Description</th>
												<th>Keywords</th>
												<th>Status</th>
												<th>Interval</th>
												<th>Last generation</th>
												<th>Next generation</th>
												<th>Is running</th>
												<th>Run count</th>
												<th>Max run count</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
                                            {schedulerTable.map((item, ind)=>(
                                                <tr key={ind}>
                                                    <td className="text-black">Write a rat story</td>
                                                    <td>
                                                        {item.keyword}
                                                    </td>
                                                    <td><span className="badge badge-success badge-sm light">Active</span></td>
                                                    <td>hourly</td>
                                                    <td>4:50 am July 11, 2023</td>
                                                    <td>5:50 am July 11, 2023</td>	
                                                    <td>
                                                        {
                                                            numb.includes(ind) ?  
                                                                <span className="badge badge-success">Yes</span>
                                                            :
                                                                <span className="badge badge-light">No</span>
                                                        }
                                                    </td>
                                                    <td>1</td>
                                                    <td>5</td>
                                                    <td>
                                                        <Link to={"#"} className="btn btn-primary light btn-sharp">
                                                            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10.625 2.37519C10.7892 2.21104 10.984 2.08082 11.1985 1.99199C11.413 1.90315 11.6429 1.85742 11.875 1.85742C12.1071 1.85742 12.337 1.90315 12.5515 1.99199C12.766 2.08082 12.9608 2.21104 13.125 2.37519C13.2892 2.53934 13.4194 2.73422 13.5082 2.94869C13.597 3.16317 13.6428 3.39304 13.6428 3.62519C13.6428 3.85734 13.597 4.08721 13.5082 4.30168C13.4194 4.51616 13.2892 4.71104 13.125 4.87519L4.6875 13.3127L1.25 14.2502L2.1875 10.8127L10.625 2.37519Z" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </Link>{" "}
                                                        <Link to={"#"} className="btn btn-danger light btn-sharp">
                                                            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1.875 4.25H3.125H13.125" stroke="#FF5B5B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M11.875 4.25V13C11.875 13.3315 11.7433 13.6495 11.5089 13.8839C11.2745 14.1183 10.9565 14.25 10.625 14.25H4.375C4.04348 14.25 3.72554 14.1183 3.49112 13.8839C3.2567 13.6495 3.125 13.3315 3.125 13V4.25M5 4.25V3C5 2.66848 5.1317 2.35054 5.36612 2.11612C5.60054 1.8817 5.91848 1.75 6.25 1.75H8.75C9.08152 1.75 9.39946 1.8817 9.63388 2.11612C9.8683 2.35054 10 2.66848 10 3V4.25" stroke="#FF5B5B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M6.25 7.375V11.125" stroke="#FF5B5B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M8.75 7.375V11.125" stroke="#FF5B5B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}											
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
                                                to="#"
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
                                                    to="#"
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
                                                to="#"
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
        </>
    );
};

export default Scheduler;