import { TextField, TextFieldProps, InputProps as MuiInputProps } from '@material-ui/core'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search';

export type SearchFieldProps = Omit<TextFieldProps, "variant" | "fullWidth" | "type" | "label">

const SearchField = (props: SearchFieldProps) => {

    const InputProps: Partial<MuiInputProps> = {
        ...props.InputProps,
        endAdornment: <SearchIcon fontSize="small" />
    }

    return (
        <TextField
            variant="standard"
            fullWidth
            type="search"
            {...props}
            InputProps={InputProps}
        />
    )
}

export default SearchField
