import { useState, useRef } from "react";

function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});

  // Tạo refs động dựa trên initialValues
  Object.keys(initialValues).forEach((key) => {
    if (!inputRefs.current[key]) {
      inputRefs.current[key] = { current: null };
    }
  });

  // Handle khi input thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update value
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error của field đang sửa
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle khi submit form
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();

    // Chạy validation
    const validationErrors = validate(values);

    // Nếu có lỗi
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // Scroll đến field lỗi đầu tiên
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorRef = inputRefs.current[firstErrorField];

      if (errorRef?.current) {
        errorRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        errorRef.current.focus();
      }

      return;
    }
    onSubmit(values);
  };

  // Reset form về trạng thái ban đầu
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    inputRefs: inputRefs.current,
    handleChange,
    handleSubmit,
    resetForm,
    setErrors,
  };
}

export default useForm;
