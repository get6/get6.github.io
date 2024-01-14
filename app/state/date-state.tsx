import { atom } from 'recoil'

export const todayState = atom<Date>({
  key: 'todayState',
  default: new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ),
})
