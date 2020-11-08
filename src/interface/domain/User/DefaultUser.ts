import User from "@domain/User/User";
import UserEntity from "@interface/entity/UserEntity";

export default class DefaultUser implements User {
	private user:UserEntity
	
	constructor(user_entity:UserEntity){
		this.user = user_entity
	}
	
	getEmail(){
		return this.user.email
	}

	getEntity():UserEntity{
		return this.user
	}
}

export { User }