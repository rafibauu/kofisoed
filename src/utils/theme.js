import { createMuiTheme } from '@material-ui/core/styles'
import ENV from '../env'

export default createMuiTheme({
  palette: {
    background: {
      default: ENV.APP_COLOR.backgroud
    },
    primary: {
      main: ENV.APP_COLOR.primary
    },
    secondary: {
      main: ENV.APP_COLOR.secondary,
    }
  },
  typography: {
    useNextVariants: true,
  }
})
