import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppErrorBoundary from "../shared/ErrorBoundary/ErrorBoundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    },
    mutations: {}
  }
});

function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppErrorBoundary>
        <>{children}</>
        <ToastContainer position="top-right" />
      </AppErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};
