export default () => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid #ededed',
    background: '#FFF'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  topbar: {
    position: 'relative'
  },
  topbarBackground: {
    background: '#1C233D',
    zIndex: -1,
    position: 'absolute',
    height: '240px',
    width: '100%',
    borderRadius: '0 0 0 50px'
  },
  topBarImageLogo: {
    height: 35
  },
  toolbarOption: {
    display: 'flex',
    alignItems: 'center'
  },
  toolbarUsername: {
    fontSize: 15
  },
  main: {
    marginTop: '64px',
    width: '100vw',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    background: '#FAFAFD'
  },
  brand: {
    color: '#FFF',
    textDecoration: 'none'
  },
  signOutIcon: {
    color: '#FFF',
    marginLeft: 'auto'
  },
  title: {
    marginRight: 'auto',
    marginLeft: 'auto'
  }
})
