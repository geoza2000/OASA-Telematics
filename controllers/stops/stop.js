//Services
const helper = require('../../services/helper')
const cache = require('../../services/cache')
const error = require('../../services/error')

//Const
const CACHE_TTL = 43200

module.exports = (req, res) => {
    //Const
    const STOP_CODE = req.params["stop"]
    const CACHE_KEY = "stop_" + STOP_CODE

    const cached_data = cache.get(CACHE_KEY)

    if (cached_data) {

        cached_data.data ? res.send(cached_data) : error.notFound(res)

    } else {

        var stop = {}

        helper.get('http://195.46.22.91/api', {"act": "getStopNameAndXY", "p1": STOP_CODE}).then(response => {

            if (response[0]) {

                const buffer = response[0]

                stop = {
                    code: STOP_CODE,
                    id: buffer["stop_id"],
                    desc: {
                        el: buffer["stop_descr"],
                        en: buffer["stop_descr_matrix_eng"]
                    },
                    location: {
                        heading: buffer["stop_heading"],
                        coords: {
                            lat: buffer["stop_lat"],
                            lng: buffer["stop_lng"]
                        }
                    }
                }

                var data = {
                    data: stop
                }
                cache.set(CACHE_KEY, data, CACHE_TTL)

                if (data.data) {
                    res.send(data)
                    return
                }
            }
            error.notFound(res)

        }).catch(err => error.internal(res, err))
}

}