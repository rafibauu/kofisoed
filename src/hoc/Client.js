import React from 'react'
import PropTypes from 'prop-types'

const Client = (WrappedComponent) => {
  const Component = (props) => {
    function getClientDevice() {
      const { app } = props
      return app.device
    }

    function getClientNetworkStatus() {
      return navigator.onLine
    }

    function getFirebaseSocketStatus() {
      const { firebaseConnected } = props
      return firebaseConnected
    }

    function getClientConnection() {
      const network = getClientNetworkStatus()
      const fbSocket = getFirebaseSocketStatus()
      return network && fbSocket
    }

    return (
      <WrappedComponent
        {...props}
        getClientDevice={getClientDevice}
        getClientConnection={getClientConnection}
      />
    )
  }

  Component.propTypes = {
    app: PropTypes.object,
    firebaseConnected: PropTypes.any
  }

  return Component
}

export default Client
