import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Select from 'react-select'
import DatePicker from "react-datepicker";
import { Offcanvas } from 'react-bootstrap';

import { SVGICON } from '../constant/theme';

const options = [
	{ value: 'salesmate', label: 'Salesmate' },
	{ value: 'active', label: 'ActiveCampaign' },
	{ value: 'insightly', label: 'Insightly' }
]

const options2 = [
	{ value: 'progess', label: 'In Progess' },
	{ value: 'pending', label: 'Pending' },
	{ value: 'completed', label: 'Completed' },
];
const options3 = [
	{ value: 'high', label: 'Hight' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'low', label: 'Low' },
];
const options4 = [
	{ value: 'design', label: 'Designing' },
	{ value: 'develop', label: 'Development' },
	{ value: 'react', label: 'React Developer' },
];
const options5 = [
	{ value: 'public', label: 'Public' },
	{ value: 'private', label: 'Private' },
];
const options6 = [
	{ value: 'yes', label: 'Yes' },
	{ value: 'no', label: 'No' },
];

const options7 = [
	{ value: 'ber', label: 'Bernard' },
	{ value: 'ser', label: 'Sergey Brin' },
	{ value: 'lary', label: 'Larry Ellison' },
];

const MainPagetitle = ({pageTitle, parentTitle, mainTitle}) => {
	const [startDate, setStartDate] = useState(new Date());
	const [startDate2, setStartDate2] = useState(new Date());
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const nav = useNavigate();
    const handleDesk=(e)=>{
        e.preventDefault();
        nav("#");
    }
    return (
        <>
            <div className="page-titles">
				<ol className="breadcrumb">
					<li><h5 className="bc-title">{mainTitle}</h5></li>
					<li className="breadcrumb-item">
                        <Link to={"#"}>
						    {SVGICON.HomeSvg}
						    {" "}{parentTitle} 
                        </Link>
					</li>
					<li className="breadcrumb-item active"><Link to={"#"}>{pageTitle}</Link></li>
				</ol>
			</div>  
			
        </>
    );
};

export default MainPagetitle;