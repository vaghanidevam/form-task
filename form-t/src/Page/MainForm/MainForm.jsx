import React, { useState, } from 'react';
import PreviewForm from './PreviewForm';
import Box from '@mui/material/Box';
import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from '@mui/material';
import AddFieldFormat from './AddFieldForm';
import { createForm } from "../../serverApi/Form"
import toast from 'react-hot-toast';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';



function MainForm() {
    const [formName, setFormName] = useState("");
    const [selecctedOption, setSelectedOption] = useState('');
    const [FormFields, setFormFields] = useState([]);
    const [opendropdown, setOpenDropdown] = useState(false);
    const [count, setcount] = useState(0);
    const [editField, setEditField] = useState();
    const [patternNumber, setPatternNumber] = useState();
    const [deleteButtonOn, setDeleteButtonOn] = useState(true);
    const menuOptions = ['text', 'date', 'file', 'checkbox', 'radio', 'Select'];


    const handleCreateForm = () => {

        if (formName === "") {
            toast.error("Enter Form Name");
            return;
        }
    console.log("Form Fields:", FormFields);
        const formData = {
            patternNumber,
            formName,
            FormFields,
        };

        console.log("Form Data:", formData);

        createForm(formData);
        toast.success('Form created successfully!');
        setFormFields([]);
        setFormName('');
        console.log("Will be set:", formData);
    };

    return (
        <Box
            sx={{
                width: '100%',
                p: { md: 2, xs: 1 },

            }}
        >
            <Box
                sx={{
                    width: '100%',
                    p: { md: 2, xs: 1 },
                    m: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    borderRadius: 1,
                }}
            >


                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: { xs: 2, md: 3 },
                        borderRadius: 3,
                        background: 'linear-gradient(to right, #ffffff, #f8fafc)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #e0e0e0',
                        transition: '0.3s ease',
                        '&:hover': {
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                        }
                    }}
                >

                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{ fontWeight: 'bold', textAlign: 'center', width: '100%', color: 'black' }}
                    >
                        Create New Form
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: '1px', md: '1px' },
                            backgroundColor: 'black',
                            mt: { xs: 1, md: 1 },
                            mb: 1,
                            borderRadius: 1,
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        width: '100%',
                        gap: 3,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f9fafb', color: 'text.secondary', borderRadius: 2, border: '1px dashed #c0c0c0', px: 2, py: 3
                    }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Enter form name"
                            label="Form Name"
                            name='formName'
                            required={true}
                            value={formName}
                            sx={{
                                flex: 1,
                                minWidth: 0,
                                width: { xs: '100%', sm: 'auto' },
                            }}
                            onChange={(e) => setFormName(e.target.value)}
                        />

                        <FormControl
                            size="small"
                            sx={{
                                flex: 1,
                                minWidth: 0,
                                width: { xs: '100%', sm: 200 },
                            }}
                        >
                            <InputLabel id="select-label">Select Option</InputLabel>
                            <Select
                                labelId="select-label"
                                label="Select Option"
                                value={opendropdown ? selecctedOption : ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSelectedOption(value);
                                    setcount(count + 1);
                                    setOpenDropdown(value !== '');
                                }}
                                sx={{ width: '100%' }}
                            >
                                <MenuItem value="">Select Option</MenuItem>
                                {menuOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: '0.5px', md: '0.5px' },          // thickness of the line
                            backgroundColor: 'black',
                            mt: { xs: 1, md: 1 },
                            mb: 1,                  // vertical margin (optional)
                            borderRadius: 1,        // optional for soft edges
                        }}
                    />
                    {opendropdown && (

                        <AddFieldFormat
                            type={selecctedOption}
                            setFormFields={setFormFields}
                            setOpenDropdown={setOpenDropdown}
                            count={count}
                            editField={editField}
                            FormFields={FormFields}
                            setEditField={setEditField}
                            setSelectedOption={setSelectedOption}
                            setDeleteButtonOn={setDeleteButtonOn}
                        />

                    )}

                    {
                        !opendropdown && (
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    p: 2,
                                    border: '1px dashed #c0c0c0',
                                    borderRadius: 2,
                                    backgroundColor: '#f9fafb',
                                    color: 'text.secondary',
                                }}
                            >
                                <InfoOutlinedIcon sx={{ color: '#6c757d' }} />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    No input field selected yet.
                                </Typography>
                            </Box>
                        )
                    }
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'space-around',
                        borderRadius: 2,
                        background: 'linear-gradient(to right, #ffffff, #f8fafc)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #e0e0e0',
                        transition: '0.3s ease',
                        '&:hover': {
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                        },
                        p: 2,
                    }}
                >
                    <PreviewForm
                        FormFields={FormFields}
                        setDeleteButtonOn={setDeleteButtonOn}
                        formName={formName}
                        setOpenDropdown={setOpenDropdown}
                        setPatternNumber={setPatternNumber}
                        deleteButtonOn={deleteButtonOn}
                        setEditField={setEditField}
                        setFormFields={setFormFields}
                    />

                    {FormFields.length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleCreateForm}>
                                Create Form
                            </Button>
                        </Box>
                    )}
                </Box>


            </Box>
        </Box>
    );
}

export default MainForm;
