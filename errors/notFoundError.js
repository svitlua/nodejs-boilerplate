class notFoundError extends Error{
    constructor(message) {
        super(message); 
        this.name = "NotFoundError";
    }
}
module.exports = notFoundError;