const Notifications = ({ notifications }) => {
  return notifications.map((notification) => {
    return (
      <p>{notification}</p>
    )
  })
}

export default Notifications;