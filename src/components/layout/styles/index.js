export default () => ({
  leftNavigation: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  menuNavigation: {
    display: 'flex'
  },
  itemMenuNavigation: {
    padding: '0 10px'
  },
  itemLinkNavigation: {
    textDecoration: 'none',
    fontSize: 14,
    color: '#4a4a4a',
    padding: '0 10px',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#000'
    }
  },
  mainLogo: {
    height: 32,
    width: 'auto'
  },
  menu: {
    marginLeft: 'auto'
  },
  body: {
    width: '100vw',
    display: 'flex',
    height: 'calc(100vh - 64px)',
    marginTop: 64,
    justifyContent: 'center',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingTop: 15,
    paddingBottom: 15
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
