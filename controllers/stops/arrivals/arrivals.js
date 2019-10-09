//Services
const helper = require('../../../services/helper')
const cache = require('../../../services/cache')
const error = require('../../../services/error')

module.exports = (req, res) => {
    //Const
    const STOP_CODE = req.params["stop"]

    var arrivals = []

    helper.get('http://195.46.22.91/api', {"act": "getStopArrivals", "p1": STOP_CODE}).then(response => {

        if (response.length > 0) {
            response.forEach(arrival => {
                arrivals.push({
                    route: arrival["route_code"],
                    vehicle: arrival["veh_code"],
                    time: arrival["btime2"]
                })
            })

            var data = {
                data: arrivals
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