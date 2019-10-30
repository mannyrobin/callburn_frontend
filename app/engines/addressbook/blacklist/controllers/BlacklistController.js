angular.module("callburnApp").controller("BlacklistController",["$scope","$rootScope","$state","Restangular","$stateParams","growl","blacklist","$timeout","CallBournModal",function($scope,$rootScope,$state,Restangular,$stateParams,growl,blacklist,$timeout,CallBournModal){$rootScope.currentActiveUrl=$state.current.name,$rootScope.currentActiveRoute="blacklist",$scope.blacklist=blacklist.resource,$scope.showSearch=!1,$scope.searchVal="",$scope.showMoreLoader=!1,$scope.aPage=0,$scope.isAllSelected=!1,$scope.showObj={showEverything:!1,showSearchVal:!1},$scope.filterData={searchValue:""},$scope.newBlacklistPhone="",$scope.filterContacts=function(){$scope.searchVal=$scope.filterData.searchValue,$scope.showObj.showEverything=!0,$scope.showObj.showSearchVal=!0,$rootScope.showEverything=!0;var data={phone_number:$scope.filterData.searchValue,page:0,key_word:$scope.filterData.searchValue};$scope.reloadData(data,"search")},$scope.reloadData=function(params,type){return Restangular.one("address-book/index-black-list").get(params).then(function(data){for(var arrLength=$scope.blacklist.contacts.length||data.resource.contacts.length,i=0;i<arrLength;i++)$scope.blacklist.contacts[i]!==data.resource.contacts[i]&&("search"===type?$scope.updateContacts(data,type):$scope.updateContacts(data))})},$scope.updateContacts=function(contacts,type){$scope.tableSpinnerLoading=!1;var res=contacts.resource;$scope.blacklist.allCount=res.allCount,$scope.blacklist.count=res.count,$scope.blacklist.page=res.page,"search"===type?$scope.blacklist.contacts=res.contacts:res.contacts.length?$scope.blacklist.contacts=res.contacts:$scope.clearSearch()},$scope.clearSearch=function(){$scope.filterData.searchValue="",$scope.searchVal="",$scope.filterContacts(),$scope.aPage=0,$scope.showObj.showEverything=!1,$scope.showObj.showSearchVal=!1,$rootScope.showEverything=!1},$scope.toggleSearch=function(){$scope.showSearch&&$rootScope.importantShowSearch?$scope.filterContacts():$scope.showSearch=!0;var inp=document.querySelector("input[name=addressbook-group-filter]");$timeout(function(){inp.focus()},1e3)},$scope.changeDateString=function(dateString){return date=moment(dateString,"YYYY-MM-DD hh:mm:ss"),date.format("DD/MM/YY HH:mm")},$scope.removeFromBlacklist=function(id){var data={phonenumber_ids:[id]};Restangular.all("address-book/remove-black-list").post(data).then(function(data){0===data.resource.error.no&&$scope.reloadData()})},$scope.openBlacklistModal=function(){CallBournModal.open({scope:{},templateUrl:"/app/modals/addressbook_modal/add-blacklist.html"},function(scope){scope.blacklistData={},scope.addNewBlacklist=function(number){if(Number.isInteger(+number)){var data={phonenumbers:[+number],name:scope.blacklistData.name};CallBournModal.close(),Restangular.all("address-book/add-black-list").post(data).then(function(data){0===data.resource.error.no&&$scope.reloadData()})}else growl.error($rootScope.trans("phonenumber_is_not_valid"))}})},$scope.setStatusText=function(contact){switch(contact.blacklist_type){case"MANUALLY_TYPED":return $rootScope.trans("manually_typed");case"MANUALLY_ADDED":return $rootScope.trans("manually_added_from")+contact.campaign&&contact.campaign.campaign_name?" "+contact.campaign.campaign_name:"";case"REQUESTED":return $rootScope.trans("requested_blacklist_from")+contact.campaign&&contact.campaign.campaign_name?" "+contact.campaign.campaign_name:""}}}]);