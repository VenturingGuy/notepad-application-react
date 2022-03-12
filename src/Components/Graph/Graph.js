import  { Line } from "react-chartjs-2"
import { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";

function Graph(props) {
  const { data } = props
  const gistDataset = data
  
  const [gistData, setGistData] = useState({
    labels: gistDataset.map((data) => data.date.toLocaleTimeString("en-US")),
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

  const [filesData, setFilesData] = useState({
    labels: gistDataset.map((data) => data.date.toLocaleTimeString("en-US")),
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

  const [userOptions, setUserOptions] = useState({
    scales: {
      y: {
        beginAtZero: true
      }
    }
  })

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