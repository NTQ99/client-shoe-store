export class Timer {
    constructor(fn, t) {
        this.fn = fn;
        this.t = t;
        this.timerObj = setInterval(fn, t);
    }
    stop = () => {
        if (this.timerObj) {
            clearInterval(this.timerObj);
            this.timerObj = null;
        }
        return this;
    };

    // start timer using current settings (if it's not already running)
    start = async () => {
        if (!this.timerObj) {
            this.stop();
            await this.fn();
            this.timerObj = setInterval(this.fn, this.t);
        }
        return this;
    };

    // start with new or original interval, stop current interval
    reset = async () => {
        return this.stop().start();
    };
}

export const getTimeFormat = (date, format) => {
    date = new Date(date);
    return format.replace("dd", ("0" + date.getDate()).slice(-2))
    .replace("mm", ("0" + (date.getMonth() + 1)).slice(-2))
    .replace("yyyy", date.getFullYear())
    .replace("yy", ("0" + date.getFullYear()).slice(-2))
    .replace("HH", ("0" + date.getHours()).slice(-2))
    .replace("MM", ("0" + date.getMinutes()).slice(-2))
    .replace("SS", ("0" + date.getSeconds()).slice(-2))
}