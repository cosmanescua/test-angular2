export class Alert {
    message: string;
    type: string;
    timeout: number;
    dismissable: boolean;
    show: boolean;

    constructor(timeout: number, dismissable: boolean) {
        this.timeout = timeout;
        this.dismissable = dismissable;
        this.message = '';
        this.type = null;
        this.show = false;
    }
}