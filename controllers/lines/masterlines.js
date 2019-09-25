//Services
const helper = require('../../services/helper')

module.exports = (req, res) => {

    var masterlines = []

    helper.get('http://telematics.oasa.gr/api', {"act": "webGetMasterLines"}).then(response => {
        response.forEach(masterline => {
            masterlines.push({
                code: masterline["ml_code"],
                id: masterline["ml_id"],
                parent_line: masterline["line_code"],
                schedule: masterline["sdc_code"],
                desc: {
                    el: masterline["ml_descr"],
                    en: masterline["ml_descr_eng"]
                }
            })
        });

        res.send({data: masterlines})
    }).catch(err => {
        res.status(500).send({error: err})
    })

}