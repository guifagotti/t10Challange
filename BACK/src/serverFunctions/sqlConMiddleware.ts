module.exports = (pool : any) => (req : any, res: any , next: any) => {
    pool.getConnection((err: Object, connection : Object) => {
        if(err) return next(err);
        req.connection = connection;
        next();
        res.on('finish', () => req.connection.release());
    });
};
