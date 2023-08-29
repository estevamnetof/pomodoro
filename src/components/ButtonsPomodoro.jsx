/* eslint-disable react/prop-types */

const ButtonsPomodoro = ({click, title }) => {
  return (
    <button onClick={click}>
      {title}
    </button>
  )
}

export default ButtonsPomodoro
