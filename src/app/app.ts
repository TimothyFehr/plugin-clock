import { Clock } from './modules/clock/clock';
import { Guid } from './modules/guid/guid';

declare var moment: any;

$(document).ready(function () {
    // register plugin
    function initializeClock(settings) {
        new Clock($('.clock-wrapper'),
            settings,
            new Guid().generateGuid(),
            moment().valueOf(),
            moment
        );
    }

    function getApiUrlParam() : string {
        let params = location.search;
        let apiUrl = null;
        if (params.length > 0) {
            apiUrl = location.search.substring(1).split('=')[1];
        }
        return apiUrl;
    }

    if ($('.clock-wrapper').length > 0) {
        if (window.mirror != null) {
            window.mirror.onInitialized(function (settings) {
                initializeClock(settings);
            });
        } else {
            var defaultSettings = {
                useAnalogClock: true,
                showDate: true,
                clockDateFormat: 'ddd, Do MMM'
            };
            initializeClock(defaultSettings);
        }
    }

    if ($('.js-settings-form').length > 0) {

        var apiUrl = getApiUrlParam();

        if (apiUrl.length > 0) {
            $.getJSON(apiUrl, function (data) {
                $.each(data, function (key, val) {
                    switch (key) {
                        case 'useAnalogClock':
                            $('#clockType').val(val.ToString());
                            break;
                        case 'showDate':
                            $('#showDate').val(val.ToString());
                            break;
                        case 'clockDateFormat':
                            $('#dateFormat').val(val);
                            break;
                        default:
                            break;
                    }
                });
            });
        }

        $('.js-settings-form-submit').on('click', function () {
            event.preventDefault();
            event.stopPropagation();
            var $form = $(this).closest('.js-settings-form');
            var jsonData = {};
            $.each($form.serializeArray(), function () {
                var isBoolean = this.value === 'true' || this.value === 'false';
                if (isBoolean) {
                    var value = this.value === 'true' ? true : false;
                    jsonData[this.name] = value;
                } else {
                    jsonData[this.name] = this.value;
                }
            });

            var apiUrl = getApiUrlParam();
            if (apiUrl.length > 0) {
                $.ajax({
                    url: apiUrl,
                    type: 'put',
                    data: JSON.stringify(jsonData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json'
                });
            }
        });
    }
});