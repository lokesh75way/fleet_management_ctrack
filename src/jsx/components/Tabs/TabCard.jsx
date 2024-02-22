import React from 'react';

function TabCard(props) {
  const { onClick, data, isActive } = props;
  const { title, icon } = data;

  return (
    <div
      onClick={onClick}
      className={`card same-card mx-2 bg-white col-xl-2 col-lg-4 cold-md-4 col-sm-6 ${
        isActive ? 'active-tab' : ''
      }`}
      style={{ height: '160px', width: '160px', border: isActive ? '1px solid #4C9AFF' : '1px solid #E6E6E6' }}
    >
      <div className="card-body d-flex align-items-center">
        <div className="d-flex flex-column align-items-center w-100 pb-2">
          {icon && <span className="card-text text-primary fs-1 mb-2">{icon}</span>}
          <h6 className="card-text text-primary text-center fs-4">{title}</h6>
        </div>
      </div>
    </div>
  );
}

export default TabCard;

// import React from 'react';

// function TabCard(props) {
//   const { onClick, data, isActive } = props;
//   const { title, icon } = data;

//   return (
//     <div
//       onClick={onClick}
//       className={`card same-card mx-2 bg-white col-xl-2 col-lg-4 cold-md-4 col-sm-6 ${
//         isActive ? 'active-tab' : ''
//       }`}
//       style={{ height: '160px', width: '160px', border: isActive ? '1px solid #4C9AFF' : '1px solid #E6E6E6' }}
//     >
//       <div className="card-body d-flex ">
//         <div className="d-flex flex-column align-items-center w-100 pb-2">
//           {icon && <span className="d-flex justify-content-center align-items-center card-text text-primary fs-1 mb-2" style={{paddingTop:"20px", paddingBottom:"5px"}}>{icon}</span>}
//           <h6 className="d-flex justify-content-center  card-text text-primary text-center fs-4">{title}</h6>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TabCard;