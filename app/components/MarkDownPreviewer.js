import React from 'react'
import ReactDOM from 'react-dom'
import marked from 'marked'
import Modal from 'boron/ScaleModal'

// Modal Style object
const modalStyle = {
  width: '80%'
};

const dummyData = `Heading
=======
Sub-heading
-----------
### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
\`monospace\`, ~~strikethrough~~.

Unordered list:

* Lol
* Troll
* Ololo

Numbered list:

1. Lol
2. Troll
3. Ololo

*[Link Example](https://freecodecamp.com/Cu7ious)*`

class MarkDownPreviewer extends React.Component {

  constructor () {
    super()

    this.materialButtonHoverInterval
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });

    this.state = {
      rawContent: '',
      compiledContent: ''
    }

    this.sidebarCloseButton = document.querySelector('#main-sidebar button')
    this.sidebarCloseButton.addEventListener('click', this._closeSidebar, false)
    this.magnetOverlay = document.getElementById('magnet-overlay')
    this.magnetOverlay.addEventListener('click', this._closeSidebar, false)
    document.addEventListener('keyup', this._closeSidebar, false)


    this._clearState  = this._clearState.bind(this)
    this._showRawHTML = this._showRawHTML.bind(this)
    this._closeModal  = this._closeModal.bind(this)
    this._addMDContent = this._addMDContent.bind(this)
    this._pasteExample = this._pasteExample.bind(this)
  }

  _closeSidebar (e) {
    if (e.type == 'keyup' && e.keyCode == 27) {
      if (document.body.classList.length) {
        document.body.classList.toggle('active-left-place')
      }
    } else if (e.type == 'click') {
      document.body.classList.toggle('active-left-place')
    }
  }

  _addMDContent (e) {
    this.setState({
      rawContent: e.target.value,
      compiledContent: marked(e.target.value)
    })
  }

  _pasteExample () {
    this.setState({
      rawContent: dummyData,
      compiledContent: marked(dummyData),
    })
  }

  _clearState () {
    this.setState({
      rawContent: '',
      compiledContent: ''
    })
  }

  _showRawHTML () {
    this.refs.rawHTMLModal.show();
  }

  _closeModal () {
    this.refs.rawHTMLModal.hide();
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.mdInput).focus()
  }

  render () {
    return (
      <section>
        <div className='panel'>
          <div className='column'>
            <h3>MarkDown</h3>
          </div>
          <div className='column'>
            <h3>Result</h3>
          </div>
        </div>
        <div className='md-previewer'>
          <div className='column'>
            <div className='md-input-block'>
              <textarea
                ref='mdInput'
                placeholder='Paste your MarkDown here'
                value={this.state.rawContent}
                onChange={this._addMDContent}>
              </textarea>
            </div>
          </div>
          <div className='column'>
            <div
              ref='mdOutput'
              id='mdOutput'
              dangerouslySetInnerHTML={{
                '__html': this.state.compiledContent || '<span class=\'output-placeholder\'>Compiled output will appear here</span>'
              }}
            >
            </div>
          </div>
        </div>

        <nav className='material-buttons'>
          <ul>
            <li id='paste-dummy-data' onClick={this._pasteExample} className='secondary'>&crarr;<span>Paste dummy data</span></li>
            <li id='clear-raw-area' onClick={this._clearState} className='secondary'>&#x021BA;<span>Clear input area</span></li>
            <li id='show-raw-html' onClick={this._showRawHTML}><span>Show raw html</span></li>
          </ul>
        </nav>

        <Modal
          ref="rawHTMLModal"
          backdrop={true}
          modalStyle={modalStyle}>
          <header className='modal-header'>
            <h3>Copy Raw HTML</h3>
            <button onClick={this._closeModal}>⨯</button>
          </header>
          <section className='raw-html'>
            <pre>{this.state.compiledContent || 'There\'s nothing to show for now...'}</pre>
          </section>
        </Modal>

      </section>
    )
  }

}

export default MarkDownPreviewer