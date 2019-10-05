//Services
const helper = require('../../../services/helper')
const cache = require('../../../services/cache')
const error = require('../../../services/error')

//Const
const CACHE_TTL = 43200

module.exports = (req, res) => {
    //Const
    const LINE_CODE = req.params["line"]
    const ROUTE_CODE = req.params["route"]
    const CACHE_KEY = "line_" + LINE_CODE + "_route"

    const cached_data = cache.get(CACHE_KEY)

    if (cached_data) {

        if (ROUTE_CODE) {
            cached_data.data = cached_data.data.find(route => route.code == ROUTE_CODE)
        }

        cached_data.data ? res.send(cached_data) : error.notFound(res)        

    } else {

        var routes = []

        helper.get('http://telematics.oasa.gr/api', {"act": "webGetRoutes", "p1": LINE_CODE}).then(response => {
            
            if (response.length > 0) {
                const isCircleRoute = !response.find(route => route["RouteType"] == 2)
                response.forEach(route => {
                    routes.push({
                        code: route["RouteCode"],
                        distance: route["RouteDistance"],
                        type: isCircleRoute ? "circle" : route["RouteType"] == 1 ? "go" : "come",
                        desc: {
                            el: route["RouteDescrEng"],
                            en: route["LineDescrEng"]
                        }
                    })
                });

                var data = {
                    data: routes
                }
                cache.set(CACHE_KEY, data, CACHE_TTL)

                if (ROUTE_CODE){
                    data = {
                        data: routes.find(route => route.code == ROUTE_CODE)
                    }
                }

                if (data.data) {
                    res.send(data)
                    return
                }
            }
            error.notFound(res)  
            
        }).catch(err => error.internal(err))
    }

}