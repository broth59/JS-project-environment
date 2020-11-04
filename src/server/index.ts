import { Container, ENVKEY } from '@config/env'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors' 
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import passport from 'passport'
import hpp from 'hpp'
import helmet from 'helmet'  
 
  
const app = express()


const PORT = Container.getValue(ENVKEY.SERVER.PORT)
const HOST = Container.getValue(ENVKEY.SERVER.HOST)

app.listen(PORT, HOST, ()=>{
	console.log('listening')
})

app.get('/', (req, res)=>{
	console.log('ready to root')
	res.send('welcome to rootasdas')
})

app.get('/graphql', (req, res, next)=>{
	
	console.log('ready to graphql')
})