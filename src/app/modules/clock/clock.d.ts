export interface IClockOptions {
    clockSecondSelector?: string;
    clockMinuteSelector?: string;
    clockHourSelector?: string;
    clockNumberClass?: string;
    clockSize: number;
    numberSpaceBorder: number;
}

export declare class Clock {
    $element: JQuery;
    $second: JQuery;
    $minute: JQuery;
    $hour: JQuery;
    options: IClockOptions;
    private step60: number;
    private step12: number;
    private step: number;
    constructor(element: JQuery, options: IClockOptions);
    init(): void;
    private setClockFaceBackgroundColor();
    private setNeedle();
    private generateClockNumbers();
    private updateTime();
    static Default: IClockOptions;
}