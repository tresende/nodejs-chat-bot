var express = require("express");
var cfenv = require("cfenv");
var watson = require("watson-developer-cloud");
var app = express();

var conversation = watson.conversation({
  username: "xxxx",
  password: "xxxx",
  version: "v1",
  version_date: "2017-02-03"
});
var context = {};
app.use(express.static(__dirname + "/public"));
var appEnv = cfenv.getAppEnv();

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/string", function (req, res) {
  //Nao consegui pegar o texto do input de nenhum jeito senao este, abaixo. Modifiquei a url que o ajax chama para ser /string?texto para poder pergar o texto com o _parsedOriginalUrl
  var pergunta = req._parsedOriginalUrl.query;

  conversation.message({
    workspace_id: "513063a4-38a1-4178-9044-8deab39d3404",
    input: { "text": pergunta },
    context: context
  }, function (err, response) {
    context = response.context;
    res.send(JSON.stringify(response.output, null, 2));
  });
});

app.listen(appEnv.port, "0.0.0.0", function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
