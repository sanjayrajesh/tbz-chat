import React, { useCallback, useState } from "react";
import TextField, { TextFieldProps } from "./TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";
import useLanguage from "../../../util/hooks/useLanguage";

type PasswordFieldProps = Omit<TextFieldProps, "type" | "InputProps">;

const PasswordField = (props: PasswordFieldProps) => {

  const getString = useLanguage();

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
          <IconButton size="small" tabIndex={-1} title={showPassword ? getString("hide.password") : getString("show.password")} onClick={toggleShowPassword}>
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        ),
      }}
    />
  );
};

export default PasswordField;
