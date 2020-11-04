import { observable, makeAutoObservable, action, computed } from "mobx";
import { autobind } from "core-decorators";
import { intercept } from "../decorators/aop/intercept";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

	
@autobind
export class RootStore {
	
	query_store:QueryStore
	auto_store:AutoStore

	constructor(){
		this.query_store = new QueryStore(this)
		this.auto_store  = new AutoStore(this)
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
export class AutoStore {
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
	getAutoList(){
		return this.auto_list
	}

	@action
	addNewAuto(){
		this.auto_list = this.auto_list.concat(new Auto(String(AutoStore.seiral ++)))
		this.trigger ++
	}

}


// @autobind
@intercept((fn)=>{
	const result = fn()
	if(result instanceof Promise){
		fn().catch(alert)
	}
	return result
})
export class Auto {
	@observable
	public name:string

	constructor(name:string){
		this.name = name
	}

	getName(){
		return this.name
	}

	async setName(){
		const client = new ApolloClient({
			uri: 'https://48p1r2roz4.sse.codesandbox.io',
			cache: new InMemoryCache()
		});		
		client
		.query({
			query: gql`
				query GetRates {
					rates(currency: "USD") {
					currency
					}
				}
			`
			,
			variables: {
				
			}
		})
		.then(result => console.log(result));
		this.name += '^tail'
		
	}

}


export const createStore = () => {

  return new RootStore();
};

export type TStore = RootStore//ReturnType<typeof createStore>;


