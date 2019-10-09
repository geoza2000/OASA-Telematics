//Services
const helper = require('../../services/helper')
const cache = require('../../services/cache')
const error = require('../../services/error')

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
   
        cached_data.data ? res.send(cached_data) : error.notFound(res)        

    } else {

        var lines = []

        helper.get('http://195.46.22.91/api', {"act": "webGetLines"}).then(response => {
            
            if (response.length > 0) {
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

                if (data.data) {
                    res.send(data)
                    return
                }
            }
            error.notFound(res)  

        }).catch(err => error.internal(res, err))
    }

}