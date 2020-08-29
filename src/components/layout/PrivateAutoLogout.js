import React from 'react'
import PropTypes from 'prop-types'
import CircularLoading from '../loading/circular'

class PrivateAutoLogout extends React.Component {
  componentDidMount() {
    const { LogoutByAuthExpired } = this.props
    LogoutByAuthExpired()
  }

  render() {
    return <CircularLoading />
  }
}

PrivateAutoLogout.propTypes = {
  LogoutByAuthExpired: PropTypes.func
}

export default PrivateAutoLogout
