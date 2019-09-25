//Services
const helper = require('../../services/helper')
const cache = require('../../services/cache')

//Const
const CACHE_KEY = "masterlines"
const CACHE_TTL = 43200

module.exports = (req, res) => {

    const cached_data = cache.get(CACHE_KEY)

    if (cached_data) {

        res.send(cached_data)

    } else {

        var masterlines = []

        helper.get('http://telematics.oasa.gr/api', {"act": "webGetMasterLines"}).then(response => {
            response.forEach(masterline => {
                masterlines.push({
                    code: masterline["ml_code"],
                    id: masterline["ml_id"],
                    parent_line: masterline["line_code"],
                    schedule: masterline["sdc_code"],
                    desc: {
                        el: masterline["ml_descr"],
                        en: masterline["ml_descr_eng"]
                    }
                })
            });

            const data = {
                data: masterlines
            }
            cache.set(CACHE_KEY, data, CACHE_TTL)

            res.send(data)
        }).catch(err => {
            res.status(500).send({error: err})
        })
    }

}