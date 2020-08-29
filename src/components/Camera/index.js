import React from 'react'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const centerFlexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const stateRendering = (state, capture) => {
  switch (state) {
    case 'Permitted':
      return (
        <button
          type="button"
          style={{ position: 'absolute', bottom: 25 }}
          onClick={capture}
        >
          Capture photo
        </button>
      )
    case 'Error':
      return (
        <div
          style={{
            ...centerFlexCenter,
            flexDirection: 'column',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '100%'
          }}
        >
          <Typography align="center">
            Aplikasi tidak mendapatkan izin untuk mengakses kamera. Mohon
            berikan aplikasi akses kamera dan muat ulang halaman.
          </Typography>
        </div>
      )
    case 'initial':
    default:
      return (
        <div
          style={{
            ...centerFlexCenter,
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '100%'
          }}
        >
          <div>
            <CircularProgress
              style={{
                padding: 5,
                width: 45,
                height: 45,
                marginRight: 8
              }}
            />
          </div>
          <Typography>
            Mohon tunggu, pastikan kamera sudah tersedia dan aplikasi telah
            diberikan akses kamera.
          </Typography>
        </div>
      )
  }
}

const WebcamComponent = React.memo((props) => {
  const { hidden, setWebcamRef, getScreenshot } = props
  const webcamRef = React.useRef(null)
  const [webcamState, setWebcamState] = React.useState('initial')

  const capture = React.useCallback(() => {
    const image = webcamRef.current.getScreenshot()
    getScreenshot(image)
  }, [webcamRef, getScreenshot])

  React.useEffect(() => {
    if (webcamState !== 'initial' && setWebcamRef) {
      setWebcamRef(webcamRef)
    }
  }, [webcamState, webcamRef, setWebcamRef])

  const style = hidden ? { opacity: 0, height: 0 } : {}

  return (
    <div style={{ position: 'relative', ...centerFlexCenter, ...style }}>
      <Webcam
        ref={webcamRef}
        mirrored
        audio={false}
        height={360}
        width={480}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720
        }}
        onUserMedia={() => setWebcamState('Permitted')}
        onUserMediaError={() => setWebcamState('Error')}
      />

      {stateRendering(webcamState, capture)}
    </div>
  )
})

WebcamComponent.propTypes = {
  hidden: PropTypes.bool,
  setWebcamRef: PropTypes.func,
  getScreenshot: PropTypes.func
}

export default WebcamComponent
