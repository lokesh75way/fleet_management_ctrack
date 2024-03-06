import React from "react";
import { Table } from "react-bootstrap";



const FleetIdleData = {
    data: [
       [
          "Paul Byrd",
          "Chief Financial",
          "New York",

       ],
       [
          "Gloria ",
          "Systems ",
          "New York",


       ],
       [
          "Bradley ",
          "Software ",
          "London",


       ],
       [
          "Dai Rios",
          "Personnel ",
          "Edinburgh",
   
 
       ],
       [
          "Jenette",
          "Development ",
          "New York",

       ],
       [
          "Yuri Berry",
          "Chief ",
          "New York",

 
       ],
       [
          "Caesar Vance",
          "Pre-Sales",
          "New York",

       
       ],
       [
          "Doris Wilder",
          "Sales ",
          "Sydney",

     
       ],
       [
          "Angelica Ramos",
          "Chief ",
          "London",

    
       ],
       ["Gavin Joyce", "Developer", "Edinburgh",  ],
    ],
    columns: ["Object",	"Idle Duration"	,"Approx Fuel Waste"],
 };

const FleetIdleTable = () => {
   return (
      <div className="col-12">
         <div className="card">
            <div className="card-body" style={{padding : '0.25rem'}}>
               <Table responsive className="w-100">
                  <div id="example_wrapper" className="dataTables_wrapper">
                     <table
                        id="example"
                        className="display w-100 dataTable"
                        role="grid"
                        aria-describedby="example_info"
                     >
                  
                           {FleetIdleData.columns.map((d, i) => (
                              <th style={{padding : '0.25rem 0.9375rem', backgroundColor:'#F5F5F5'}} key={i}>{d}</th>
                           ))}
             
                        <tbody>
                           {FleetIdleData.data.map((d, i) => (
                              <tr key={i}>
                                 {d.map((da, i) => (
                                    <td key={i}>{da}</td>
                                 ))}
                              </tr>
                           ))}
                        </tbody>
                       
                     </table>
                  </div>
               </Table>
            </div>
         </div>
      </div>
   );
};

export default FleetIdleTable;
