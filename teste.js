const moment = require("moment")

const date = new Date()
const dateMoment = moment(date).subtract(7, 'days').format("YYYY-MM-DD")



console.log(date)
console.log(dateMoment)

var d = new Date();
d.setDate(d.getDate()-7);
console.log(d.setHours(0, 0, 0, 0))