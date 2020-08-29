const preventPrintScreenKey = () => {
  window.addEventListener('keyup', function (e) {
    setTimeout(() => {
      const notAllowedKeys = [44, 91]
      const allowedKeys = [116, 123]
      const code = e.which
      const inclu = notAllowedKeys.includes(code)
      const pos2 = code === 44 || code === 91
      if (inclu || pos2) {
        const fakeEl = document.createElement('input')
        fakeEl.setAttribute('value', 'False')
        document.body.appendChild(fakeEl)
        fakeEl.select()
        document.execCommand('copy')
        document.body.removeChild(fakeEl)
        return false
      }

      if (!allowedKeys.includes(code)) {
        return e.preventDefault()
      }

      return false
    }, 600)
  })
  // document.addEventListener('keypess keyup', function (e) {
  //   setTimeout(() => {
  //     const notAllowedKeys = [44, 91]
  //     const allowedKeys = [116, 123]
  //     const code = e.which
  //     if (notAllowedKeys.includes(code)) {
  //       const fakeEl = document.createElement('input')
  //       fakeEl.setAttribute('value', 'False')
  //       document.body.appendChild(fakeEl)
  //       fakeEl.select()
  //       document.execCommand('copy')
  //       document.body.removeChild(fakeEl)
  //       return false
  //     }

  //     if (!allowedKeys.includes(code)) {
  //       return e.preventDefault()
  //     }

  //     return false
  //   }, 300)
  // })
}

export default {
  preventPrintScreenKey
}
