import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function OpportunitiesBarChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = Math.max(300, data.length * 40);
    const margin = { top: 20, right: 20, bottom: 40, left: 180 };

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, height - margin.top - margin.bottom])
      .padding(0.3);

    chart.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", d => y(d.label))
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("width", d => x(d.value))
      .attr("fill", "#FFB608");


    chart.append("g")
      .selectAll("text.label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", d => x(d.value) + 5)
      .attr("y", d => y(d.label) + y.bandwidth() / 2 + 5)
      .text(d => d.value)
      .attr("fill", "#333")
      .attr("font-size", "12px");

    chart.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll("text")
      .style("font-size", "13px")
      .style("font-weight", "500");

    chart.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))
      .selectAll("text")
      .style("font-size", "12px");
  }, [data]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <svg ref={chartRef}></svg>
    </div>
  );
}
