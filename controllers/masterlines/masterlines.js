//Services
const helper = require('../../services/helper')
const cache = require('../../services/cache')
const error = require('../../services/error')

//Const
const MASTERLINE_CACHE_KEY = "masterlines"
const LINES_WITH_ML_CACHE_KEY = "linesWithML"
const CACHE_TTL = 43200

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

module.exports = async (req, res) => {
    //Const
    const MASTERLINE_CODE = req.params["masterline"]

    var cached_data = cache.get(MASTERLINE_CACHE_KEY)

    if (cached_data) {

        if (MASTERLINE_CODE) {
            cached_data.data = cached_data.data.find(masterline => masterline.code == MASTERLINE_CODE)
        }

        cached_data.data ? res.send(cached_data) : error.notFound(res)        

    } else {

        var cached_lines = cache.get(LINES_WITH_ML_CACHE_KEY)

        if (!cached_lines) {

            await helper.get('http://195.46.22.91/api', {"act": "webGetLinesWithMLInfo"}).then(response => {
                
                var buffer = []

                response.forEach(line => {
                    buffer.push({
                        code: line["line_code"],
                        id: line["line_id"],
                        schedule: line["sdc_code"],
                        masterline: line["ml_code"],
                        parent: line["mld_master"] == 1 ? true : false,
                        desc: {
                            el: line["line_descr"],
                            en: line["line_descr_eng"]
                        }
                    })
                })

                const data = {
                    data: buffer
                }
                cache.set(LINES_WITH_ML_CACHE_KEY, data, CACHE_TTL)
                cached_lines = data
            })
        }



        var masterlines = []

        helper.get('http://195.46.22.91/api', {"act": "webGetMasterLines"}).then(response => {

            if (response.length > 0) {
                response.forEach(masterline => {
                    var lines = cached_lines.data.filter(line => line.masterline == masterline["ml_code"])
                    for (line in lines) {
                        if (line != 0 && lines[line].parent && lines[line].code == masterline["line_code"]) {
                            lines.move(line, 0)
                        }
                    }
                    masterlines.push({
                        code: masterline["ml_code"],
                        id: masterline["ml_id"],
                        schedule: masterline["sdc_code"],
                        desc: {
                            el: masterline["ml_descr"],
                            en: masterline["ml_descr_eng"]
                        },
                        lines: lines
                    })
                });

                const data = {
                    data: masterlines
                }
                cache.set(MASTERLINE_CACHE_KEY, data, CACHE_TTL)

                if (MASTERLINE_CODE){
                    data = {
                        data: masterlines.find(masterline => masterline.code == MASTERLINE_CODE)
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