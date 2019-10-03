exports.notFound = function(res){ 
    res.status(404).send({error: {code: "404", message: "The requested data didn't returned any results."}})
}

exports.internal = function(res, error) {
    res.status(500).send({error: {code: "500", message: "Internal Server Error :("}})
}