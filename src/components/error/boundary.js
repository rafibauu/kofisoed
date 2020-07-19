import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

class ErrorBoundary extends React.Component {
  state = { hasError: false, name: '', type: '' }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    const { name, type } = error
    this.setState({ name, type })
    // console.log(errorInfo.componentStack)
  }

  render() {
    const { hasError, name, type } = this.state
    const { children } = this.props
    // console.log({props: this.props})
    if (hasError && type) {
      return (
        <Container maxWidth="lg" style={{ padding: '15px 0' }}>
          <Grid container justify="center" style={{ padding: '15px 0' }}>
            <Typography variant="h5">
              We are sorry, but something went wrong
            </Typography>
            <Typography>{`ErrorCode: ${name}-${type}`}</Typography>
          </Grid>
        </Container>
      )
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element
}

export default ErrorBoundary
