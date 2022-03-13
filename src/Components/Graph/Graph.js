import  { Line } from "react-chartjs-2"
import { useState } from "react"
import { Chart as ChartJS } from "chart.js/auto" // Note: This is REQUIRED in order for the charts to render. 

function Graph(props) {
  // Passes the data from props, stores it to a variable for use with the graphs ChartJS.
  const { data } = props
  const gistDataset = data
  
  // Data for the first graph, gists created per 5 second bucket.
  const [gistData, setGistData] = useState({
    labels: gistDataset.map((data) => data.date.toLocaleTimeString("en-US")), // formats to HH:MM::SS AM/PM
    datasets: [
      {
        label: "Gists Created",
        data: gistDataset.map((data) => data.count),
        backgroundColor: [
          "rgba(75,192,192,1)", 
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  })

  // Data for the first graph, files per gist created per 5 second bucket.
  const [filesData, setFilesData] = useState({
    labels: gistDataset.map((data) => data.date.toLocaleTimeString("en-US")), // formats to HH:MM::SS AM/PM
    datasets: [
      {
        label: "Files per Gist",
        data: gistDataset.map((data) => data.files),
        backgroundColor: [
          "rgba(75,192,192,1)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  })
  
  // General formatting for both graphs, currently sets y axis to start at 0.
  const [userOptions, setUserOptions] = useState({
    scales: {
      y: {
        beginAtZero: true
      }
    }
  })

  // Renders both graphs
  return(
    <div>
      <Line
        data={gistData}
        options={userOptions}
      />
      <Line
        data={filesData}
        options={userOptions}
      />
    </div>
  )
}

export default Graph