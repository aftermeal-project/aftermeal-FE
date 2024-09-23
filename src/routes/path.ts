const enum Path {
  HomePage = '/',
  ActivityDetailsPage = '/activity/:activityId',
  AdminActivityDetailsPage = '/admin/activity/:activityId',
  LoginPage = '/login',
  SignupPage = '/signup',
  AdminPage = '/admin',
  NotFoundPage = '*',
}

export default Path;
