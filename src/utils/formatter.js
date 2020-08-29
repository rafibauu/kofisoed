/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable prefer-const */

import format from 'date-fns/format'
import idlocale from 'date-fns/locale/id'

export const formatDate = (date) => {
  // Minggu, 17 Desember 2018 - 17:00 WIB
  return format(new Date(date), 'dddd, D MMMM YYYY - HH:mm [WIB]', {
    locale: idlocale
  })
}

/**
 * Convert an image
 * to a base64 url
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat=image/png]
 */
export const convertImgURLtoB64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    // img.crossOrigin = 'Anonymous';
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      let canvas = document.createElement('CANVAS')
      const ctx = canvas.getContext('2d')
      let dataURL
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      dataURL = canvas.toDataURL('image/png')
      resolve(dataURL)
      canvas = null
    }
    img.onerror = () => {
      reject('image cant be loaded')
    }
    img.src = url.replace(/^https:\/\//i, 'http://')
  })
}

export const convertDataURITOFile = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1])
  else byteString = unescape(dataURI.split(',')[1])

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}

export const secondsToTime = (secs) => {
  const hours = Math.floor(secs / (60 * 60))

  const divisor_for_minutes = secs % (60 * 60)
  const minutes = Math.floor(divisor_for_minutes / 60)

  const divisor_for_seconds = divisor_for_minutes % 60
  const seconds = Math.ceil(divisor_for_seconds)

  const obj = {
    h: hours,
    m: minutes,
    s: seconds
  }
  return obj
}
