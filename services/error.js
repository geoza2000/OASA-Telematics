exports.notFound = function(res) { 
    res.status(404).send({error: {code: "404", message: "The requested data didn't returned any results."}})
}

exports.missingFields = function(res) {
    res.status(400).send({error: {code: "400", message: "Missing fields, please check the api documentation."}})
}

exports.internal = function(res, error) {
    console.log(error)
    res.status(500).send({error: {code: "500", message: "Internal Server Error :("}})
}