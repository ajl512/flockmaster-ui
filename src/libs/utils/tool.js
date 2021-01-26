/**
 * @desc 根据图片url获取图片的宽高
 * @param {*} imgUrl 图片地址
 * return 含width和height的对象
 */
export const getImageInfo = (imgUrl) => {
  return new Promise(resolve => {
    if (!imgUrl) { resolve({}) }
    const img = new Image()
    img.src = imgUrl
    // 定时器获取获取宽高
    const check = () => {
      if(img.width>0 || img.height>0) {
        clearInterval(set)
        resolve({ width: img.width,height: img.height})
      }
    }
    const set = setInterval(check, 10)
    // 读取缓存
    if (img.complete) {
      resolve({ width: img.width,height: img.height})
    } else {
      // 加载完成活动宽高
      img.onload = () => {
        resolve({ width: img.width,height: img.height})
      }
    }
  })
}

/**
 * 
 * @param {*} filesPath 
 * return示例 {button/btn_log.png: "/img/btn_log.0c75a6e3.png"}
 */
export const getImagesMap = (filesPath) => {
  return filesPath.keys().reduce((map, name) => {
    map[name.replace('./', '')] = filesPath(name)
    return map
  }, {})
}