import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import { ENVKEY } from '@config/env'
import { Container } from './bootstrap';

const compiler_configuration = Container.getValue(ENVKEY.CLIENT.WEBPACK.COMPILER_CONFIG)
const compiler 				 = webpack(compiler_configuration)

const dev_server_configuration = Container.getValue(ENVKEY.CLIENT.WEBPACK.SERVER_CONFIG)
const dev_server = new WebpackDevServer(compiler, dev_server_configuration);

const port:number = Container.getValue(ENVKEY.CLIENT.WEBPACK.PORT)
const host:string = Container.getValue(ENVKEY.CLIENT.WEBPACK.HOST)

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


