myApp.controller('sessionTileController', function ($scope, $http, Auth) {
// We generated a client token for you so you can test out this code
// immediately. In a production-ready integration, you will need to
// generate a client token on your server (see section below).

  angular.extend($scope, Auth)

  $scope.nonce;


  $scope.initiateReg = function () {
    //if the user is signedIn, this will load the Braintree paypal
    //card options and request the client token needed to submit payments
    $http({
      method: 'GET',
      url: '/client_token'
    })
    .then(function (response) {
      var clientToken = response.data;
      braintree.setup(clientToken, "dropin", {
        container: "payment-form" + $scope.session.id,
        onPaymentMethodReceived: function (payload) {
          $http({
            method: 'POST',
            url: '/sessions/send',
            data: {price: $scope.session.price, id: $scope.session.id, payment_method_nonce: payload.nonce, free: $scope.session.free, studentId: $scope.getUserId()}
          })
          .then(function (res) {
            console.log(res);
            if (res.data.session) {
              Materialize.toast('You have succesfully registered for this class!', 1750);
              $scope.session.studentId = $scope.getUserId();
              $scope.session.status = true;

            } else {
              Materialize.toast('I\'m sorry, something went wrong.', 1750);
            }
          })
          .catch(function (error) {
            Materialize.toast('I\'m sorry, something went wrong.', 1750);
          })
          .finally(function () {
            $scope.closeReg();
          });
        }
      });
      $scope.registration = $scope.session.id;
    });
  };

  $scope.closeReg = function () {
    $scope.registration = 0;
    $('#payment-form' + $scope.session.id).empty();
  };

  console.log('fuck',$scope.session);

});
