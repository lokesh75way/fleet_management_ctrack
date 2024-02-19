import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import {Link} from 'react-router-dom'; 

import { Slider } from 'rsuite';
import "rsuite/dist/rsuite.min.css"

// import RangeSlider from "react-range-slider-input";
// npm install range-slider-input
// import "react-range-slider-input/dist/style.css";
//
import TopMenus from './TopMenus';
import MainContent from './MainContent';
import PageTitle from '../../layouts/PageTitle';
import { SVGICON } from '../../constant/theme';


const CountryList = [
	{ name: 'English' },
	{ name: 'Deutsch' },
	{ name: 'Français' },
	{ name: 'Español' },
	{ name: 'Italiano' },
	{ name: 'Português' },
	{ name: 'Dutch' },
	{ name: 'Polski' },
	{ name: 'Русский' },
	{ name: '日本語中文' },
	{ name: 'Português' },
	{ name: 'Brasileiro' },
	{ name: 'Türkçe' },
	{ name: 'Română' },
	{ name: 'Tiếng' },
	{ name: 'العربية' },
	{ name: 'Việt' },
	{ name: 'हिन्दी' },
	{ name: 'Bahasa' },
	{ name: '한국어' },
	{ name: 'Български' },
];

const AccordArray = [
    {id:0, title:'Write a paragraph on this', icon: SVGICON.TripalLine, slidervalue:40},
    {id:1, title:'Continue this text', icon: SVGICON.EditPencil, slidervalue:30},
    {id:2, title:'Generate ideas on this', icon: SVGICON.Bulb, slidervalue:20},
    {id:3, title:'Write an article about this', icon: SVGICON.LetterCard, slidervalue:35},
]

