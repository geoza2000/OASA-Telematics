//Services
const helper = require('../../services/helper')

module.exports = (req, res) => {

    var lines = []
    
    helper.get('http://telematics.oasa.gr/api', {"act": "webGetLines"}).then(response =>{
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
        res.send({data: lines})
    }).catch(err => {
        res.status(500).send({error: err})
    })

}