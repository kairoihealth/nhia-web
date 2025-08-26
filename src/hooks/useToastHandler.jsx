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
      if (error?.data?.errors) {
        errorMessage = error?.data?.errors?.map((err) => err).join(", ");
      } else if (error?.response?.data?.errors) {
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
      "error"
    );
  };

  return handleResponse;
};

function extractErrorMessages(errors) {
  const messages = [];

  const recurse = (value) => {
    if (!value) return;

    if (typeof value === "string") {
      messages.push(<div>{value}</div>);
    } else if (Array.isArray(value)) {
      value.forEach((item) => recurse(item));
    } else if (typeof value === "object") {
      Object.values(value).forEach((innerVal) => recurse(innerVal));
    }
  };

  recurse(errors);
  return messages;
}
