
type KlassDecorator = (klass:AnyClass)=>AnyClass 

export const INTERCEPT_EXCEPTION_LIST = [
	'constructor', '__reactstandin__regenerateByEval'
] 


type InterceptHooks = {
	before?	: AnyFunction ,
	after?	: AnyFunction ,
	error?	: AnyFunction ,
}
type InterceptHook = {
	(bound_fn:AnyFunction):any
}

function isInterceptHook(hook_like: InterceptHook | InterceptHooks): hook_like is InterceptHook{
	if(typeof hook_like !== 'function'){
		return false
	}else{
		return true
	}
}



export function intercept(hooks: InterceptHooks) : KlassDecorator
export function intercept(hooks:  InterceptHook) : KlassDecorator


export function intercept(hook_like: InterceptHooks | InterceptHook): KlassDecorator{
	let warpper_sync_fn  : (bound_fn:AnyFunction)=> AnyFunction
 	let warpper_async_fn : (bound_fn:AnyFunction)=> AnyFunction

	if(isInterceptHook(hook_like)){
		warpper_sync_fn = function(bound_fn:AnyFunction){
			return function (...args:any []) {
				return hook_like(()=>bound_fn(args))		
			}
		}
		warpper_async_fn = warpper_sync_fn
	}else{
		warpper_sync_fn = function(bound_fn:AnyFunction){
			return function (...args:any []) {
				try{
					hook_like.before && hook_like.before(args)
					const result = bound_fn(args)
					hook_like.after && hook_like.after(result)
					return result
				}catch(e){
					hook_like.error && hook_like.error(e)
				}		
			}
		}
		warpper_async_fn = function(bound_fn:AnyFunction){
			return async function (...args:any []) {
				try{
					hook_like.before && hook_like.before(args)
					const result = await bound_fn(args)
					hook_like.after && hook_like.after(result)
					return result
				}catch(e){
					hook_like.error && hook_like.error(e)
				}		
			}
		}
	}

	return function Watch( klass: AnyClass) {

		const descriptor_list = Object.getOwnPropertyDescriptors(klass.prototype);
		const keys 			  = Object.keys(descriptor_list);	

		keys.forEach(key=>{
			const descriptor = descriptor_list[key]
			const method 	 = descriptor.value
			if(!INTERCEPT_EXCEPTION_LIST.includes(key)){
				
				const is_async = /return __await/.test(method.toString())
				
				Reflect.defineProperty(klass.prototype, key, {
					configurable: true,
					get(){
						const bound_fn = method.bind(this)
						const func = warpper_sync_fn(bound_fn)
						const async_func = warpper_async_fn(bound_fn)

						Reflect.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: false,
							value: is_async ? async_func : func
						}); 

						return is_async ? async_func : func
					}
				})
			}

		})

		return klass
	}
}
