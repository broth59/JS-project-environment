import express, { Express, Router, Request, Response } from 'express'
import { EntityManager } from "typeorm";
import Route from './Route';


class UserRouter implements Route{
	private entry_point = '/user'
	private app:Express
	private router:Router
	private db_manager:EntityManager

	constructor(app:Express, db_manager:EntityManager){
		this.app = app
		this.router = Router()
		this.db_manager = db_manager
		this.defineRouteWithURL()
		this.mapRouterWithApp()
	}

	defineRouteWithURL(){
		this.router.get('/login', this.login)
		this.router.get('/logout', this.logout)
	}

	login(req:Request, res:Response, next:AnyFunction){
		res.status(200).json({ message: true })
	}
	logout(req:Request, res:Response, next:AnyFunction){
		res.status(200).json({ message: true })
	}


	mapRouterWithApp(){
		this.app.use(this.entry_point, this.router)
	}
}


export default UserRouter

export { UserRouter }