import {Component, Input, OnInit} from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";
import {Item} from "../items/item";

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.css']
})
export class PriceGraphComponent implements OnInit {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;

  @Input() item?: Item;

  public initChartData(): void {
    let prices: ({ x: string; y: number; })[] = [];
    let median: { x: string; y: number; }[] = [];
    this.item?.priceHistory.forEach(value => prices.push(this.createEntry(value.timestamp, value.price)));
    this.item?.priceHistory.forEach(value => median.push(this.createEntry(value.timestamp, value.median)));

    this.series = [
      {
        name: "Price",
        data: prices
      },
      {
        name: "Median",
        data: median
      }
    ];

    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };

    this.title = {
      text: this.item?.itemName
    };
    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      },
      title: {
        text: "Price"
      }
    };
    this.xaxis = {
      type: "datetime"
    };
    this.tooltip = {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
  }

  ngOnInit(): void {
    this.initChartData();
  }

  createEntry(timestamp: string, value: number) {
    return {
      x: timestamp,
      y: value
    }
  }
}
