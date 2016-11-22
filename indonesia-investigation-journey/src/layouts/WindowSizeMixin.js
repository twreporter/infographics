/* eslint-disable react/no-find-dom-node */
import ReactDOM from 'react-dom'

// lodash
import debounce from 'lodash/debounce'

const MOBILE_WIDTH = 768

const debounceTime = {
  threshold: 60,
  maxWait: 180,
}

let WindowSizeMixin = (superclass) => class extends superclass {
  constructor(props) {
    super(props)
    this.fitToParentWidth = this.fitToParentWidth.bind(this)
    this.debouncedFitWidth = debounce(() => {
      this.fitToParentWidth()
    }, debounceTime.threshold, { "maxWait": debounceTime.maxWait })
  }

  componentDidMount() {
    // set state for the width of the images and listen to window resize event
    if (ReactDOM.findDOMNode(this)) {
      this.debouncedFitWidth()
      window.addEventListener('resize', this.debouncedFitWidth)
    }
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this) && window.removeEventListener('resize', this.debouncedFitWidth)
  }

  fitToParentWidth() {
    const elem = ReactDOM.findDOMNode(this).parentNode
    const {clientWidth, clientHeight} = elem
    const isMobile = clientWidth < MOBILE_WIDTH
    const isPortrait = clientWidth < clientHeight

    if (clientWidth && clientWidth !== this.state.width) {
      this.setState({
        width: clientWidth,
        height: clientHeight,
        isMobile: isMobile,
        isPortrait: isPortrait
      })
    }
  }

}

export default WindowSizeMixin
