const validateEmail = (email) => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regEx)) return true;
  else return false;
};
const isInt = (value) => {
  let er = /^-?[0-9]+$/;
  return er.test(value);
};

export const loginValidation = (value) => {
  let errors = {};
  const email = value.email;
  const password = value.password;

  if (email !== "admin") {
    if (email.trim() === "") {
      errors.email = "Email tidak boleh kosong";
    } else if (!validateEmail(email)) {
      errors.email = "Email tidak valid";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password tidak boleh kosong";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const registerValidation = (value) => {
  let errors = {};
  const username = value.username;
  const email = value.email;
  const password = value.password;
  const confirmPassword = value.confirmPassword;

  if (username.trim() === "") {
    errors.fullName = "Full Name tidak boleh kosong";
  }
  if (email.trim() === "") {
    errors.email = "Email tidak boleh kosong";
  } else if (!validateEmail(email)) {
    errors.email = "Email tidak valid";
  }

  if (password.trim() === "") {
    errors.password = "Password tidak boleh kosong";
  } else if (password.length < 6) {
    errors.password = "Password minimal 6";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password tidak sama";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
export const editProfileValidate = (value) => {
  let errors = {};

  const username = value.username;
  const password = value.password;
  const confirmPassword = value.confirmPassword;

  if (username.trim() === "") {
    errors.fullname = "Full Name tidak boleh kosong";
  }
  if (password.trim() === "") {
    errors.password = "Password tidak boleh kosong";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password tidak sama";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const threadValidation = (value) => {
  let errors = {};

  const description = value.description;
  const question = value.question;
  const topic = value.topic;

  if (description.trim() === "") {
    errors.description = "Description tidak boleh kosong";
  }
  if (question.trim() === "") {
    errors.question = "Question tidak boleh kosong";
  }
  if (topic.trim() === "") {
    errors.topic = "Topic tidak boleh kosong";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const commentValidation = (value) => {
  let errors = {};

  const comment = value.comment;

  if (comment.trim() === "") {
    errors.comment = "Comment tidak boleh kosong";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const materialValidation = (value) => {
  let errors = {};

  const materialName = value.materialName;
  const materialType = value.materialType;
  const materialLevel = value.materialLevel;
  const materialDescription = value.materialDescription;

  if (materialName.trim() === "") {
    errors.materialName = "Material Name tidak boleh kosong";
  }
  if (materialType.trim() === "") {
    errors.materialType = "Material Type tidak boleh kosong";
  }
  if (materialLevel.trim() === "") {
    errors.materialLevel = "Material Level tidak boleh kosong";
  } else if (!isInt(materialLevel)) {
    errors.materialLevel = "Material Level hanya boleh mengandung angka saja";
  }
  if (materialDescription.trim() === "") {
    errors.materialDescription = "Material Description tidak boleh kosong";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const courseValidation = (value) => {
  let errors = {};

  const courseName = value.courseName;
  const courseDescription = value.courseDescription;
  const courseReference = value.reference;
  const courseLO = value.lo;

  if (courseName.trim() === "") {
    errors.courseName = "Course Name tidak boleh kosong";
  }
  if (courseDescription.trim() === "") {
    errors.courseDescription = "Course Description tidak boleh kosong";
  } else if (courseDescription.length >= 250) {
    errors.courseDescription =
      "Course Description tidak boleh lebih dari 250 Karakter";
  }
  if (courseReference.trim() === "") {
    errors.courseReference = "Course Reference tidak boleh kosong";
  } else if (courseReference.length >= 250) {
    errors.courseReference =
      "Course Reference tidak boleh lebih dari 250 Karakter";
  }
  if (courseLO.trim() === "") {
    errors.courseLO = "Course Learning Outcomes tidak boleh kosong";
  } else if (courseLO.length >= 250) {
    errors.courseLO = "Course Outcomes tidak boleh lebih dari 250 Karakter";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
