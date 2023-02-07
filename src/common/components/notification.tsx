type AppNotificationProps = {
  message: string;
}

function AppNotification({ message }: AppNotificationProps) {
  return (
    <div className="alert alert-danger" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-3" />
      <div className="d-inline-block">
        {message}
      </div>
    </div>
  );
}

export default AppNotification;
