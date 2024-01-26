export const createError =(status,message,stack)=>{
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
} 