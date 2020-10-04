import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import { EnvKey } from '@config/env'
import { Container } from './bootstrap';

const compiler_configuration = Container.getValue(EnvKey.Webpack.WEBPACK_COMPILER_CONFIG)
const compiler 				 = webpack(compiler_configuration)

const dev_server_configuration = Container.getValue(EnvKey.Webpack.WEBPACK_SERVER_CONFIG)
const dev_server = new WebpackDevServer(compiler, dev_server_configuration);

const port:number = Container.getValue(EnvKey.Webpack.PORT)
const host:string = Container.getValue(EnvKey.Webpack.HOST)

dev_server.listen(port, host, (err) => {
  if (err) {
    return console.log(err.message);
  }
  
  //openBrowser(urls.localUrlForBrowser);
});


//dev server 종료
['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
		dev_server.close();
      process.exit();
    });
});


