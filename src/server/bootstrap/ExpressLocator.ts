// import { Container, ENVKEY, Profile } from '@config/env'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import passport from 'passport'
import hpp from 'hpp'
import helmet from 'helmet'

// const HOST = Container.getValue(ENVKEY.SERVER.HOST)

// Container.namespace(Profile.DEVELOPMENT)
// Container
// 	.bindName(ENVKEY.SERVER.EXPRESS.APP)
// 	.to(()=>{
// 		const app = express()

// 		app.use(hpp())
// 		app.use(helmet())
// 		app.use(morgan('combined'))
// 		app.use(cors({
// 			origin: new RegExp(HOST),
// 			credentials: true,
// 		}))

// 		return app
// 	})


// Container.namespace(Profile.PRODUCTION)
// Container
// 	.bindName(ENVKEY.SERVER.EXPRESS.APP)
// 	.to(()=>{
// 		const app = express()
		
// 		app.use(hpp())
// 		app.use(helmet())
// 		app.use(morgan('combined'))
// 		app.use(cors({
// 			origin: new RegExp(HOST),
// 			credentials: true,
// 		}))

// 		return app
// 	})