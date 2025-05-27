import React from "react";
import { useState, useEffect } from "react";
import { Box, TextField, FormControl, InputLabel, Select, IconButton, MenuItem, Typography, Switch, FormControlLabel, Button, FormLabel, RadioGroup, Radio, Checkbox, FormGroup } from '@mui/material';
import { VscPreview } from "react-icons/vsc";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';


function AddFieldFormat({ setDeleteButtonOn, count, setOpenDropdown, setFormFields, type, editField, FormFields, setEditField, setSelectedOption }) {
    // console.log(type)
    // console.log('editField', editField)
    const [fieldConfig, setFieldConfig] = useState({
        type: type,
        label: '',
        placeholder: '',
        variant: 'outlined',
        required: false,
        disabled: false,
        name: '',
        option: [],
        edit: false,
    });



    const handleInputType = (e) => {
        setFieldConfig((prev) => ({ ...prev, type: e.target.value }));
    }


    const [newOption, setNewOption] = useState();
    const Variant = ['text']
    const multiOptions = ['checkbox', 'radio', 'Select'];
    // console.log(type);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFieldConfig((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitch = (e) => {
        const { name, checked } = e.target;
        setFieldConfig((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (fieldConfig.edit) {
            // console.log('Edit Field', fieldConfig)
            const newFields = [...FormFields];
            newFields[fieldConfig.indexNumber] = fieldConfig;
            setFormFields(newFields);
            setEditField([]);
            setOpenDropdown(false);
            setDeleteButtonOn(true);
            toast.success('Field updated successfully!');
        } else {
            setFormFields((prev) => [...prev, fieldConfig]);
            setOpenDropdown(false);
            toast.success('Field created successfully!');
        }
    };

    const handleOption = (e) => {
        e.preventDefault();
        const trimmed = newOption.trim();
        if (trimmed === '') return;
        // console.log(trimmed)
        setFieldConfig((prev) => ({
            ...prev,
            option: [...prev.option, trimmed]
        }))
        setNewOption('');
    }


    const handleDeleteOption = (index) => {
        setFieldConfig((prev) => ({
            ...prev,
            option: prev.option.filter((_, i) => i !== index),
        }));
    };


    useEffect(() => {
        setFieldConfig({
            type: type,
            label: '',
            placeholder: '',
            variant: 'outlined',
            required: false,
            disabled: false,
            name: '',
            option: [],
        });
    }, [count])


    useEffect(() => {
        if (editField && editField.edit) {
            setFieldConfig(editField);
            setSelectedOption(editField.type)
        }
    }, [editField]);


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', border: '1px dashed #c0c0c0', borderRadius: 2, backgroundColor: '#f9fafb', color: 'black', p: 2 }} component="form"
            onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom >
                Create Form Input Field:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: 'row', gap: 2, p: { md: 1, xs: 0 }, width: '100%' }} >
                <TextField
                    label="Label"
                    name="label"
                    size="small"
                    value={fieldConfig.label}
                    onChange={handleChange}
                    sx={{ width: "50vw" }}
                />
                <TextField
                    label="Placeholder"
                    name="placeholder"
                    size="small"
                    value={fieldConfig.placeholder}
                    onChange={handleChange}
                    sx={{ width: "50vw" }}

                />
            </Box>
            <Box sx={{ display: "flex", flexDirection: 'row', gap: 2, p: { md: 1, xs: 0 }, pt: { xs: 2 }, width: '100%' }}>
                {Variant.includes(type) && (
                    <FormControl
                        fullWidth
                        sx={{ width: "50%" }}
                    >
                        <InputLabel id="variant-label">Variant</InputLabel>
                        <Select
                            labelId="variant-label"
                            label="Variant"
                            name="variant"
                            size="small"
                            value={fieldConfig.variant}
                            onChange={handleChange}
                        >
                            <MenuItem value="outlined">outlined</MenuItem>
                            <MenuItem value="filled">filled</MenuItem>
                            <MenuItem value="standard">standard</MenuItem>
                        </Select>
                    </FormControl>
                )}

                <TextField
                    label="Name"
                    name="name"
                    size="small"
                    required={true}
                    sx={{
                        width: Variant.includes(type) ? "50%" : "100%"
                    }}
                    value={fieldConfig.name}
                    onChange={handleChange}
                />
            </Box>
            {Variant.includes(type) && (<Box sx={{ display: "flex", flexDirection: 'row', gap: 2, p: { md: 1, xs: 0 }, pt: { xs: 2 }, width: '100%' }}>
                <FormControl
                    fullWidth
                    sx={{ width: "100%" }}
                >
                    <InputLabel id="variant-label">Input Types</InputLabel>
                    <Select
                        labelId="variant-label"
                        label="Input Types"
                        name="type"
                        size="small"
                        value={fieldConfig.type}
                        onChange={handleInputType}
                    >
                        <MenuItem value="text">text</MenuItem>
                        <MenuItem value="email">email</MenuItem>
                        <MenuItem value="password">password</MenuItem>
                        <MenuItem value="number">number</MenuItem>
                    </Select>
                </FormControl>
            </Box>)}



            <Box sx={{ display: "flex", flexDirection: 'row', gap: 2, p: { md: 1, xs: 0 }, pt: { xs: 2 }, width: '100%' }} >
                <FormControlLabel
                    control={
                        <Switch
                            checked={fieldConfig.required}
                            onChange={handleSwitch}
                            name="required"
                        />
                    }
                    label="Required"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={fieldConfig.disabled}
                            onChange={handleSwitch}
                            name="disabled"
                        />
                    }
                    label="Disabled"
                />
            </Box>
            {

                multiOptions.includes(fieldConfig.type) && (

                    <Box
                        sx={{
                            width: '100%',
                            backgroundColor: "#f5f5f5",
                            borderRadius: 1,
                            p: { xs: 1, md: 2 },
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Add Options:
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                size="small"
                                placeholder="Enter option"
                                value={newOption || ''}
                                onChange={(e) => setNewOption(e.target.value)}
                                sx={{ flex: 1 }}
                            />
                            <Button variant="contained" onClick={handleOption}>
                                Add
                            </Button>
                        </Box>

                        {fieldConfig.option && fieldConfig.option.length > 0 && (
                            <Box
                                sx={{
                                    mt: 2,
                                    maxHeight: 200,
                                    overflowY: 'auto',
                                    pr: 1,
                                }}
                            >
                                <Grid container spacing={1}>
                                    {fieldConfig.option.map((opt, index) => (
                                        <Grid size={{ xs: 12, md: 6 }} key={index}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    backgroundColor: '#f9f9f9',
                                                    borderRadius: 1,
                                                    px: 2,
                                                    py: { md: 1, xs: 0.5 },
                                                    border: '1px solid #ddd',
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ wordBreak: 'break-word', flex: 1 }}>
                                                    {opt}
                                                </Typography>
                                                <IconButton
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDeleteOption(index)}
                                                    sx={{ ml: 1 }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                        )}
                    </Box>

                )

            }

            {fieldConfig.option && fieldConfig.option.length > 0 && (
                <Box
                    sx={{
                        width: "100%",
                        mt: 1,
                        borderRadius: 1,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 1, md: 2 },
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <VscPreview />
                        <Typography>Preview:</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            width: "100%",
                        }}
                    >
                        {multiOptions.includes(fieldConfig.type) && (
                            <>
                                {fieldConfig.type === "radio" ? (
                                    <FormControl
                                        component="fieldset"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <FormLabel component="legend">{fieldConfig.label}</FormLabel>
                                        <RadioGroup
                                            aria-label={fieldConfig.label}
                                            name={fieldConfig.name}
                                            size="small"
                                            disabled={fieldConfig.disabled}
                                            sx={{ display: "flex", flexDirection: "row" }}
                                        >
                                            {fieldConfig.option?.map((opt, i) => (
                                                <FormControlLabel
                                                    size="small"
                                                    key={i}
                                                    value={opt}
                                                    control={<Radio disabled={fieldConfig.disabled} />}
                                                    label={opt}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                ) : fieldConfig.type === "Select" ? (
                                    <FormControl sx={{ width: "100%" }} size="small" disabled={fieldConfig.disabled}>
                                        <InputLabel>{fieldConfig.label}</InputLabel>
                                        <Select
                                            label={fieldConfig.label}
                                            defaultValue=""
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 200,
                                                    },
                                                },
                                            }}
                                        >
                                            {fieldConfig.option?.map((opt, i) => (
                                                <MenuItem key={i} value={opt}>
                                                    {opt}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <Box
                                        sx={{
                                            width: "100%",
                                            overflowWrap: "break-word",
                                            wordBreak: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        <FormGroup sx={{ display: "flex", flexDirection: "column", gap: 1, flexWrap: "wrap",  }}>
                                            <InputLabel sx={{color:'black'}}>{fieldConfig.label}</InputLabel>
                                            {fieldConfig.option?.map((opt, i) => (
                                                <FormControlLabel
                                                    key={i}
                                                    control={<Checkbox />}
                                                    label={opt}
                                                />
                                            ))}
                                        </FormGroup>
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                </Box>

            )
            }

            <Box sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' }, gap: 1, justifyContent: 'space-between' }}>
                {
                    Variant.includes(fieldConfig.type) && (
                        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 1 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Preview:
                            </Typography>
                            <TextField
                                size="small"
                                type={fieldConfig.type || 'text'}
                                label={fieldConfig.label}
                                placeholder={fieldConfig.placeholder}
                                variant={fieldConfig.variant}
                                name={fieldConfig.name}
                                // required={fieldConfig.required}
                                disabled={fieldConfig.disabled}
                                fullWidth
                            />
                        </Box>
                    )

                }


                {fieldConfig.type === 'date' && (
                    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 1 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Preview:
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label={fieldConfig.label}
                                disabled={fieldConfig.disabled}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: "small",
                                        placeholder: fieldConfig.placeholder
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                )}
                {fieldConfig.type === 'file' && (
                    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 1 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Preview:
                        </Typography>
                        <TextField
                            size="small"
                            type='file'
                            placeholder={fieldConfig.placeholder}
                            name={fieldConfig.name}
                            // required={fieldConfig.required}
                            disabled={fieldConfig.disabled}
                            fullWidth
                        />
                    </Box>
                )}


                {fieldConfig.edit ? (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                    >
                        Save
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                    >
                        Add Field
                    </Button>
                )}


            </Box>

        </Box>
    );
}


export default AddFieldFormat;