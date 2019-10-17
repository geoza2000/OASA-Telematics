//Services
const helper = require('../../../services/helper')
const cache = require('../../../services/cache')
const error = require('../../../services/error')

//Const
const CACHE_TTL = 43200

module.exports = (req, res) => {
    //Const
    const ROUTE_CODE = req.params["route"]
    const CACHE_KEY = "route_" + ROUTE_CODE + "_name"

    const cached_data = cache.get(CACHE_KEY)

    if (cached_data) {
   
        cached_data.data ? res.send(cached_data) : error.notFound(res)        

    } else {

        helper.get('http://195.46.22.91/api', {"act": "getRouteName", "p1": ROUTE_CODE}).then(response => {
            
            if (response) {

                const buffer  = response[0]

                var data = {
                    data: {
                        code: ROUTE_CODE,
                        desc: {
                            el: buffer["route_descr"],
                            en: buffer["route_departure_eng"]
                        }
                    }
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