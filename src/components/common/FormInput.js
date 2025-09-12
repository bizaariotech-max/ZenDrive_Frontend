// src/components/common/FormInput.jsx
import React from "react";
import { TextField, MenuItem } from "@mui/material";

const FormInput = ({
  label,
  name,
  placeholder,
  type = "text",
  options = [],
  ...props
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <TextField
            select
            fullWidth
            id={name}
            name={name}
            variant="outlined"
            size="small"
            className="custom-input"
            {...props}
          >
            <MenuItem value="" disabled>
              {placeholder || "Select an option"}
            </MenuItem>
            {options.map((opt) => (
              <MenuItem key={opt?._id} value={opt?._id}>
                {opt?.lookup_value}
              </MenuItem>
            ))}
          </TextField>
        );

      case "number":
        return (
          <TextField
            type="number"
            fullWidth
            id={name}
            name={name}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            className="custom-input"
            {...props}
          />
        );

      case "text":
      default:
        return (
          <TextField
            type="text"
            fullWidth
            id={name}
            name={name}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            className="custom-input"
            {...props}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-base font-semibold">
          {label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default FormInput;
