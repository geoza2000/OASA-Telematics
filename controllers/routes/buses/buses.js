//Services
const helper = require('../../../services/helper')
const cache = require('../../../services/cache')
const error = require('../../../services/error')

//Const
const CACHE_TTL = 43200

module.exports = (req, res) => {
    //Const
    const ROUTE_CODE = req.params["route"]
    const BUS_CODE = req.params["bus"]

    helper.get('http://195.46.22.91/api', {"act": "getBusLocation", "p1": ROUTE_CODE}).then(response => {
        
        if (response.length > 0) {

            var buses = []

            response.forEach(bus => {
                buses.push({
                    code: bus["VEH_NO"],
                    timestamp: bus["CS_DATE"],
                    location: {
                        coords: {
                            lat: bus["CS_LAT"],
                            lng: bus["CS_LNG"]
                        }
                    }
                })
            });

            const data = {
                data: buses
            }

            if (BUS_CODE) {
                data.data = data.data.find(bus => bus.code == BUS_CODE)
            }

            if (data.data) {
                res.send(data)
                return
            }
        }
        error.notFound(res)  

    }).catch(err => error.internal(res, err))

}