//Services
const helper = require('../../../services/helper')
const cache = require('../../../services/cache')
const error = require('../../../services/error')

//Const
const CACHE_TTL = 1800

module.exports = (req, res, next) => {
    //Const
    const LINE_CODE = req.params["line"]
    const CACHE_KEY = "line_" + LINE_CODE + "_schedules"

    const cached_data = cache.get(CACHE_KEY)

    if (cached_data) {

        cached_data.data ? res.send(cached_data) : error.notFound(res)

    } else {
        helper.get('http://195.46.22.91/api', {"act": "getScheduleDaysMasterline", "p1": LINE_CODE}).then(response => {
            
            let schedules = []
            if (response.length > 0) {
                response.forEach(route => {
                    schedules.push({
                        code: route["sdc_code"],
                        desc: {
                            el: route["sdc_descr"],
                            en: route["sdc_descr_eng"]
                        }
                    })
                });

                var data = {
                    data: schedules
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