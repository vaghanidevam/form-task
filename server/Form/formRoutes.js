const express = require("express");
const router = express.Router();
const { createForm, allFormData , deleteForm ,submitForm} = require("./formController");

router.post("/create", createForm);
router.get("/getAll", allFormData);
router.post("/delete", deleteForm);
router.post("/submit", submitForm);

module.exports = router;
