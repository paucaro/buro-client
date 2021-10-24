import { Component, OnInit } from "@angular/core";
import { Buro } from "app/models/buro.model";
import { BuritoService } from "app/services/burito.service";
import * as Chartist from "chartist";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(private buroService: BuritoService) {}

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }
  startAnimationForPieChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "pie") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }
  ngOnInit() {
    let listaBuros: Buro[];
    this.buroService.getContracargos().subscribe(
      (data) => {
        listaBuros = data;
        console.log("data: " + listaBuros[0].cuenta.marca);

        let bbvaCount = listaBuros.filter(function (element: Buro) {
          return element.cuenta && element.cuenta.bancoEmisor == "BBVA";
        }).length;

        let openPayCount = listaBuros.filter(function (element) {
          return element.cuenta && element.cuenta.bancoEmisor == "OPENPAY";
        }).length;
        

        // Niveles de contracargos por banco o procesador
        //// bar 
        var datawebsiteViewsChart = {
          labels: ["BBVA", "OPENPAY"],
          series: [[bbvaCount, openPayCount]]
        };
        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 200,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
        };
        var responsiveOptions: any[] = [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ];
        var websiteViewsChart = new Chartist.Bar(
          "#websiteViewsChart",
          datawebsiteViewsChart,
          optionswebsiteViewsChart,
          responsiveOptions
        );
    
        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);

        //// ---------------------------------------------
        // Niveles de contracargos por Nombre y apellidos tarjeta habiente
        //// Pie chart

        // let unique = listaBuros.filter((item, i, ar) => {
        //   return listaBuros[i].usuario.nombreComprador === item.usuario.nombreComprador;
        // });

        var dataPieChat = {
          series: [5, 3, 4, 6, 2]
        };
        
        var sum = function(a, b) { return a + b };
        
        var completerPie = new Chartist.Pie('#completedTasksChart', dataPieChat, {
          labelInterpolationFnc: function(value) {
            return Math.round(value / dataPieChat.series.reduce(sum) * 100) + '%';
          }
        });

        this.startAnimationForPieChart(completerPie);

        const dataCompletedTasksChart: any = {
          labels: ["BBVA", "OPENPAY"],
          series: [[bbvaCount, openPayCount]]
        };
    
        const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        };
    
        var completedTasksChart = new Chartist.Line(
          "#completedTasksChart",
          dataCompletedTasksChart,
          optionsCompletedTasksChart
        );
    
        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);

        ////////////////////////

        // 10 últimas direcciones de compra
        // for (let buro in listaBuros) {
        //   let regex = /(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(buro.operacion.fechaVenta);
        //   buro.operacion.fechaVenta = new Date(Number(regex[3]), Number(regex[2]) - 1, Number(regex[1]))  
        // }
        
        
        let ultimasCompras = listaBuros.slice(0,10);

        const dataDailySalesChart: any = {
          labels: ["BBVA", "OPENPAY"],
          series: [[bbvaCount, openPayCount]]
        };

        const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 200, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        };

        var dailySalesChart = new Chartist.Line(
          "#dailySalesChart",
          dataDailySalesChart,
          optionsDailySalesChart
        );

        this.startAnimationForLineChart(dailySalesChart);
      },
      (err) => {
        console.error(err);
      }
    );
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    
    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    
  }
}
