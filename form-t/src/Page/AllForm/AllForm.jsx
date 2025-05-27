import React, { useEffect, useState } from "react";
import { getAllFormsData } from '../../serverApi/Form'
import Box from '@mui/material/Box';
import { TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button, Card, CardContent } from '@mui/material';
import { deleteForm } from '../../serverApi/Form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setForm } from '../../slice/Formslice';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AllForm() {
  const [forms, setForms] = useState();
  const dispatch = useDispatch();



  const navigate = useNavigate();
  const getAllData = () => {
    getAllFormsData().then((res) => {
      setForms(res.data.form)
    })
  }


  const handleViewForm = (form, index) => {
    console.log(form)
    console.log(index)
    dispatch(setForm(form, form._id || null));
    navigate("/viewForm")
  }

  useEffect(() => {
    getAllData()
  }, []);

  const handleDelete = (formId) => {
    deleteForm(formId)
      .then((res) => {
        console.log(res);
        toast.success('Form deleted successfully');
        getAllData();
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete form');
      });
  };

  console.log(forms)
  return (

    <Box
      sx={{
        width: '100%',
        mt: 3
      }}
    >

      <Box sx={{
        width: { md: "70%", xs: "90%" }, m: 2, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: 3,
        background: 'linear-gradient(to right, #ffffff, #f8fafc)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e0e0e0',
        transition: '0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
        }
      }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 'bold', textAlign: 'center', width: '100%', color: 'black', pb: 2, my: 2 }}>
          All Forms
        </Typography>
        <Box
          sx={{
            width: '98%',
            height: { xs: '0.5px', md: '0.5px' },          
            backgroundColor: 'black',
            mt: { xs: 1, md: 1 },
            mb: 1,                  
            borderRadius: 1,        
          }}
        />

        {forms && forms.length > 0 ? (
          forms.map((form, index) => (
            <Card
              key={index}
              sx={{
                width: '97%',
                mb: 2,
                p: 2,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                gap: 2,
                boxShadow: 1,
                borderRadius: 2,
                backgroundColor: '#fff',
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: '#333', fontWeight: 500 }}
              >
                {form.formName || 'Untitled Form'}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1.5,
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewForm(form, index)}
                  startIcon={<VisibilityIcon />}
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  View
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(form._id)}
                  startIcon={<DeleteIcon />}
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', my: 6, color: 'gray' }}>
            <InsertDriveFileIcon sx={{ fontSize: 50, mb: 1 }} />
            <Typography variant="body1">
              No forms available.
            </Typography>
          </Box>
        )}
      </Box>

    </Box>

  );
}


