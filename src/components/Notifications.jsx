import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/general";
import FormCardHeader from "../views/enrolees/ComplaintForm/FormCardHeader";
import { useHandleError, useHandleSuccess } from "../hooks/useToastHandler";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import DraftsIcon from "@mui/icons-material/Drafts";

const Notifications = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const userRole = localStorage.getItem("userRole");

  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications", page],
    queryFn: () => getNotifications({ page: page, page_size: pageSize }),
  });

  const totalPages = Math.ceil(notifications?.count / pageSize) || 1;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => {
      handleError(error, "Failed to mark notification as read.");
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      handleSuccess("All notifications marked as read.");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => {
      handleError(error, "Failed to mark all notifications as read.");
    },
  });

  const handleMarkAsRead = (id) => {
    markAsReadMutation.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const handleViewComplaint = (notification) => {
    if (notification.target_type === "complaint" && notification.target_id) {
      let basePath = "";
      switch (userRole) {
        case "Admin":
          basePath = "/admin";
          break;
        case "StateAdmin":
          basePath = "/stateadmin";
          break;
        case "Enrollee":
          basePath = "/enrollee";
          break;
        case "HMO":
          basePath = "/hmo";
          break;
        case "Provider":
          basePath = "/provider";
          break;
      }
      navigate(`${basePath}/complaint/${notification.target_id}`);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: "12px",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          <FormCardHeader
            title="Notifications"
            subtitle="Stay updated with the latest activities."
            subtitleSx={{ mb: 0 }}
          />
        </Box>
        <Button
          onClick={handleMarkAllAsRead}
          disabled={
            markAllAsReadMutation.isLoading ||
            !notifications?.results?.some((n) => !n.is_read)
          }
          size="small"
          variant={isMobile ? "contained" : "text"}
          sx={{
            color: isMobile ? "#fff" : "#1B5E20",
            background: isMobile ? "#1B5E20" : "transparent",
            fontSize: "12px",
            textTransform: "none",
          }}
        >
          Mark all as read
        </Button>
      </Box>

      <List>
        {notifications?.results?.length > 0 ? (
          notifications.results.map((notification, index) => (
            <Box key={notification.id}>
              <ListItem
                sx={{
                  backgroundColor: notification.is_read
                    ? "transparent"
                    : "#F0FDF4",
                  borderRadius: "8px",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  py: 1.5,
                }}
                secondaryAction={
                  !isMobile && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {notification.target_type === "complaint" &&
                        notification.target_id && (
                          <Button
                            size="small"
                            onClick={() => handleViewComplaint(notification)}
                            sx={{
                              color: "#1B5E20",
                              fontSize: "12px",
                              textTransform: "none",
                            }}
                          >
                            View Details
                          </Button>
                        )}
                      {!notification.is_read && (
                        <Button
                          size="small"
                          onClick={() => handleMarkAsRead(notification.id)}
                          disabled={markAsReadMutation.isLoading}
                          sx={{
                            color: "#1B5E20",
                            fontSize: "12px",
                            textTransform: "none",
                          }}
                        >
                          Mark as read
                        </Button>
                      )}
                    </Box>
                  )
                }
              >
                <ListItemIcon>
                  {notification.is_read ? (
                    <DraftsIcon color="disabled" />
                  ) : (
                    <MarkEmailReadIcon color="success" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={notification.title || "No Title"}
                  secondary={
                    <>
                      {notification.description && (
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          display="block"
                        >
                          {notification.description}
                        </Typography>
                      )}
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        {[
                          notification.actor_details?.name &&
                            `By: ${notification.actor_details.name}`,
                          notification.verb,
                          notification.created_at &&
                            new Date(notification.created_at).toLocaleString(),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </Typography>
                    </>
                  }
                  primaryTypographyProps={{
                    fontWeight: notification.is_read ? 400 : 600,
                  }}
                />
                {isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1,
                      alignSelf: "flex-end",
                    }}
                  >
                    {notification.target_type === "complaint" &&
                      notification.target_id && (
                        <Button
                          size="small"
                          onClick={() => handleViewComplaint(notification)}
                          variant="contained"
                          sx={{
                            backgroundColor: "#1B5E20",
                            fontSize: "12px",
                            textTransform: "none",
                          }}
                        >
                          View Complaint
                        </Button>
                      )}
                    {!notification.is_read && (
                      <Button
                        size="small"
                        onClick={() => handleMarkAsRead(notification.id)}
                        disabled={markAsReadMutation.isLoading}
                        variant="outlined"
                        sx={{ color: "#1B5E20", borderColor: "#1B5E20" }}
                      >
                        Mark as read
                      </Button>
                    )}
                  </Box>
                )}
              </ListItem>
              {index < notifications.results.length - 1 && <Divider />}
            </Box>
          ))
        ) : (
          <Typography
            sx={{ textAlign: "center", p: 4, color: "text.secondary" }}
          >
            You have no notifications.
          </Typography>
        )}
      </List>
      {notifications?.results?.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#1B5E20 !important",
                color: "#fff",
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "#E8F5E9",
              },
            }}
          />
        </Box>
      )}
    </Card>
  );
};

export default Notifications;
