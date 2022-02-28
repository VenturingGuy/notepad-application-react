function Notepad(props) {
  const { title } = props
  return(
    <div className="notepad__entry">
      <h3>{title}</h3>
    </div>
  )
}

export default Notepad