import { Clock } from './modules/clock/clock';
import { Guid } from './modules/guid/guid';

declare var moment: any;

$(document).ready(function () {
    // register plugin
    function initializeClock(settings){
        new Clock($('.clock-wrapper'),
            settings,
            new Guid().generateGuid(),
            moment().valueOf(),
            moment
        );
    }

    if(window.mirror != null) {
        window.mirror.onInitialized(function (settings) {
            initializeClock(settings)
        });
    } else {
        var settings = {
            useAnalogClock: true,
            showDate: true,
            clockDateFormat: 'ddd, Do MMM'
        };
        initializeClock(settings)
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
        var data = JSON.stringify(jsonData);
    });
});