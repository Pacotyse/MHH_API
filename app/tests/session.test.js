const test = {
    createSession (req, res) {
        req.session.jwt = req.body.token;
        console.log(req)
        res.json(req.session);
    }
}

export default test;