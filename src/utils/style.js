export const selectStyles = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    height: "60px",
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    border: state.isFocused ? "1px solid #038F3E" : "1px solid #DADADA",
    fontSize: "16px",
    fontFamily: "General Sans !important",
    boxShadow: state.isFocused ? null : null, // Remove default focus shadow
    "&:hover": {
      borderColor: state.isFocused ? "#038F3E" : "#DADADA"
    }
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "General Sans !important",
    zIndex: 10000 // Ensure it's above other elements
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "16px",
    fontWeight: 500,
    backgroundColor: state.isFocused
      ? "#038F3E"
      : state.isSelected
      ? "#027A3B"
      : null,
    color: state.isFocused || state.isSelected ? "#FFFFFF" : "#000000"
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "16px", // Match the font size of the options
    color: "#000000",
    fontFamily: "General Sans !important"
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "16px", // Match the font size of the options
    color: "#000000",
    fontFamily: "General Sans !important"
  })
};

export const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    // color: "#000000",
    color: "#000000",
    border: "0.5px solid #DADADA",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E"
    }
  }
};

export const formControlStyles = {
  width: "100%",
  height: "55px",
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
  // color: "#000000",
  color: "#000000",
  border: "0.5px solid #DADADA",
  paddingY: "34px",
  fontSize: "16px",
  outline: "none"
};

export const multiLineStyles = {
  "& .MuiOutlinedInput-root": {
    height: "204px",
    borderRadius: "8px",
    color: "#000000",
    "& .MuiOutlinedInput-input": {
      paddingTop: 0,
      paddingBottom: "16px",
      marginTop: 0,
      alignSelf: "flex-start"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E"
    }
  }
};
