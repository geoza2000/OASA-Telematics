//Services
const helper = require('../../services/helper')
const cache = require('../../services/cache')
const error = require('../../services/error')

//Const
const CACHE_KEY = "translations"
const CACHE_TTL = 86400

module.exports = (req, res) => {

    const cached_data = cache.get(CACHE_KEY)

    if (cached_data) {
   
        cached_data.data ? res.send(cached_data) : error.notFound(res)        

    } else {

        var translations = []

        helper.get('http://195.46.22.91/api', {"act": "webGetLangs"}).then(response => {
            
            if (response.length > 0) {
                response.forEach(translation => {
                    translations.push({
                        id: translation["lang_id"],
                        desc: {
                            el: translation["el"],
                            en: translation["en"]
                        }
                    })
                });

                var data = {
                    data: translations
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