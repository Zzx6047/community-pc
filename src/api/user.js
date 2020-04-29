import axios from '@/utils/request'

// 用户签到
const userSign = () => axios.get('/user/fav')

export {
  userSign
}
