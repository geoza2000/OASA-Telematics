//Services
const helper = require('../../../services/helper')
const cache = require('../../../services/cache')
const error = require('../../../services/error')

//Const
const CACHE_TTL = 3600

module.exports = (req, res, next) => {
    //Const
    const LINE_CODE = req.params["line"]
    const CACHE_KEY = "line_" + LINE_CODE + "_daily_schedule"

    const cached_data = cache.get(CACHE_KEY)

    if (cached_data) {

        cached_data.data ? res.send(cached_data) : error.notFound(res)

    } else {
        helper.get('http://195.46.22.91/api', {"act": "getDailySchedule", "line_code": LINE_CODE}).then(response => {

            let dailySchedule = {}
            if (response) {
                if (response.go[0] == null) {
                    error.notFound(res)
                    return
                }
                dailySchedule.circle = (response.go[0].line_circle || 0) == 1 ? true : false
                if (response.go) {
                    dailySchedule.line = {
                        code: response.go[0]["sdd_line1"],
                        id: response.go[0]["line_id"],
                        desc: {
                            el: response.go[0]["line_descr"],
                            en: response.go[0]["line_descr_eng"]
                        },
                    }
                    let schedules = []
                    response.go.forEach(schedule => {
                        let time = schedule["sde_start1"].split(' ')[1].split(':')
                        time.pop()
                        schedules.push({
                            time: time.join(':'),
                            remarks: schedule["remarks"],
                        })
                    })
                    if (schedules.length > 0) {
                        dailySchedule.go = schedules
                    }
                }

                if (response.come) {
                    let schedules = []
                    response.come.forEach(schedule => {
                        let time = schedule["sde_start2"].split(' ')[1].split(':')
                        time.pop()
                        schedules.push({
                            time: time.join(':'),
                            remarks: schedule["remarks"],
                        })
                    })
                    if (schedules.length > 0) {
                        dailySchedule.come = schedules
                    }
                }

                var data = {
                    data: dailySchedule
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