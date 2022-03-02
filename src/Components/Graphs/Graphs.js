import { Octokit } from "@octokit/rest"

export const octokit = new Octokit({
  auth: process.env.REACT_APP_GH
})

const Graphs = () =>{

  async function fetchGists () {
    const result = await octokit.request('GET /gists/public', {per_page: 100})
    console.log(result)
  }

  fetchGists()
return (<div>:)</div>)
}

export default Graphs