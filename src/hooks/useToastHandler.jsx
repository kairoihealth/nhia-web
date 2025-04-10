import { useToast } from "../contexts/ToastProvider";
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
    return null; // Or you could return <p>No errors to display.</p>;
  }

  return (
    <ul>
      {errorMessages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
};

export const useHandleSuccess = () => {
  const { showToast } = useToast();

  const handleSuccess = (response, status = true) => {
    showToast(response, status ? "success" : "error");
  };

  return handleSuccess;
};

export const useHandleError = () => {
  const { showToast } = useToast();

  const handleErrors = (error, defaultErrorMessage) => {
    let errorMessage = "An unknown error occurred"; // Default message

    if (error) {
      if (error?.data?.errors) {
        errorMessage = error.data.errors.map((err) => err).join(", ");
      } else {
        errorMessage =
          error?.data?.message ||
          defaultErrorMessage?.toString() ||
          error?.message ||
          errorMessage;
      }
    }

    showToast(errorMessage, "error");
  };

  return handleErrors;
};

export const useResponseHandler = () => {
  const { showToast } = useToast();

  const handleResponse = (error) => {
    const errorList = [];

    if (error?.error) {
      const errorKeys = Object.keys(error.error);
      errorKeys.forEach((key) => {
        errorList.push(...error.error[key]);
      });
    }

    showToast(
      `${error?.message || "An error occurred"}: ${errorList.join(", ")}`,
      "error"
    );
  };

  return handleResponse;
};

ErrorHandler.propTypes = {
  errors: PropTypes.shape({}).isRequired
};
