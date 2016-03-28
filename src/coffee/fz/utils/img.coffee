module.exports.fit = ( wImg, hImg, wHolder, hHolder ) =>
  sw = wImg / wHolder
  sh = hImg / hHolder

  ratio = 0
  if ( sw > sh )
    ratio = sh
  else
    ratio = sw

  ratio = 1 / ratio

  w = wImg * ratio
  h = hImg * ratio
  x = wHolder - w >> 1
  y = hHolder - h >> 1

  return { x: x, y: y, w: w, h: h }
