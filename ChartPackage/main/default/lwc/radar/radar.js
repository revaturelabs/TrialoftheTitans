import { LightningElement, api, track } from 'lwc'
import { loadScript } from 'lightning/platformResourceLoader'
import D3 from '@salesforce/resourceUrl/D3_v3'
import RadarChartResource from '@salesforce/resourceUrl/RadarChart'

export default class Radar extends LightningElement {

    /** 
     * Data to be rendered in the radar chart
     * {Array[]}    dat             Array of multiple radars
     * {Object[]}   dat[n]          An individual radar, e.g. {axis:"Battery Life",value:0.22}
     * {string}     dat[n].axis     Axis label
     * {number}     dat[n].value    Decimal value of the radar's axis
     */
    @api get dat() {
        return this._dat
    }
    @track _dat
    set dat(value) {
        this._dat = (value ? value : [[]])
    }
    
    // The maximum width in px of the rendered chart
    @api maxWidth = 700

    renderedCallback() {
        if (this.dat) {
            // initializes D3 static library before initializing radar chart library
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

    // initializes radar chart configurations and attaches it to div.
    initializeD3() 
        // margin: margins between outermost circle and bounding box, including text
        // width: starting width of the entire radar chart, including margins
        //        set to whichever is smaller b/t maxwidth and window width
        // height: starting height of the entire chart, including margins
        //        set to whichever is smaller b/t starting width and window height
        var margin = { top: 40, right: 40, bottom: 40, left: 40 };
        var width = Math.min(this.maxWidth, window.innerWidth - 10) - margin.left - margin.right;
        var height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

        // colors of each radar, by index
        // each additional radar beyond the index will be assigned the final color
        var color = d3.scale.ordinal()
            .range(["#EDC951", "#CC333F", "#00A0B0", "#7289ad"])

        // maxValue: the maximum axis value
        // levels: number of rings/intervals in the radar chart
        // roundstrokes: if true, rounds out the corners and edges of a radar
        var radarChartOptions = {
            w: width,
            h: height,
            margin: margin,
            maxValue: 100,
            levels: 5,
            roundStrokes: false,
            color: color
        }

        // Call function to draw the Radar chart
        RadarChart(this.template.querySelector('div.d3'), this.dat, radarChartOptions)
    }

}
