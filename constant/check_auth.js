export const check_login = (router) => {
  if (localStorage.getItem('login')) {
    return true;
  } else {
    router.push(`/sign-in?to=${router.asPath}`);
    return false;
  }
};
