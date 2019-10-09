//Services
const helper = require('../../../services/helper')
const error = require('../../../services/error')

module.exports = async (req, res) => {
    //Const
    const LAT = req.query["lat"]
    const LNG = req.query["lng"]

    if (LAT && LNG) {

        var stops = []

        await helper.get('http://195.46.22.91/api', {"act": "getClosestStops", "p1": LAT, "p2": LNG}).then(response => {
            
            if (response.length > 0) {
                response.forEach(stop => {
                    stops.push({
                        code: stop["StopCode"],
                        id: stop["StopID"],
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
                        distance: stop["distance"]
                    })
                });

                var data = {
                    data: stops
                }
                res.send(data)
                return
            }
            error.notFound(res)  

        }).catch(err => error.internal(res, err))
    } else {
        error.missingFields(res)
    }
}