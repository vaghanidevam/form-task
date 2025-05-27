import React from "react";
import { useSelector } from 'react-redux';
import { useState, useRef } from "react";
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import {
    Box,
    TextField,
    Checkbox,
    Radio,
    RadioGroup,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormLabel,
    FormGroup,
    Button,
    Typography
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import { submitForm } from '../../serverApi/Form';
import toast from 'react-hot-toast';

function ViewForm() {
    const [formData, setFormData] = useState({});
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    const fileInputRef = useRef();

    const handleFieldChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        console.log(formData)
        submitForm(formId, formData);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setFormData({});
        toast.success("Form submitted successfully");
    };
    const form = useSelector(state => state.form.form);
    const formId = useSelector(state => state.form.formId);
    const Pattern = [
        [6, 6, 12, 6, 6, 12, 6, 6],
        [12, 6, 6, 12, 12, 12],
        [12, 12, 12, 12, 12],
        [12, 6, 6, 6, 6, 12, 12],
        [6, 6, 6, 6, 12, 12, 12],
        [6, 6, 12, 6, 6, 6, 6, 12]
    ];



    const columnPattern = Pattern[form.patternNumber || 0];
    console.log("Column Pattern:", form.patternNumber)

    console.log(columnPattern)

    const renderField = (field, index) => {
        const commonGridProps = {
            key: index,
            item: true,
            xs: 12,
            size: ["text", "email", "number", "password", "date"].includes(field.type)
                ? columnPattern[index % columnPattern.length]
                : 12,
        };
        switch (field.type) {

            case "text":
            case "email":
            case "number":
            case "password":
                return (
                    <Grid {...commonGridProps} key={index}>
                        <TextField
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            variant={field.variant || "outlined"}
                            placeholder={field.placeholder}
                            required={field.required}
                            disabled={field.disabled}
                            fullWidth
                            size="small"
                            value={formData[field.name] || ""}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                );

            case "date":
                return (
                    <Grid {...commonGridProps} sx={{ mt: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label={field.label}
                                required={field.required}
                                disabled={field.disabled}
                                value={formData[field.name] || null}
                                onChange={(newValue) =>
                                    handleFieldChange(field.name, dayjs(newValue))
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: "small",
                                        placeholder: field.placeholder,
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                );


            case "file":
                return (
                    <Grid item size={12} key={index} sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1, mt: 1 }}>
                        <FormLabel sx={{ color: 'black' }}>{field.label}</FormLabel>
                        <TextField
                            inputRef={fileInputRef}
                            required={field.required}
                            disabled={field.disabled}
                            type="file"
                            size="small"
                            fullWidth
                            onChange={(e) => handleFieldChange(field.name, e.target.files[0])}
                        />
                    </Grid>
                );


            case "checkbox":
                return (
                    <Grid item size={12} key={index} sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1, mt: 1 }} >
                        <FormLabel sx={{ color: 'black' }}>{field.label}</FormLabel>
                        <FormGroup row>
                            {field.option?.map((opt, i) => (
                                <FormControlLabel
                                    sx={{ color: 'black' }}
                                    key={i}
                                    control={
                                        <Checkbox
                                            required={field.required}
                                            disabled={field.disabled}
                                            checked={formData[field.name]?.includes(opt) || false}
                                            onChange={(e) => {
                                                const existing = formData[field.name] || [];
                                                handleFieldChange(
                                                    field.name,
                                                    e.target.checked
                                                        ? [...existing, opt]
                                                        : existing.filter((val) => val !== opt)
                                                );
                                            }}
                                        />
                                    }
                                    label={opt}
                                />
                            ))}
                        </FormGroup>
                    </Grid>
                );

            case "radio":
                return (
                    <Grid item size={12} key={index} sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1, mt: 1 }}>
                        <FormLabel sx={{ color: 'black' }}>{field.label}</FormLabel>
                        <RadioGroup
                            row
                            value={formData[field.name] || ""}
                            required={field.required}
                            disabled={field.disabled}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        >
                            {field.option.map((option, i) => (
                                <FormControlLabel
                                    sx={{ color: "black" }}
                                    key={i}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                    </Grid>
                );

            case "Select":
                return (
                    <Grid item size={12} key={index} mt={1}>
                        <FormControl fullWidth size="small">
                            <InputLabel sx={{ color: 'black' }}>{field.label}</InputLabel>
                            <Select
                                required={field.required}
                                disabled={field.disabled}
                                value={formData[field.name] || ""}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                label={field.label}
                            >
                                {field.option?.map((opt, i) => (
                                    <MenuItem key={i} value={opt} sx={{ color: 'black' }}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                );

            default:
                return (
                    <Grid {...commonGridProps} sx={{ mt: 1 }}>
                        <TextField
                            label={field.label}
                            variant="outlined"
                            fullWidth
                            size="small"
                        />
                    </Grid>
                );

        }
    };
    const FormFields = form.formFields || [];

    console.log(FormFields)

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                padding: { md: 4, xs: 1 },
            }}
        >
            <Box
                sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(to right, #ffffff, #f8fafc)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e0e0e0',
                    transition: '0.3s ease',
                    '&:hover': {
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                    },
                    color: 'white',
                    padding: { md: 3, xs: 1 },
                    width: '100%',

                }}
            >
                <ThemeProvider theme={theme}>
                    <Box sx={{ mt: { xs: 2, md: 1 } }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: 'black',
                                fontSize: {
                                    xs: '1.3rem',
                                    sm: '2rem',
                                }
                            }}
                        >
                            {form.formName}
                        </Typography>
                    </Box>
                </ThemeProvider>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                        {FormFields.map((field, index) => renderField(field, index))}
                    </Grid>

                    <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit Form
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default ViewForm;
