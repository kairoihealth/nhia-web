import PropTypes from "prop-types";

const getErrors = (errors) => {
  const messages = [];

  if (errors) {
    Object.keys(errors).forEach((key) => {
      const keyErrors = errors[key];
      if (keyErrors) {
        keyErrors.forEach((error) => {
          messages.push(error);
        });
      }
    });
  }

  return messages;
};

export const ErrorHandler = ({ errors }) => {
  const errorMessages = getErrors(errors);

  if (errorMessages.length === 0) {
    return null;
  }

  return (
    <ul>
      {errorMessages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
};

ErrorHandler.propTypes = {
  errors: PropTypes.shape({}).isRequired
};
