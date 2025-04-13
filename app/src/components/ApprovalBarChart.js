import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ApprovalBarChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width - margin.left - margin.right])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    chart.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.label))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", "#FFB608")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .attr("fill", "#FFD95A");

        chart.append("text")
          .attr("id", "tooltip")
          .attr("x", x(d.label) + x.bandwidth() / 2)
          .attr("y", y(d.value) - 10)
          .attr("text-anchor", "middle")
          .attr("fill", "#333")
          .attr("font-size", "12px")
          .text(d.value);
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#FFB608");
        chart.selectAll("#tooltip").remove();
      });

    chart.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    chart.append("g").call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={chartRef}></svg>;
}
