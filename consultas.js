// const eventModel = require("./models").events


// const eventsPerDay2 = eventModel.count({
//     group: ['date'],
// })
// console.log(eventsPerDay2)




// const eventsPerDay = await eventModel.count({
//     group: ['date'],
//     attributes: ['date', Sequelize.fn('count', Sequelize.col('date'))],
//     order: [Sequelize.fn(Sequelize.col('date')), 'DESC']
// })


////////////////////////// CONSEGUIIIIIIIIIIIIIIIIIIIIIIII /////////////////////////////
const eventsPerDay = await eventModel.findAll({
    attributes: ['date', [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
    group: ['date'],
    order: ['date'],
})
console.log(eventsPerDay)

const uniqueObjects = [...new Set(eventsPerDay.map(item => item.dataValues))]
console.log(uniqueObjects)



data.push('<%= moment(date.date).format("DD/MM/YYYY") %>');
quantidade.push('<%= date.count %>');
'<% }); %>'