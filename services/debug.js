

function seeBody(req, res, next) {
    console.log("*_____BODY_____*")
    console.log(req.body)
    next()
}

function seeQuery(req, res, next) {
    console.log("*_____QUERY_____*")
    console.log(req.query)
    next()
}

module.exports = {
    seeBody,
    seeQuery
}