/* eslint-disable react/no-find-dom-node */
import ReactDOM from 'react-dom'

// lodash
import debounce from 'lodash/debounce'

const MOBILE_WIDTH = 544
const TABLET_WIDTH = 768

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
    this.fitToParentWidth()
    window.addEventListener('resize', this.debouncedFitWidth)
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this) && window.removeEventListener('resize', this.debouncedFitWidth)
  }

  fitToParentWidth() {
    if(window) {
      const clientWidth = window.innerWidth
      const clientHeight = window.innerHeight
      const isMobile = clientWidth < MOBILE_WIDTH
      const isTablet = clientWidth >= MOBILE_WIDTH && clientWidth <= TABLET_WIDTH
      const isPortrait = clientWidth < clientHeight

      if (clientWidth && clientWidth !== this.state.width) {
        this.setState({
          width: clientWidth,
          height: clientHeight,
          isMobile: isMobile,
          isTablet: isTablet,
          isPortrait: isPortrait
        })
      }
    }
  }

}

export default WindowSizeMixin
