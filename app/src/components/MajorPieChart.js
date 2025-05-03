// MajorPieChart.js
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function MajorPieChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(["#FFB608", "#FFD95A", "#FFE699", "#FFF3CC"]);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(60).outerRadius(radius);

    const total = d3.sum(data, d => d.value);

    const arcs = g.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("transform", "scale(1.05)");

        const bubbleX = -30; // Centered horizontally (adjust if needed)
        const bubbleY = -15; // Centered vertically (adjust if needed)
        const percentage = ((d.data.value / total) * 100).toFixed(1) + "%";

        g.append("foreignObject")
          .attr("id", "tooltip")
          .attr("x", bubbleX -20)
          .attr("y", bubbleY - 10)
          .attr("width", 100)
          .attr("height", 50)
          .append("xhtml:div")
          .style("background", "white")
          .style("border", "2px solid #FFB608")
          .style("border-radius", "20px")
          .style("padding", "5px 12px")
          .style("font-size", "13px")
          .style("font-weight", "bold")
          .style("box-shadow", "0 2px 5px rgba(0,0,0,0.3)")
          .style("color", "#333")
          .style("text-align", "center")
          .html(percentage);
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("transform", "scale(1)");
        g.select("#tooltip").remove();
      });

    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .attr("font-weight", "bold")
      .text(d => d.data.label);
  }, [data]);

  return <svg ref={ref}></svg>;
}