import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    const { message, name, type, request } = error
    console.log({ message, name, type, request })
    // if (error.includes('Loading chunk') && error.includes('failed')) {
    // console.log(typeof error)
    // console.log(Object.keys(error))
    // console.log('YESS')
    console.log(errorInfo.componentStack)
    // }
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      return <h1>Something went wrong:( </h1>
    }

    return children
  }
}
