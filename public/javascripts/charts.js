// const asyncHandler = require("express-async-handler")
// const Sequelize = require("sequelize")
// const op = Sequelize.Op
// const moment = require("moment")
// const eventModel = require("../../models").events




// const total = eventModel.count({
//     where:{
//         user_id:{
//             [op.eq]: '8'
//         }
//     }
// }).then((data)=> {
//     if(data) {
//         console.log(data)
//     }
// })

const estevao = []
estevao.push('<%= products %>');


var ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jorge', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: ['<%= products %>', 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })























    const linhaProducao = [];

    const pecasProduzidas = [];

    //Dados recebidos do res.render na rota

    '<% DTTotalPecasPorPerfil.forEach((row, index) => { %>'

        linhaProducao.push('<%- row.Perfil %>');

        pecasProduzidas.push('<%- row.Total %>');

    '<% }); %>'

    //Doughnut chart definido no canvas da página

    //var ctx = document.getElementById('pie-chart').getContext('2d');

    var canvas = document.getElementById('pie-chart');

    var ctx = canvas.getContext("2d");

    //Iniciando o gráfico

    var myChart = new Chart(ctx, {

        type: 'doughnut',//Tipo de gráfico

        maintainAspectRatio: true,

        responsive: true,

        data: {

            labels: linhaProducao,//Texto agrupador

            datasets: [{

                data: pecasProduzidas,//Valores

                backgroundColor: ["#007bff", "#ffc107", "#28a745", "#702CA1"],//Cores

                borderWidth: 0.9,

                borderColor: '#FFFFFF',

            }]

        },

        options: {

            title: {

                display: false,

                text: 'Titulo aqui',

                position: 'top',

                fontSize: 16,

                fontColor: '#000000',

                padding: 20,

            },

            animation: {

                animateScale: true,

                animateRotate: true,

            },

            legend: {

                display: true,

                position: 'right',

                labels: {

                    size: 14,

                    lineHeight: 1.6,

                    boxWidth: 20,

                    fontColor: '#181B22',

                    padding: 12,

                }

            },

            tooltips: {

                enabled: true,

            },

            plugins: {

                datalabels: {

                    color: '#FFFFFF',

                    textAlign: 'center',

                    font: {

                        size: 14,

                        weight: 'bold',

                        lineHeight: 1.6,

                    },

                    formatter: function (value, ctx) {

                        //return ctx.chart.data.labels[ctx.dataIndex] + '\n' + value;

                        return value;

                    }

                }

            },

        },

    });