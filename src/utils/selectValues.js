export const getSelectValues = (id) => {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    return {
      business: {
        disabled: false,
        defaultValues: "",
      },
      company: {
        disabled: false,
        defaultValues: "",
      },
    };
  } else if (role === "businessgroup") {
    const businessName = localStorage.getItem("loginDetails-name");
    return {
      business: {
        disabled: true,
        defaultValues: businessName,
      },
      company: {
        disabled: false,
        defaultValues: "",
      },
    };
  }
  else if(role === 'company'){
    const companyName = localStorage.getItem('loginDetails-name');
    const user = JSON.parse(localStorage.getItem('userJsonData')).filter((item)=>item.userName === companyName);
    return {
        business: {
            disabled: true,
            defaultValues: user[0].parent,
          },
          company: {
            disabled: true,
            defaultValues: companyName,
          },
    }
  }
};
