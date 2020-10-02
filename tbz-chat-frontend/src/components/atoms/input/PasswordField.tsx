import React, { useCallback, useState } from "react";
import TextField, { TextFieldProps } from "./TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";

type PasswordFieldProps = Omit<TextFieldProps, "type" | "InputProps">;

const PasswordField = (props: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = useCallback(
    () => setShowPassword((showPassword) => !showPassword),
    []
  );

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <IconButton onClick={toggleShowPassword}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        ),
      }}
    />
  );
};

export default PasswordField;
