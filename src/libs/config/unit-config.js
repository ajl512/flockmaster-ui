import { unitType, defaultUnit } from '@/config'
export const setNumAndUnit = (val) => {
  let res = val
  unitType.forEach(unit => {
    if (!val.includes(unit)) {
      res = val + defaultUnit
      return
    }
  })
  return res
}