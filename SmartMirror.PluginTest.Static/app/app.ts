import { Clock } from './modules/clock/clock';

$(document).ready(function () {
    // register plugin
    new Clock($('.clock'), {
        clockSize: 320,
        numberSpaceBorder: 24
    });
});