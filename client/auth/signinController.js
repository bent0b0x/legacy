
// invokes function from mainFactory.js to sign in a user
myApp.controller('SigninController', function ($scope, Auth, $location) {
  $scope.user = {};
  $scope.failMessage = null;
  $scope.signin = function (user) {
    Auth.signin(user).then(function (user){
        if (!user) {
          $scope.user = {};
          $scope.failMessage = "Username or password incorrect";
          return;
        } 
        $scope.failMessage = null;
        Auth.setLoggedIn(true, user.id, user.email, user.username);
      // redirect
        $location.path('/');
        
    });
  };
});
