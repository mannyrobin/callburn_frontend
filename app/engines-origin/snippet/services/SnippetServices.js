angular.module('callburnApp').factory('SnippetService',
    [            '$sce','Restangular', '$rootScope', '$httpParamSerializer',
        function ($sce, Restangular, $rootScope, $httpParamSerializer) {
        return {
            snippetCRUD: snippetCRUD,
            getSnippets: getSnippets,
            getApiJs: getApiJs,
            getCallerIds: getCallerIds,
            removeSnippet: removeSnippet,
            currentSnippet: currentSnippet,
            exportStatistics: exportStatistics,
            currentSnippetStatistics: currentSnippetStatistics,
            retryPhoneNumber: retryPhoneNumber,
            removeAllFromPending: removeAllFromPending,
            addRemovePending: addRemovePending,
            checkUrl: checkUrl,
            getMergedDate: getMergedDate,
            enableOrDisableSnippet: enableOrDisableSnippet,
            getWordPressPlugin: getWordPressPlugin,
            callNow: callNow,
            cancelSchedulation: cancelSchedulation,
            cancelCancellation: cancelCancellation,
            saveHolidayMode: saveHolidayMode,
            enableOrDisableHolidayMode: enableOrDisableHolidayMode,
            sendCTCIntegrationCodesEmail: sendCTCIntegrationCodesEmail

        };

        function snippetCRUD(data, id) {
            if (id) {
                return Restangular.all('/snippets/' + id).customPUT(data);
            } else {
                return Restangular.all('/snippets').post(data);
            }
        }

         function getSnippets(data) {
            return Restangular.one('/snippets').get(data);
        }

        function getApiJs(token) {
            return Restangular.one('/snippets/get-api-js/' + token).get();
        }

        function getCallerIds() {
            return Restangular.one('/snippets/get-caller-ids').get();
        }

        function removeSnippet(id) {
            return Restangular.one('/snippets/' + id).remove();
        }

        function currentSnippet(data) {
            return Restangular.one('snippets/' + data._id).get(data);
        }

        function currentSnippetStatistics(data) {
            return Restangular.one('snippets/show-statistics/' + data._id).get(data);
        }

        function retryPhoneNumber(id) {
            return Restangular.all('snippets/retry').post({phonenumber_id: id});
        }


        function callNow(id) {
            return Restangular.all('snippets/call-now').post({phonenumber_id: id});
        }

        function removeAllFromPending(snippetId) {
            return Restangular.all('snippets/remove-all-pending').post({snippet_id: snippetId});
        }

        function addRemovePending(phonenumberId, action) {
            return Restangular.all('snippets/add-remove-pending').post({phonenumber_id: phonenumberId, action: action});
        }

        function exportStatistics (id, filterData, fileFormat) {
            if (!filterData) {
                filterData = {};
            }

            Restangular.one('data/download-token').get().then(function (data) {
                var token = data.resource.token;
                filterData.snippet_id = id;
                filterData.token = token;
                filterData.locale = $rootScope.currentLanguage;
                filterData.file_format = fileFormat;
                var params = $httpParamSerializer(filterData);
                window.location.href = 'snippets/export-statistics?' + params;
            });
        }

        function getMergedDate (date) {
            return Restangular.all('/snippets/get-merged-date').post(date);
        }

        function checkUrl (url) {
            return Restangular.all('snippets/check-url').post({url:url});
        }

        function enableOrDisableSnippet (data) {
            return Restangular.all('snippets/enable-or-disable').post(data);
        }

        function getWordPressPlugin (type,getData) {
            Restangular.one('data/download-token').get().then(function (data) {
                var token = data.resource.token;
                var filterData = {};
                filterData.id = getData._id;
                filterData.type = type;
                filterData.token = token;
                var params = $httpParamSerializer(filterData);
                window.location.href = 'snippets/wordpress-plugin?' + params;
            });
        }

        function cancelSchedulation (data) {
            data.cancelSchedulation = true;
            return Restangular.all('snippets/cancel-schedulation').post(data);
        }

        function cancelCancellation (data) {
            data.cancelCancellation = true;
            return Restangular.all('snippets/cancel-cancellation').post(data);
        }

        function saveHolidayMode (data) {
            return Restangular.all('snippets/holiday-mode').post(data);
        }

        function enableOrDisableHolidayMode (data) {
            return Restangular.all('snippets/enable-or-disable-holiday-mode').post(data);
        }

        function sendCTCIntegrationCodesEmail (data) {
            return Restangular.all('snippets/send-email-integration-codes').post(data);
        }
    }]);