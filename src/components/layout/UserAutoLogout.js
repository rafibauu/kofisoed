import React from 'react'
import Proptypes from 'prop-types'

class UserAutoLogout extends React.PureComponent {
  componentDidMount() {
    const { authExpiredLogoutRequestProps } = this.props
    authExpiredLogoutRequestProps()
  }

  render() {
    return null
  }
}

UserAutoLogout.propTypes = {
  authExpiredLogoutRequestProps: Proptypes.func.isRequired
}

export default UserAutoLogout
