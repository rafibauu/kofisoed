/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'

export default class OnImagesLoaded extends React.Component {
  componentDidMount() {
    this._imgs = this.imageLoad.getElementsByTagName('img')
  }

  render() {
    const { children } = this.props
    return (
      <div
        ref={(ctx) => {
          this.imageLoad = ctx
        }}
      >
        {children}
      </div>
    )
  }
}

OnImagesLoaded.propTypes = {
  children: PropTypes.object
}
