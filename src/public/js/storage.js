export const TOKEN_KEY = '__token__'
export const TELEPHONE_KEY = '__telephone__'
export const USERNAME_KEY = '__username__'
export const IDENTIFY_KEY = '__identify__'
export const ADDR_KEY = '__addr__'


export const INSTORE_KEY = '__instore__'

export const OUTSTORE_KEY = '__outstore__'

export const DAMAGE_KEY = '_damage_'

export const USER_KEY = '__user__'

export const GOODSDIR_KEY = '__goodsDir__'

export const PROVIDER_KEY = '__provider__'

export const EMPLOYEE_KEY = '__employee__'
export const SYSTEMMANAGE_KEY = '__systemManager__'

//export const allEmployee = []

export default {
  get(key) {
    return window.sessionStorage.getItem(key)
  },
  set(key, val) {
    window.sessionStorage.setItem(key, val)
  },
  remove(key) {
    window.sessionStorage.removeItem(key)
  },
  clear() {
    window.sessionStorage.clear()
  }
}
