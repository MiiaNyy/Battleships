class ConsoleBox {
    constructor() {
        this.allMessages = [];
    }

    addNewMessage(message) {
        this.allMessages.push(message);
    }

    messages() {
        return [this.allMessages[this.allMessages.length - 1], this.allMessages[this.allMessages.length - 2], this.allMessages[this.allMessages.length - 3]]


    }
}

export default ConsoleBox