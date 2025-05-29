const Form = require("./form");
const FormField = require("./formField");
const FormData = require("./formSubmit");

exports.createForm = async (req, res) => {
  try {
    console.log("this is controller code");

    const { formData } = req.body;
 console.log(formData)
    if (!formData || !formData.FormFields || !formData.formName) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
      });
    }

    // Create a new form instance
    const form = new Form({
      formName: formData.formName,
      patternNumber: formData.patternNumber,
    });

    const fields = formData.FormFields;
    const fieldIds = [];

    // Save each field and collect its ID
    for (const field of fields) {
      const formField = new FormField({
        type: field.type,
        label: field.label,
        placeholder: field.placeholder,
        variant: field.variant,
        required: field.required,
        disabled: field.disabled,
        name: field.name,
        option: field.option,
        formId: form._id,
      });

      await formField.save();
      fieldIds.push(formField._id);
    }

    // Assign field IDs to the form and save it
    form.formFields = fieldIds;
    await form.save();

    res.status(201).json({
      success: true,
      message: "Form created successfully",
      formId: form._id,
    });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({
      success: false,
      message: "Form creation failed",
      error: error.message,
    });
  }
};



exports.allFormData = async (req, res) => {
  try {
    console.log("this is form data controller")
    const form = await Form.find().populate("formFields", "type label placeholder variant required disabled name option").exec();
    res.status(200).json({
      success: true,
      message: "Form data retrieved successfully",
      form,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Form creation failed",
      error: error.message,
    });
  }
}


exports.deleteForm = async (req, res) => {
  try {
    console.log("this is delete form controller")
    const { formId } = req.body;
    console.log(formId)
    const formData = await Form.findById(formId);
    for (let fieldId of formData.formFields) {
      console.log(fieldId);
      await FormField.findOneAndDelete(fieldId)
    }

   await FormData.deleteMany({ formId: formId });

    await Form.findOneAndDelete(formId);
    res.status(200).json({
      success: true,
      message: "Form successfuly deleted!"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Form creation failed",
      error: error.message,
    });
  }
}


exports.submitForm = async (req, res) => {
  try {

    console.log("this is submit form controller")
    const { formId, formData } = req.body;
    console.log(formData)
    const form = await Form.findById(formId).populate("formFields").exec();
    if (!form) {
      return res.status(404).json({ error: "Form template not found" });
    }


    for (const field of form.formFields) {
console.log(field)
      console.log("hegededve")
      const value = formData[field.name];
console.log(value)
      if (field.required && (!value || value === "")) {
        return res.status(400).json({ error: "Your form is not valid" });
      }

      if (value) {
        if (field.type === "number" && isNaN(Number(value))) {
          return res.status(400).json({ error: "Your form is not valid" });
        }

        if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
          return res.status(400).json({ error: "Your form is not valid" });
        }

        if (field.type === "date" && isNaN(Date.parse(value))) {
          return res.status(400).json({ error: "Your form is not valid" });
        }


        if (field.type === "text" && typeof value !== "string") {
          return res.status(400).json({ error: "Your form is not valid" });
        }

      }
    }

    console.log("heydfeyvddsbcdscdscsdvfjhhhhhhh",formData);
 const formSubmitData = new FormData({
  formId:formId,
  data:formData
 });
 await formSubmitData.save()
 return res.status(200).json({
  message: "Form submitted successfully",
  success: true,
 })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Form submission failed",
      error: error.message,
    });
  }
}