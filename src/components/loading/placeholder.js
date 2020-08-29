import React from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'

const ImageLoader = ({ width, height, marginBottom }) => (
  <div
    id="content-loader-div"
    style={{ width, height, margin: 'auto', marginBottom }}
  >
    <ContentLoader
      height={height}
      width={width}
      speed={2}
      primarycolor="#f3f3f3"
      secondarycolor="#ecebeb"
    >
      <rect x="4.28" y="11.67" rx="0" ry="0" width={width} height={height} />
    </ContentLoader>
  </div>
)

ImageLoader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  marginBottom: PropTypes.any
}

export default ImageLoader
