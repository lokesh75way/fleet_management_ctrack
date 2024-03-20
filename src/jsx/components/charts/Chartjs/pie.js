import React from "react";
import { Pie } from "react-chartjs-2";

const ChartPie = ({ color1, color2, color3, color4, height, width, Chartdata, labels }) => {
   const data = {
      datasets: [
         {
            data:Chartdata,
            borderWidth: 0,
            backgroundColor: [
               `${color1 ? color1 : "#3AC977"}`,
               `${color2 ? color2 : "#FF9F00"}`,
               `${color3 ? color3 : "#FF5E5E"}`,
               `${color4 ? color4 : "#0d99ff"}`,
            ],
            hoverBackgroundColor: [
               `${color1 ? color1 : "#3AC977"}`,
               `${color2 ? color2 : "#FF9F00"}`,
               `${color3 ? color3 : "#FF5E5E"}`,
               `${color4 ? color4 : "#0d99ff"}`,
            ],
         },
      ],
      labels: labels,
   };

   const options = {
		plugins:{
			legend: false,
			responsive: true,
		},
      
      maintainAspectRatio: false,
   };

   return (
      <>
         <Pie data={data}  options={options} height={200} width={300}/>
     
      </>
   );
};

export default ChartPie;
