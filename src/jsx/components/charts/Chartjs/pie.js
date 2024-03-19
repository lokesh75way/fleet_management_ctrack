import React from "react";
import { Pie } from "react-chartjs-2";

const ChartPie = ({ color1, color2, color3, color4, height, width, Chartdata }) => {
   const data = {
      datasets: [
         {
            data:Chartdata,
            borderWidth: 0,
            backgroundColor: [
               // `${color1 ? color1 : "#FF5E5E"}`,
               // `${color2 ? color2 : "#0d99ff"}`,
               `${color1 ? color1 : "#3AC977"}`,
               `${color2 ? color2 : "#FF9F00"}`,
            ],
            hoverBackgroundColor: [
               // `${color1 ? color1 : "#FF5E5E"}`,
               // `${color2 ? color2 : "#0d99ff"}`,
               `${color3 ? color3 : "#3AC977"}`,
               `${color4 ? color4 : "#FF9F00"}`,
            ],
         },
      ],
      labels: ["Web User", "Mobile User"],
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
