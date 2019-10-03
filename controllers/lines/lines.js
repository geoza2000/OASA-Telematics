//Services
const helper = require('../../services/helper')
const cache = require('../../services/cache')

//Const
const CACHE_KEY = "lines"
const CACHE_TTL = 43200

module.exports = (req, res) => {
    //Const
    const LINE_CODE = req.params["line"]

    const cached_data = cache.get(CACHE_KEY)

    if (cached_data) {

        if (LINE_CODE) {
            cached_data.data = cached_data.data.find(line => line.code == LINE_CODE)
        }

        res.send(cached_data)

    } else {

        var lines = []

        helper.get('http://telematics.oasa.gr/api', {"act": "webGetLines"}).then(response => {
            response.forEach(line => {
                lines.push({
                    code: line["LineCode"],
                    id: line["LineID"],
                    desc: {
                        el: line["LineDescr"],
                        en: line["LineDescrEng"]
                    }
                })
            });

            var data = {
                data: lines
            }
            cache.set(CACHE_KEY, data, CACHE_TTL)

            if (LINE_CODE){
                data = {
                    data: lines.find(line => line.code == LINE_CODE)
                }
            }

            res.send(data)
        }).catch(err => {

            const error = {
                error: err
            }
            res.status(500).send(error)
        })
    }

}