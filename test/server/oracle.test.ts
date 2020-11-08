// //bootstrap
// //module
// import { ApolloServer } from '@apollo/server'
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
// import 'babel-polyfill'
// import 'cross-fetch/polyfill'

// // beforeAll(async ()=>{
	
// // })


// describe('Oracle db connection', ()=>{
	
// 	it('connect', async (done)=>{
// 		const client = new ApolloClient({
// 			uri: 'http://localhost:3020/graphql',
// 			cache: new InMemoryCache(),
// 		});		
// 		await client
// 		.query({
// 			query: gql`
// 				query lecture($content_no:Name) {
// 					cotent_no
// 				}
// 			`
// 			,
// 			variables: {
// 				content_no : 1
// 			}
// 		})
// 		.then(result => console.log(result))
// 		.catch(console.log)

 	
// 	}, 20000)

// })