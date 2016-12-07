import React from 'react'
import MarkDownPreviewer from './MarkDownPreviewer'



class App extends React.Component {

  constructor () {
    super()

    this.navButton = document.getElementById('app-main-nav-button')
    this.navButton.addEventListener('click', (e) => {
      e.preventDefault()
      document.body.classList.toggle('active-left-place')
    }, false)
  }

  render () {
    return (
      <MarkDownPreviewer />
    )
  }

}

export default App
