import { LightningElement, api } from 'lwc'
import { loadScript } from 'lightning/platformResourceLoader'
import D3 from '@salesforce/resourceUrl/D3_v3'
import RadarChartResource from '@salesforce/resourceUrl/RadarChart'

export default class Radar extends LightningElement {

    @api dat

    // Sample Data
    //  [
    //     [//iPhone
    //       {axis:"Battery Life",value:0.22},
    //       {axis:"Brand",value:0.28},
    //       {axis:"Contract Cost",value:0.29},
    //       {axis:"Design And Quality",value:0.17},
    //       {axis:"Have Internet Connectivity",value:0.22},
    //       {axis:"Large Screen",value:0.02},
    //       {axis:"Price Of Device",value:0.21},
    //       {axis:"To Be A Smartphone",value:0.50}			
    //     ],[//Samsung
    //       {axis:"Battery Life",value:0.27},
    //       {axis:"Brand",value:0.16},
    //       {axis:"Contract Cost",value:0.35},
    //       {axis:"Design And Quality",value:0.13},
    //       {axis:"Have Internet Connectivity",value:0.20},
    //       {axis:"Large Screen",value:0.13},
    //       {axis:"Price Of Device",value:0.35},
    //       {axis:"To Be A Smartphone",value:0.38}
    //     ],[//Nokia Smartphone
    //       {axis:"Battery Life",value:0.26},
    //       {axis:"Brand",value:0.10},
    //       {axis:"Contract Cost",value:0.30},
    //       {axis:"Design And Quality",value:0.14},
    //       {axis:"Have Internet Connectivity",value:0.22},
    //       {axis:"Large Screen",value:0.04},
    //       {axis:"Price Of Device",value:0.41},
    //       {axis:"To Be A Smartphone",value:0.30}
    //     ]
    //   ]
    
    @api maxWidth = 700

    renderedCallback() {
        if (this.dat) {
            loadScript(this, `${D3}/d3.js`)
                .then(() => {
                    loadScript(this, `${RadarChartResource}/radarChart.js`)
                        .then(() => {
                            this.initializeD3()
                        })
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    initializeD3() {
        var margin = { top: 100, right: 100, bottom: 100, left: 100 },
            width = Math.min(this.maxWidth, window.innerWidth - 10) - margin.left - margin.right,
            height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20)

        var color = d3.scale.ordinal()
            .range(["#EDC951", "#CC333F", "#00A0B0", "#7289ad"])

        var radarChartOptions = {
            w: width,
            h: height,
            margin: margin,
            maxValue: 0.5,
            levels: 5,
            roundStrokes: false,
            color: color
        }

        //Call function to draw the Radar chart
        RadarChart(this.template.querySelector('div.d3'), this.dat, radarChartOptions)
    }

}
