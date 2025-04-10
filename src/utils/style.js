export const selectStyles = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    height: "60px",
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    border: state.isFocused ? "1px solid #038F3E" : "1px solid #DADADA",
    fontSize: "16px",
    fontFamily: "General Sans",
    boxShadow: state.isFocused ? null : null, // Remove default focus shadow
    "&:hover": {
      borderColor: state.isFocused ? "#038F3E" : "#DADADA"
    }
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "General Sans",
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
    color: state.isFocused || state.isSelected ? "#FFFFFF" : "#737373"
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "16px", // Match the font size of the options
    color: "#737373",
    fontFamily: "General Sans"
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "16px", // Match the font size of the options
    color: "#737373",
    fontFamily: "General Sans"
  })
};
