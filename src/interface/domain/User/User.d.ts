import Domain from "../Domain";


export default interface User extends Domain {
	getEmail():string
}

export { User }