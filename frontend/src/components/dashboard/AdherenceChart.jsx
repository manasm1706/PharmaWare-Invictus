"use client"

import { useEffect, useRef } from "react"
import "../../styles/AdherenceChart.css"

const AdherenceChart = ({ medications }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!medications || medications.length === 0) return

    // Prepare data for the chart
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    const adherenceData = last7Days.map((date) => {
      const totalForDay = medications.reduce((total, med) => {
        const logsForDay = (med.adherenceLog || []).filter((log) => log.date.split("T")[0] === date)
        return total + logsForDay.length
      }, 0)

      const takenForDay = medications.reduce((total, med) => {
        const takenLogsForDay = (med.adherenceLog || []).filter((log) => log.date.split("T")[0] === date && log.taken)
        return total + takenLogsForDay.length
      }, 0)

      const rate = totalForDay > 0 ? (takenForDay / totalForDay) * 100 : 0

      return {
        date,
        rate,
        displayDate: new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      }
    })

    // Render the chart
    renderChart(adherenceData)
  }, [medications])

  const renderChart = (data) => {
    if (!chartRef.current) return

    const chartContainer = chartRef.current
    chartContainer.innerHTML = ""

    const maxHeight = 150
    const barWidth = 30
    const barSpacing = 20

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", maxHeight + 50)
    svg.setAttribute("viewBox", `0 0 ${(barWidth + barSpacing) * data.length} ${maxHeight + 50}`)

    data.forEach((item, index) => {
      const barHeight = (item.rate / 100) * maxHeight
      const x = index * (barWidth + barSpacing)
      const y = maxHeight - barHeight

      // Bar
      const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      bar.setAttribute("x", x)
      bar.setAttribute("y", y)
      bar.setAttribute("width", barWidth)
      bar.setAttribute("height", barHeight)
      bar.setAttribute("rx", "4")
      bar.setAttribute("fill", item.rate >= 80 ? "#4CAF50" : item.rate >= 50 ? "#FFC107" : "#F44336")

      // Date label
      const dateLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
      dateLabel.setAttribute("x", x + barWidth / 2)
      dateLabel.setAttribute("y", maxHeight + 20)
      dateLabel.setAttribute("text-anchor", "middle")
      dateLabel.setAttribute("font-size", "12")
      dateLabel.textContent = item.displayDate

      // Percentage label
      const percentLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
      percentLabel.setAttribute("x", x + barWidth / 2)
      percentLabel.setAttribute("y", y - 5)
      percentLabel.setAttribute("text-anchor", "middle")
      percentLabel.setAttribute("font-size", "12")
      percentLabel.setAttribute("font-weight", "bold")
      percentLabel.textContent = `${Math.round(item.rate)}%`

      svg.appendChild(bar)
      svg.appendChild(dateLabel)
      svg.appendChild(percentLabel)
    })

    chartContainer.appendChild(svg)
  }

  return (
    <div className="adherence-chart">
      <div className="chart-container" ref={chartRef}></div>
    </div>
  )
}

export default AdherenceChart

