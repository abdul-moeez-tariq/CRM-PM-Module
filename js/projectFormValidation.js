export function initProjectFormValidation() {
  const form = $("#projectForm");
  if (!form.length) return; // Prevent JS errors if form not on page

  form.validate({
    rules: {
      projectTitle: { required: true, minlength: 3 },
      projectCode: { required: true, minlength: 2 }
    },
    messages: {
      projectTitle: { required: "Enter Project Title", minlength: "Minimum 3 characters" },
      projectCode: { required: "Enter Project Code", minlength: "Minimum 2 characters" }
    },
    highlight: function(element) { $(element).css("border", "2px solid red"); },
    unhighlight: function(element) { $(element).css("border", "2px solid green"); },
    errorPlacement: function(error, element) {
      if (element.attr("id") === "projectTitle") $("#projectTitleError").html(error);
      if (element.attr("id") === "projectCode") $("#projectCodeError").html(error);
    },
    submitHandler: function(form) { form.submit(); }
  });
}