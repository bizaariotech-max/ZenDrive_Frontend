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
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-base font-semibold">
          {label}
        </label>
      )}

      {type === "select" ? (
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
      ) : (
        <TextField
          fullWidth
          id={name}
          name={name}
          placeholder={placeholder}
          variant="outlined"
          size="small"
          className="custom-input"
          {...props}
        />
      )}
    </div>
  );
};

export default FormInput;
