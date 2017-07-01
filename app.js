var fs = require('fs');
var Blocktrail = require('blocktrail-sdk');
var Twitter = require('twitter');
var Express = require('express');
var bodyParser = require('body-parser');
var config = {};

var app = Express();

function tweetBlock (block) {
    if (block == undefinied){
        return
    } else {
        var blockNumber = block.height;
        var blockHash = block.hash;
        var tTx = block.transactions;
        var tBalance = block.value
    /*
        var client = new Twitter({
            consumer_key: config.Key,
            consumer_secret: config.Secret,
            access_token_key: config.Token_Key,
            access_token_secret: config.Token_Secret
        });

        if (blockNumber == 0) {
            client.post('statuses/update', {status: 'HARD FORK!!!'}, function(error, tweet, response) {
                if(error) {
                    console.log('Warning: error while tweeting ' + error);
                } else if(tweet == null) {
                    console.log('Warning: tweet is null');
                } else {
                    console.log(tweet);
                }
            });
        } 
    */
        var message = 'Block: ' + blockNumber + ' Hash: ' + blockHash + ' ' + tTx + ' Txs ' + tBalance + ' BTC ' + config.ExplorerURL + blockNumber;    

        console.log(message);
    /*
        client.post('statuses/update', {status: message}, function(error, tweet, response) {
            if(error) {
                console.log('Warning: error while tweeting ' + error);
            } else if(tweet == null) {
                console.log('Warning: tweet is null');
            } else {
                console.log(tweet);
            }
        });
        */
    }
}

function loadConfig(){
    try {
        var configContents = fs.readFileSync('config.json');
        config = JSON.parse(configContents);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            console.log('No config file found.');
            process.exit(1);
        } else {
            throw error;
            process.exit(1);
        }
    }
}

loadConfig()

console.log('Using configuration:');
console.log(config);

app.post('/getBlock', function(request, response){
    console.log(request.body);
//    tweetBlock(req.body);
    response.send('Thanks');
});

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw(options));

app.listen(config.Port);



console.log('Server started! At http://localhost:' + config.Port);

//var client = Blocktrail.BlocktrailSDK({apiKey: config.BlockTrail_ApiKey, apiSecret: config.BlockTrail_ApiSecret, network: config.Network, testnet: false});
//watcher(config, client);