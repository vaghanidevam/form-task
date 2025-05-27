import React, { useState } from "react";
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
  IconButton
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'



function PreviewForm({ FormFields, formName, setPatternNumber, setFormFields, setEditField, setOpenDropdown, deleteButtonOn, setDeleteButtonOn }) {
  const [selectedValue, setSelectedValue] = useState(0);



  const handleDelete = (index) => {
    console.log("Delete clicked for field at index:", index);
    setFormFields(fields => fields.filter((_, i) => i !== index));
    setOpenDropdown(false);
  }

  const handleEdit = (index) => {
    console.log("Edit clicked for field at index:", index);
    setDeleteButtonOn(false);
    const data = FormFields[index];
    data.edit = true;
    data.indexNumber = index;
    setEditField(data);
    setOpenDropdown(true);
  }

  const handleChange = (event) => {
    const value = Number(event.target.value);
    setSelectedValue(value);
    setPatternNumber(value);
    console.log(value);
  };

  console.log(formName)
  const Pattern = [
    [6, 6, 12, 6, 6, 12, 6, 6],
    [12, 6, 6, 12, 12, 12],
    [12, 12, 12, 12, 12],
    [12, 6, 6, 6, 6, 12, 12],
    [6, 6, 6, 6, 12, 12, 12],
    [6, 6, 12, 6, 6, 6, 6, 12]]
  const columnPattern = Pattern[selectedValue];
  console.log("this is form preview form ", FormFields)



  const renderField = (field, index) => {
    const commonGridProps = {
      key: index,
      size: {
        md: ["text", "date", "number", "email", "tel", "password"].includes(field.type)
          ? columnPattern[index % columnPattern.length]
          : 12, xs: 12
      },
    };
    switch (field.type) {
      case "text":
      case "number":
      case "tel":
      case "password":
      case "email":
        return (
          <Grid
            item
            {...commonGridProps}
            sx={{
              mt: 1,
              color: 'text.secondary',
              backgroundColor: '#f9fafb',
              borderRadius: 2,
              border: '1px dashed #c0c0c0',
              position: 'relative',
            }}
          >
            <Box sx={{ p: { xs: 5, sm: 5 }, pt: 6 }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                }}
              >

                <IconButton size="small" onClick={() => handleEdit(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  disabled={!deleteButtonOn}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

              </Box>

              {/* Text Field */}
              <TextField
                label={field.label || ''}
                type={field.type || 'text'}
                variant={field.variant || 'outlined'}
                placeholder={field.placeholder || ''}
                fullWidth
                size="small"
              />
            </Box>
          </Grid>

        );


      case "date":
        return (
          <Grid
            item
            {...commonGridProps}
            key={index}
            sx={{
              mt: 1,
              color: 'text.secondary',
              backgroundColor: '#f9fafb',
              borderRadius: 2,
              border: '1px dashed #c0c0c0',
            }}
          >
            <Box sx={{ mt: 1, p: { xs: 5, sm: 5 }, position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton size="small" onClick={() => handleEdit(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  disabled={!deleteButtonOn}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={field.label}
                  disabled={field.disabled}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      placeholder: field.placeholder,
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
        );


      case "file":
        return (
          <Grid
            item
            size={12}
            key={index}
            sx={{
              mt: 1,
              color: 'text.secondary',
              backgroundColor: '#f9fafb',
              borderRadius: 2,
              border: '1px dashed #c0c0c0',
            }}
          >
            <Box sx={{ mt: 1, p: { xs: 5, sm: 5 }, position: 'relative' }}>
              {/* Top-right icons */}
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton size="small" onClick={() => handleEdit(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  disabled={!deleteButtonOn}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* File Input */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormLabel >{field.label}</FormLabel>
                <TextField

                  size="small"
                  type="file"
                  placeholder={field.placeholder}
                  name={field.name}
                  disabled={field.disabled}
                  fullWidth
                />
              </Box>

            </Box>
          </Grid>
        );


      case "checkbox":
        return (
          <Grid
            item
            size={12}
            key={index}
            sx={{
              mt: 1,
              color: 'text.secondary',
              backgroundColor: '#f9fafb',
              borderRadius: 2,
              border: '1px dashed #c0c0c0',
            }}
          >
            <Box sx={{ p: { xs: 5, sm: 5 }, position: 'relative' }}>
              {/* Top-right icons */}
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton size="small" onClick={() => handleEdit(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  disabled={!deleteButtonOn}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Checkbox Group */}
              <FormLabel component="legend">{field.label}</FormLabel>
              <FormGroup
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 1,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  mt: 1,
                }}
              >
                {field.option?.map((opt, i) => (
                  <FormControlLabel
                    key={i}
                    control={<Checkbox />}
                    label={opt}
                  />
                ))}
              </FormGroup>
            </Box>
          </Grid>
        );

      case "Select":
        return (
          <Grid
            item
            size={12}
            key={index}
            sx={{
              mt: 1,
              color: 'text.secondary',
              backgroundColor: '#f9fafb',
              borderRadius: 2,
              border: '1px dashed #c0c0c0',
            }}
          >
            <Box sx={{ mt: 1, p: { xs: 5, sm: 5 }, position: 'relative' }}>
              {/* Top-right icons */}
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton size="small" onClick={() => handleEdit(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  disabled={!deleteButtonOn}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Dropdown Field */}
              <FormControl fullWidth size="small" disabled={field.disabled}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  label={field.label}
                  defaultValue=""
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {field.option?.map((opt, i) => (
                    <MenuItem key={i} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        );

      case "radio":
        return (
          <Grid
            item
            size={12}
            key={index}
            sx={{
              mt: 1,
              color: 'text.secondary',
              backgroundColor: '#f9fafb',
              borderRadius: 2,
              border: '1px dashed #c0c0c0',
            }}
          >
            <Box sx={{ p: { xs: 5, sm: 5 }, position: 'relative' }}>
              {/* Top-right icons */}
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton size="small" onClick={() => handleEdit(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  disabled={!deleteButtonOn}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>


              <FormLabel component="legend">{field.label}</FormLabel>

              <RadioGroup
                row

                disabled={field.disabled}

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
            </Box>
          </Grid>
        )
    }

  }
  return (

    <Box sx={{

      p: 1, borderRadius: 3, width: "100%",
    }}>

      <Box sx={{
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        <Box>
          <FormControl
            // variant="outlined"
            size="small"
            sx={{
              width: '100%',
              m: 2
            }}
          >
            <InputLabel id="pattern-type-label" shrink={true}>
              Pattern Type
            </InputLabel>
            <Select
              labelId="pattern-type-label"
              value={selectedValue}
              onChange={handleChange}
              label="Pattern Type"
              displayEmpty
              sx={{
                borderRadius: 2,
              }}
            >
              <MenuItem disabled value="">
                <em>Select a pattern</em>
              </MenuItem>
              <MenuItem key={0} value={0}>
                standardRepeat
              </MenuItem>
              <MenuItem key={1} value={1}>
                splitGroup
              </MenuItem>
              <MenuItem key={2} value={2}>
                allFullWidth
              </MenuItem>
              <MenuItem key={3} value={3}>
                groupedSixesWithEnds
              </MenuItem>
              <MenuItem key={4} value={4}>
                stackedShortToFull
              </MenuItem>
              <MenuItem key={5} value={5}>
                alternateFlow
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: { xs: '0.5px', md: '0.5px' },
            backgroundColor: 'black',
            mt: { xs: 1, md: 1 },
            mb: 1,
            borderRadius: 1,
          }}
        />

        <Box
          sx={{
            fontSize: { xs: 20, md: 28 },
            fontWeight: 'bold',
            color: '#1a202c',
            p: 2,
            width: '100%',
            maxWidth: '100%',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            textAlign: 'center',
          }}
        >
          {formName ? formName : 'Write form name'}
        </Box>


      </Box>
      <Box sx={{ width: '100%', mt: 3, }}>
        <Grid container spacing={1} >

          {FormFields.map((field, index) => renderField(field, index))}

        </Grid>
      </Box>
    </Box>
  );
}

export default PreviewForm;
