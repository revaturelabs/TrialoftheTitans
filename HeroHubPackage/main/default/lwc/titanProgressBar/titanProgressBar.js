import { LightningElement, api } from "lwc";

//d3 imports
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript } from "lightning/platformResourceLoader";
import D3 from "@salesforce/resourceUrl/DJS3";
export default class TitanProgressBar extends LightningElement {
    @api svgHeight = 50;
    @api svgWidth = "100%";
    @api barHeight = 30;
    @api barPadding = 20;
    @api roundedCorners = 5;
    @api passedExams;
    @api totalExams;
    d3Init = false;

    renderedCallback() {
        if (this.d3Init || this.totalExams == null) {
            return;
        }
        this.d3Init = true;
        Promise.all([loadScript(this, D3 + "/d3.min.js")])
            .then(() => {
                this.d3Init = true;
                this.initD3();
            })
            .catch((error) => {
                console.log("error: " + error.message);
                this.dispatchEvent(
                    console.log("error:", error),
                    new ShowToastEvent({
                        title: "Error loading D3",
                        message: error.message,
                        variant: "error"
                    })
                );
            });
    }

    initD3() {
        let height = this.svgHeight;
        let width = this.svgWidth;
        let widthBar = parseInt(d3.select(this.template.querySelector("svg.progress")).style("width"), 10) * 0.9;
        let heightBar = this.barHeight;

        let corners = this.roundedCorners;
        // console.log("before segment assignment (passedExams): " + passedExams);
        let segments = 0;
        if (this.passedExams != -1) {
            segments = this.passedExams;
        }
        let exams = this.totalExams;
        let segmentWidth = widthBar;
        if (exams != 0) {
            segmentWidth = widthBar / exams;
        }
        let padding = this.barPadding;

        const svg = d3.select(this.template.querySelector("svg.progress")).attr("height", height).attr("width", width);

        const states = ["1", "2", "3"];
        let currentState = this.getCurrentState(segments, exams);

        const colorScale = d3.scaleOrdinal().domain(states).range(["#b3697a", "#96cabe", "#69b3a2"]);

        // append rectanges to svg tag
        svg.append("rect")
            .attr("class", "bg-rect")
            .attr("stroke", "black")
            .attr("stroke-width", "1")
            .attr("rx", corners)
            .attr("ry", corners)
            .attr("fill", "gray")
            .attr("height", heightBar + 2)
            .attr("width", () => {
                return segmentWidth * exams + 2;
            })
            .attr("x", padding)
            .attr("y", 0);

        const progress = svg
            .append("rect")
            .attr("class", "progress-rect")
            .attr("fill", () => {
                return colorScale(currentState);
            })
            .attr("height", this.barHeight)
            .attr("width", 0)
            .attr("rx", corners)
            .attr("ry", corners)
            .attr("x", padding + 1)
            .attr("y", 1);

        progress
            .transition()
            .duration(1000)
            .attr("width", () => {
                return segmentWidth * segments;
            });
    }

    getCurrentState(passedExams, totalExams) {
        if ((this.totalExams = 0)) {
            return "0";
        }
        let percentage = passedExams / totalExams;

        if (0 <= percentage && percentage < 0.35) {
            return "1";
        } else if (0.35 <= percentage && percentage < 0.65) {
            return "2";
        } else if (0.65 <= percentage && percentage <= 1) {
            return "3";
        } else {
            return "0";
        }
    }
}