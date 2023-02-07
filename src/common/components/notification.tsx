/* eslint-disable no-unused-vars, no-shadow */

enum AppNotificationVariants {
  ERROR = 'alert-danger',
  SUCCESS = 'alert-success',
}

type AppNotificationProps = {
  message: string;
  type?: AppNotificationVariants;
}

function AppNotification({ message, type }: AppNotificationProps) {
  return (
    <div className={`alert ${type}`} role="alert">
      <i className="bi bi-exclamation-triangle-fill me-3" />
      <div className="d-inline-block">
        {message}
      </div>
    </div>
  );
}

AppNotification.defaultProps = {
  type: AppNotificationVariants.ERROR,
};

export default AppNotification;
export { AppNotificationVariants };
