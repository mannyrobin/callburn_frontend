angular.module("callburnApp").controller("AuthController",["$scope","$rootScope","$state","Restangular","routes",function($scope,$rootScope,$state,Restangular,routes){routes&&($scope.callRoutes=routes.resource.routes),$scope.verificationCode={},$scope.verificationCall={},$scope.verificationData={},$scope.registrationStep=0,$rootScope.currentPage="log-reg",$scope.loginData={},$scope.loginErrorMessage=!1,$scope.registrationData={},$scope.registrationErrorMessage=!1,$scope.login=function(){Restangular.all("auth/login").post($scope.loginData).then(function(data){0==data.resource.error.no?($rootScope.currentUser=data.resource.user_data,$rootScope.currentUser.api_token=data.resource.api_key,$state.go("dashboard.dashboard")):$scope.loginErrorMessage=data.resource.error.text})},$scope.sendVerificationCall=function(){$scope.verificationCall.action="registration",$scope.verificationCall.phonenumber=$scope.verificationData.phonenumberCode+$scope.verificationData.phonenumber,$scope.registrationData.phonenumber=$scope.verificationData.phonenumberCode+$scope.verificationData.phonenumber,Restangular.all("verifications/send-verification-code").post($scope.verificationCall).then(function(data){0==data.resource.error.no?($scope.registrationStep=1,$scope.registrationErrorMessage=!1):$scope.registrationErrorMessage=data.resource.error.text})},$scope.makeRegistration=function(){$scope.registrationData.voice_code=$scope.verificationCode.firstLetter+$scope.verificationCode.secondLetter+$scope.verificationCode.thirdLetter+$scope.verificationCode.fourthLetter,Restangular.all("auth/registration").post($scope.registrationData).then(function(data){0==data.resource.error.no?($state.go("login"),$scope.registrationErrorMessage=!1):$scope.registrationErrorMessage=data.resource.error.text})}}]);