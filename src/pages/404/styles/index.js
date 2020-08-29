export default () => ({
  notFoundBlock: {
    position: 'fixed',
    width: '33em',
    height: 150,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    display: 'block',
    '@media (maxWidth:680px)': {
      width: '94%'
    }
  },
  notFoundTxt: {
    color: '#000',
    fontFamily: '"Roboto", "arial", "sans-serif"',
    textAlign: 'center'
  },
  notFoundBody: {
    border: '1px solid #CCC',
    borderRightColor: '#999',
    borderLeftColor: '#999',
    borderBottomColor: '#BBB',
    borderTop: '#B00100 solid 4px',
    borderTopLeftRadius: '9px',
    borderTopRightRadius: '9px',
    backgroundColor: 'white',
    padding: '7px 12% 0',
    boxShadow: '0 3px 8px rgba(50, 50, 50, 0.17)'
  },
  msgOne: {
    color: '#730E15',
    lineHeight: '1.5em',
    fontSize: 17,
    textAlign: 'center'
  },
  msgTwo: {
    color: '#2E2F30',
    textAlign: 'center',
    fontSize: 14
  },
  lastMsg: {
    margin: '0 0 1em',
    padding: '1em',
    backgroundColor: '#F7F7F7',
    border: '1px solid #CCC',
    borderRightColor: '#999',
    borderLeftColor: '#999',
    borderBottomColor: '#999',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopColor: '#DADADA',
    color: '#666',
    boxShadow: '0 3px 8px rgba(50, 50, 50, 0.17)',
    textAlign: 'center'
  }
})
