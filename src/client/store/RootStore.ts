import { observable, makeAutoObservable, action, computed } from "mobx";
import StoreProvider from "@client/context/StoreContext";
import { autobind } from "core-decorators";

@autobind
export class RootStore {
	
	query_store:QueryStore
	auto_store:AutoStore

	constructor(){
		this.query_store = new QueryStore(this)
		this.auto_store = new AutoStore(this)
	}
	
}


@autobind
class QueryStore{
	
	@observable
	cities  = ['busan', 'seoul']
	@observable
	query = ''

	constructor(
		public root_store:RootStore
	){
		this.root_store = root_store
		makeAutoObservable(this)
	}

	@action
	setQuery(query: string) {
		this.query = query.toLowerCase();
	}

	@action
	addCity(){
		this.cities.push('aslan')
	}


	@computed
	getQuery() {
		return this.query
	}
	
	@computed
	get filteredCities() {
		return this.cities.filter(city =>
		  city.toLowerCase().includes(this.query)
		);
	  }

}

@autobind
class AutoStore {
	static seiral = 1
	@observable
	auto_list:Array<Auto> = [ new Auto('tt'), new Auto('aa') ]
	trigger = 0

	constructor(
		public root_store:RootStore
	){
		this.root_store = root_store
		makeAutoObservable(this)
	}

	@computed
	get getAutoList(){
		return this.auto_list
	}

	@action
	addNewAuto(){
		this.auto_list = this.auto_list.concat(new Auto(String(AutoStore.seiral ++)))
		this.trigger ++
	}

}

@autobind
export class Auto {
	@observable
	public name:string

	constructor(name:string){
		this.name = name
		makeAutoObservable(this)
	}

	@computed
	getName(){
		return this.name
	}
}


export const createStore = () => {

  return new RootStore();
};

export type TStore = RootStore//ReturnType<typeof createStore>;