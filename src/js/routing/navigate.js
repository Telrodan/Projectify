const navigateUser = (route, delay = 0) => {
  setTimeout(function () {
    window.location = route;
  }, delay);
};

export default navigateUser;
