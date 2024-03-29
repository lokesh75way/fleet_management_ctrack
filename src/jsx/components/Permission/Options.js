import TemplateServices from "../../../services/api/TemplateServices";

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const templateData = await TemplateServices.getModules();
//       console.log("Received template data:", templateData);
//       setGroupsDataState(templateData.data); // Assuming 'data' property contains template data array
//     } catch (error) {
//       console.error("Error fetching template data:", error);
//     }
//   };

//   fetchData();
// }, []);

export const groupsData = [{ groupName: "", groupPermissions: [] }];

// export const staticoptions

// export const reset = JSON.parse(JSON.stringify(staticoptions));
