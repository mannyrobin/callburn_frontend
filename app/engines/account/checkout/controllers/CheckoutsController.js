angular.module("callburnApp").controller("CheckoutsController",["$scope","$rootScope","$state","Restangular","$stateParams","invoice",function($scope,$rootScope,$state,Restangular,$stateParams,invoice){$scope.invoice=invoice.resource.invoice,$scope.activeMethod="paypal",$rootScope.currentActiveRoute="account",$scope.goToNotification=$rootScope.goToNotification,$rootScope.showPreviousIcon=!0,$rootScope.previousStep=function(){$state.go("account.financials",{oldData:$scope.invoice})};var payByPaypal=function(){$rootScope.startLoader(),Restangular.one("billings/pay-by-paypal",$stateParams.invoice_id).post().then(function(data){$rootScope.stopLoader(),0==data.resource.error.no&&(window.location=data.resource.redirect_url)})},payByBank=function(){$rootScope.startLoader(),Restangular.one("billings/pay-by-bank",$stateParams.invoice_id).post().then(function(data){$rootScope.stopLoader(),0==data.resource.error.no&&$state.go("account.success-payment",{invoice_id:$stateParams.invoice_id})})};$scope.proceedPayment=function(){"paypal"==$scope.activeMethod?payByPaypal():"bank"==$scope.activeMethod&&payByBank()}}]);