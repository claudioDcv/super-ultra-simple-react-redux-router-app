import actionsBase from './auth_actions'
import requestBaseImp from './auth_request'
import middlewareBase from './auth_middleware'
import reducersBase from './auth_reducers'


export const requestBase = requestBaseImp;

export default {
  actionsBase,
  middlewareBase,
  reducersBase,
}
