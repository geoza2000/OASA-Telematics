//Services
const helper = require('../../../services/helper')
const cache = require('../../../services/cache')
const error = require('../../../services/error')

//Const
const CACHE_TTL = 43200

module.exports = (req, res) => {
    //Const
    const ROUTE_CODE = req.params["route"]
    const CACHE_KEY = "route_" + ROUTE_CODE

    const cached_data = cache.get(CACHE_KEY)

    if (cached_data) {

        const path_only = {
            data: cached_data.data.path
        }
   
        path_only.data ? res.send(path_only) : error.notFound(res)

    } else {

        helper.get('http://195.46.22.91/api', {"act": "webGetRoutesDetailsAndStops", "p1": ROUTE_CODE}).then(response => {
            
            if (response) {
                
                var path = []
                var stops = []

                response["details"].forEach(point => {
                    path.push({
                        order: point["routed_order"],
                        location: {
                            coords: {
                                lat: point["routed_x"],
                                lng: point["routed_y"]
                            }    
                        }
                    })
                });

                response["stops"].forEach(stop => {
                    stops.push({
                        code: stop["StopCode"],
                        id: stop["StopID"],
                        order: stop["RouteStopOrder"],
                        desc: {
                            el: stop["StopDescr"],
                            en: stop["StopDescrEng"]
                        },
                        location: {
                            heading: stop["StopHeading"],
                            street: {
                                el: stop["StopStreet"],
                                en: stop["StopStreetEng"]
                            },
                            coords: {
                                lat: stop["StopLat"],
                                lng: stop["StopLng"]
                            }
                        },
                        distance: stop["distance"],
                        type: stop["StopType"],
                        accessibility: stop["StopAmea"] == 1 ? "disabled" : "normal" 
                    })
                });

                const data = {
                    data: {
                        path: path,
                        stops: stops
                    }
                }
                cache.set(CACHE_KEY, data, CACHE_TTL)

                const path_only = {
                    data: path
                }

                if (path_only.data) {
                    res.send(path_only)
                    return
                }
            }
            error.notFound(res)  

        }).catch(err => error.internal(res, err))
    }

}