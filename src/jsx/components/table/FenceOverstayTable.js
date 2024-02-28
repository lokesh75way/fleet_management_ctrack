import React from "react";
import { Table } from "react-bootstrap";



const FenceOverstayData = {
    data: [
       [
          "Paul Byrd",
          "Chief Financial",
          "New York",
          "33",
          "2010/06/09",
          "$725,000",
       ],
       [
          "Gloria ",
          "Systems ",
          "New York",
          "47",
          "2009/04/10",
          "$237,500",
       ],
       [
          "Bradley ",
          "Software ",
          "London",
          "51",
          "2012/10/13",
          "$132,000",
       ],
       [
          "Dai Rios",
          "Personnel ",
          "Edinburgh",
          "66",
          "2012/09/26",
          "$217,500",
       ],
       [
          "Jenette",
          "Development ",
          "New York",
          "29",
          "2011/09/03",
          "$345,000",
       ],
       [
          "Yuri Berry",
          "Chief ",
          "New York",
          "45",
          "2009/06/25",
          "$675,000",
       ],
       [
          "Caesar Vance",
          "Pre-Sales",
          "New York",
          "62",
          "2011/12/12",
          "$106,450",
       ],
       [
          "Doris Wilder",
          "Sales ",
          "Sydney",
          "55",
          "2010/09/20",
          "$85,600",
       ],
       [
          "Angelica Ramos",
          "Chief ",
          "London",
          "53",
          "2009/10/09",
          "$1,200,000",
       ],
       ["Gavin Joyce", "Developer", "Edinburgh", "72", "2010/12/22", "$92,575"],
    ],
    columns: ["Object", "Geofence", "Estimated Duration", "Actual Duration", "Over Stay", "Consider Only Stoppage Duration"],
 };
					
const FenceOverstayTable = () => {
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
                           {FenceOverstayData.columns.map((d, i) => (
                              <th style={{padding : '0.25rem 0.9375rem', backgroundColor:'#F5F5F5'}} key={i}>{d}</th>
                           ))}
                        <tbody>
                           {FenceOverstayData.data.map((d, i) => (
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

export default FenceOverstayTable;
