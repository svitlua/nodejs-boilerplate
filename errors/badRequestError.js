class badRequestError extends Error {   
    constructor(message) {
        super(message); 
        this.name = "badRequestError";
    }
}
module.exports = badRequestError