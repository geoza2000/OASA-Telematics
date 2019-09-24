var request = require('request')

var functions = {}

functions.get = function(URL, qs) {
    if (!qs) {
        qs = {}
    }
    return new Promise(function (resolve, reject) {
        request(URL, {
            qs: qs
        }, function (err, res, body) {
            if (err) {
                reject(err)
            } else {
                try {
                    let obj = JSON.parse(body)
                    resolve(obj)
                } catch (err) {
                    resolve(body)
                }
            }
        })
    })
}

functions.post = function(URL, data, headers, qs) {
    if (!qs) {
        qs = {}
    }
    return new Promise(function (resolve, reject) {
        let options = {
            qs: qs,
            headers: headers || {
                "Content-Type": "application/json"
            },
            json: data
        }
        request.post(URL, options, function (err, res, body) {
            if (err) {
                reject(err)
            } else {
                try {
                    let obj = JSON.parse(body)
                    resolve(obj)
                } catch (err) {
                    resolve(body)
                }
            }
        })
    })
}

functions.put = function(URL, data, headers, qs) {
    if (!qs) {
        qs = {}
    }
    return new Promise(function (resolve, reject) {
        let options = {
            qs: qs,
            headers: headers || {
                "Content-Type": "application/json"
            },
            json: data
        }
        request.put(URL, options, function (err, res, body) {
            if (err) {
                reject(err)
            } else {
                try {
                    let obj = JSON.parse(body)
                    resolve(obj)
                } catch (err) {
                    resolve(body)
                }
            }
        })
    })
}

module.exports = functions