import { useToast } from "./useToast";

export const useHandleSuccess = () => {
  const { showToast } = useToast();

  const handleSuccess = (response, status = true) => {
    console.log("handleSuccess called with:", { response, status });
    showToast(response, status ? "success" : "error");
  };

  return handleSuccess;
};

export const useHandleError = () => {
  const { showToast } = useToast();

  const handleErrors = (error, defaultErrorMessage) => {
    let errorMessage = "An unknown error occurred"; // Default message

    if (error) {
      // The new error format is often at the top level of the error response.
      if (error?.errors && typeof error.errors === "object") {
        errorMessage = extractErrorMessages(error.errors);
      } else if (error?.data?.errors) {
        errorMessage = error?.data?.errors?.map((err) => err).join(", ");
      } else if (error?.response?.data?.errors) {
        // This handles errors nested inside a `response` object.
        errorMessage = extractErrorMessages(error?.response?.data?.errors);
      } else {
        errorMessage =
          typeof error === "string"
            ? error
            : error?.data?.message ||
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
      "error",
    );
  };

  return handleResponse;
};

function extractErrorMessages(errors) {
  const messages = [];
  if (typeof errors === "object" && errors !== null) {
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        const value = errors[key];
        // Capitalize the first letter of the key for better readability
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        const errorString = Array.isArray(value) ? value.join(", ") : value;
        messages.push(<div key={key}>{`${formattedKey}: ${errorString}`}</div>);
      }
    }
  }
  return messages;
}
