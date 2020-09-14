import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Popover from '@material-ui/core/Popover'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles/index'

import ProfileNav from './ProfileNav'

const GuestTopbar = React.memo((props) => {
  const [popover, setPopover] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(false)

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget)
    setPopover(true)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
    setPopover(false)
  }

  const { classes, isLoggedIn, Logout } = props
  return (
    <AppBar
      style={{
        backgroundColor: '#FFF',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.04)',
        borderBottom: '1px solid rgb(0 0 0 / 0.05)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar style={{ padding: 0 }}>
          <div className={classes.leftNavigation}>
            <Typography variant="h5" color="textPrimary">
              Fission
            </Typography>
            {/* <img
              className={classes.mainLogo}
              src={ENV.CLIENT_LOGO}
              alt={`${ENV.CLIENT_NAME} Logo`}
            /> */}
            <ul className={classes.menuNavigation}>
              <li className={classes.itemMenuNavigation}>
                <Link to="/" className={classes.itemLinkNavigation}>
                  Home
                </Link>
              </li>
              <li className={classes.itemMenuNavigation}>
                <Link to="/news" className={classes.itemLinkNavigation}>
                  News
                </Link>
              </li>
              <li className={classes.itemMenuNavigation}>
                <Link to="/sharing" className={classes.itemLinkNavigation}>
                  Sharing
                </Link>
              </li>
              <li className={classes.itemMenuNavigation}>
                <Link to="/career" className={classes.itemLinkNavigation}>
                  Career
                </Link>
              </li>
              {/* <li className={classes.itemMenuNavigation}>
                <Link to="/marketplace" className={classes.itemLinkNavigation}>
                  Marketplace
                </Link>
              </li> */}
              <li className={classes.itemMenuNavigation}>
                <Link to="/about" className={classes.itemLinkNavigation}>
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {isLoggedIn ? (
              <>
                <ArrowDropDownRoundedIcon
                  color="primary"
                  onClick={handleOpenPopover}
                  style={{
                    borderRadius: 50,
                    fontSize: 28,
                    border: '1px solid',
                    cursor: 'pointer'
                  }}
                />
                <Popover
                  open={popover}
                  onClose={handleClosePopover}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <ProfileNav Logout={Logout} />
                </Popover>
              </>
            ) : (
              <>
                <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginRight: 10 }}
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  to="/auth/registration"
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" color="primary">
                    Registration
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
})

export default withStyles(styles, { withTheme: true })(GuestTopbar)