const AIMenu = () => {
    const [data, setData] = useState(
        AccordArray
    );
    const  handleChange = (index, value) => {       
       setData(
        data.map(item => 
            item.id === index
            ? {...item, slidervalue: value}
            : item
        )
       )
    };
    return (
        <>
            <PageTitle activeMenu={'AI Menu Prompts'} motherMenu={'AiKit'} />
            <div className="container-fluid">
                <div className="row">
					<div className="col-xl-12">                        
                        <MainContent  detail="This is a demo of AIKit plugin made for you to test the experience of using the plugin." 
                            subtitle={`Here you can edit or add new prompts that would appear in the "AI" dropdown menu. You can also reorder the prompts by dragging and dropping them in the order you wish. There are lots of online resources that could help and give you tips & trick on how to best edit prompts. Simply search YouTube/Google for "Prompt engineering" to gain more knowledge on the topic. Add PromptReset Prompts` }
                        />
						<TopMenus  id={7}/>
                        <div className="d-flex align-items-center justify-content-between mb-3">
							<span>
								<Link to={"#"} className="btn btn-primary btn-sm">Save Settings</Link>{" "}
								<Link to={"#"} className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Prompt</Link>
                            </span>
							<Link to={"#"} className="btn-danger btn btn-sm">Reset Prompts</Link>
						</div>
						<Accordion className="accordion-with-icon writer-accordion ai-menu"  defaultActiveKey="0">
                            {data.map((item, index)=>(                            
                                <Accordion.Item className=" border-0" eventKey={`${index}`} key={index}>
                                    <Accordion.Header className="accordion-header rounded-lg" > 
                                        <span className="me-1">
                                           {item.icon}
                                        </span>
                                        <span className="accordion-header-text p-0">{item.title}</span>
										<span className="remove-prompt ms-auto">
											{SVGICON.RedCross}
										</span>
                                    </Accordion.Header>                                   
                               
                                    <Accordion.Collapse className="accordion__body" eventKey={`${index}`}>
                                        <div className="accordion-body-text p-0">
                                            <div className="card h-auto">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-sm-6">
                                                            <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                Requires text selection
                                                            </label>
                                                            </div>
                                                            <div id="emailHelp" className="form-text">Choose this option if you want to enforce text selection in the text editor. Most of the time you will want to leave this option selected. Deselect it only if you are adding a prompt that doesn't require input from author, like if you want OpenAI to generate text about random topic for example.</div>
                                                        </div>
                                                        <div className="col-xl-6 col-sm-6">
                                                            <div className="mb-3 mt-sm-0 mt-3">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label me-2">Default view:</label>
                                                            <div className="d-flex align-items-center flex-wrap">
                                                                <input type="number" className="form-control w-25" id="exampleFormControlInput1" placeholder="10" />
                                                                <div id="emailHelp-1" className="form-text ms-ms-3 ms-0">Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.</div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="col-xl-6 col-xxl-8">
                                                            <div className="mt-3">
                                                                <h4 className="heading">Number of words to generate</h4>
                                                                <div className="d-md-flex d-block align-items-center">
                                                                    <div className="check-ai">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                                                            <form className="form-check-label">
                                                                                <h6 className="ps-4"> Fixed number of words</h6>
                                                                                    <div className="mb-3">
                                                                                    <label htmlFor="exampleFormControlInput2" className="form-label">Number of words</label>
                                                                                    <input type="number" className="form-control w-50" id="exampleFormControlInput2" placeholder="" />
                                                                                    <div id="emailHelp1" className="form-text fs-12">Choose this option if you want to generate a fixed number of words, regardless of how long the selected text is. This is helpful for certain types of prompts, like generating a paragraph on a certain topic for example.</div>
                                                                                    </div>
                                                                                    
                                                                            </form>
                                                                        </div>	
                                                                    </div>
                                                                    <div className="check-ai ms-md-3 ms-0 mt-md-0 mt-3">
                                                                        <div className="form-check">
                                                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                                        <form className="form-check-label">
                                                                        <h6 className="ps-4">Relative to length of text selected</h6>
                                                                            <div className="mb-2">
                                                                            <ul className="d-flex justify-content-between mb-3"><li>Multiplier</li> <li>2.7x</li></ul>                                                                                                                                                        
                                                                                <Slider
                                                                                    progress                                                                                
                                                                                    className="single-thumb mb-5 ai-slider menu-slider"
                                                                                    value={item.slidervalue}
                                                                                    onChange={value => {
                                                                                        handleChange(index, value);
                                                                                    }}
                                                                                    defaultValue={item.slidervalue}
                                                                                />
                                                                             
                                                                            <div id="emailHelp-2" className="form-text fs-12">Choose this option if you want to generate a fixed number of words, regardless of how long the selected text is. This is helpful for certain types of prompts, like generating a paragraph on a certain topic for example.</div>
                                                                            </div>
                                                                        </form>
                                                                        </div>
                                                                    </div>	
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-xxl-4"></div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <h6>Prompts</h6>
                                                    <ul className="promt-langauage">
														{CountryList.map((item, ind)=>(
															<li key={ind}>
																<Link to={"#"} className="btn btn-sm btn-outline-primary mb-1">{item.name}</Link>
															</li>
														))}                                                        
                                                    </ul>
                                                    <div className="my-3">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Menu Title</label>
                                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Skriv et afsnit om dette"  />
                                                        <div id="emailHelp-3" className="form-text">This is title that will appear in the AI menu for this prompt.</div>
                                                    </div>
                                                    <div className="mb-3">
                                                    
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
                                                        defaultValue="
                                                        Skriv en paragraf om dette emne:

                                                        [[text]]
                                            
                                                        ----
                                                        Skriv paragraf:
                                                        "
                                                    />                                                    
            
                                                    
                                                    <div id="emailHelp-4" className="form-text">If this prompt requires text selection, the phrase will be replaced by the selected <span className="badge badge-sm badge-danger light">text</span> before doing the request. Make sure to include it in your prompt.</div>
                                                    
                                                    </div>
                                        
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion.Item>
                            ))}
						</Accordion>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIMenu;