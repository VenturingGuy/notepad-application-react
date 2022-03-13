import  { Line } from "react-chartjs-2"
import { useState } from "react"
import { Chart as ChartJS } from "chart.js/auto" // Note: This is REQUIRED in order for the charts to render. 

function Graph(props) {
  // Passes the data from props, stores it to a variable for use with the graphs ChartJS.
  const { data, secretSetup } = props
  const gistDataset = data
  console.log(data)
  
  // Data for the first graph, gists created per 5 second bucket.
  const [gistData, setGistData] = useState({
    labels: gistDataset.map((data) => data.date.toLocaleTimeString("en-US")), // formats to HH:MM::SS AM/PM
    datasets: [
      {
        label: "Gists Created",
        data: gistDataset.map((data) => data.count),
        backgroundColor: [
          "green", 
        ],
        Color: "red",
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
  
  // Formatting for gists graph.
  const [gistOptions, setGistOptions] = useState({
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Gists Created",
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Gists",
          font: {
            size: 16
          }
        }
      }
    }
  })

  // Formatting for files graph.
  const [filesOptions, setFilesOptions] = useState({
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Files per Gist",
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Files",
          font: {
            size: 16
          }
        },
        
      }
    }
  })

  

  // Renders both graphs
  return(
    <div className="notepad__graph">
      {/* Maybe tie this to a map/for loop? ie. <Line /> + <button>Load More</button> */}
      <Line
        data={gistData}
        options={gistOptions}
      />
      <button className="notepad__button graph-button" id="load-gists" onClick={secretSetup}>Load More</button>
      <Line
        data={filesData}
        options={filesOptions}
      />
      <button className="notepad__button graph-button" id="load-files" onClick={secretSetup}>Load More</button>
    </div>
  )
}

export default Graph