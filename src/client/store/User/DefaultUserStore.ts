import UserStore from "./UserStore";
import User from '@interface/domain/User/User'

export default class DefaultUserStore implements UserStore {
	
	private user:User

	constructor(user:User){
		this.user = user
	}

	getEmail(){
		return this.user.getEmail()
	}
}

export { UserStore }