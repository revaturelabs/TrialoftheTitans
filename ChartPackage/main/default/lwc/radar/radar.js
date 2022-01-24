///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: Radar
// Author: Alan Huang
// Created: 01/25/2022
// Updated: 01/25/2022
// Description: Radar chart component
// 
/////////////////////////////////////////////////////////////////////////////////

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
            // console.log(this.dat)
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
            maxValue: 100,
            levels: 5,
            roundStrokes: false,
            color: color
        }

        //Call function to draw the Radar chart
        RadarChart(this.template.querySelector('div.d3'), this.dat, radarChartOptions)
    }

}
