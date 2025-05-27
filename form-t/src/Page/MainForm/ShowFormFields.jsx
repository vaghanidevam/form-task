// import React from "react";
// import { TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Typography, Paper } from '@mui/material';
// import Box from '@mui/material/Box';
// import { FaEdit, FaTrash } from "react-icons/fa";


// function ShowFormFields({ FormFields, setFormFields, setEditField, setOpenDropdown}) {


//     const handleDelete = (indexToDelete) => {
//         setFormFields(fields => fields.filter((_, index) => index !== indexToDelete));
//     };


//     const handleEdit = (indexToEdit)=>{
//         const data  =  FormFields[indexToEdit];
//         data.edit = true;
//         data.indexNumber = indexToEdit;
//         setEditField(data);
//         setOpenDropdown(true);
//     }

//     console.log(FormFields);
//     if (!FormFields || FormFields.length === 0) {
//         return (
//             <Typography variant="body1" color="text.secondary" sx={{ width: '100%' }}>
//                 No field yet.
//             </Typography>
//         );
//     }

//     return (
//         <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
//             {
//                 FormFields.map((fieldConfig, index) => (
//                     <Box
//                         key={fieldConfig.name}
//                         elevation={3}
//                         sx={{
//                             padding: { xs: 1, md: 1 },
//                             width: 300,
//                             display: "flex",
//                             flexDirection: "row",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             gap: 1,
//                             backgroundColor:'white',
//                             borderRadius:1
//                         }}
//                     >
//                         <Box sx={{ display: "flex", flexDirection: "column", maxWidth: '70%' }}>
//                             <Typography variant="h6" noWrap>
//                                 {fieldConfig.type}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" noWrap>
//                                 {/* your smaller text here, e.g.: */}
//                                 {fieldConfig.name || "Small description"}
//                             </Typography>
//                         </Box>

//                         <Box>
//                             <IconButton size="small" color="primary" onClick={() => handleEdit(index)} >
//                                 <FaEdit />
//                             </IconButton>
//                             <IconButton size="small" color="error" onClick={() => handleDelete(index)} >
//                                 <FaTrash />
//                             </IconButton>
//                         </Box>
//                     </Box>
//                 ))
//             }
//         </Box>
//     );
// }

// export default ShowFormFields;
