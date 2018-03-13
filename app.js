/*-----------------------------------------------------------------------------
CEMi/CEMboss is a bot for answer CME/o365 related questions 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var request = require('request');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var builder_cognitiveservices = require("botbuilder-cognitiveservices");
var cardGen = require("./cardGenerator.js");

//CEMboss
var cemboss = require('./cemBoss');
var cemStall = require('./cemStall');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

/*
var entGen = azure.TableUtilities.entityGenerator;
var retryOperations = new azure.ExponentialRetryPolicyFilter();
var tableSvc = azure.createTableService().withFilter(retryOperations);
*/
var feedbackTableName = 'feedback';
var azureFeedbackTableClient = new botbuilder_azure.AzureTableClient(feedbackTableName, process.env['AzureWebJobsStorage']);
var feedbackTableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureFeedbackTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

var recognizer = new builder_cognitiveservices.QnAMakerRecognizer({
                knowledgeBaseId: process.env.QnAKnowledgebaseId, 
    subscriptionKey: process.env.QnASubscriptionKey});

var basicQnAMakerDialog = new builder_cognitiveservices.QnAMakerDialog({
    recognizers: [recognizer],
                defaultMessage: 'Sorry, I didn\'t get you.\nI\'m still learning.\nType \'help\' for assistance.',
                qnaThreshold: 0.3}
);

bot.dialog('basicQnAMakerDialog', basicQnAMakerDialog);

bot.dialog('/', //basicQnAMakerDialog);
[
    function (session){
        session.sendTyping();
        var qnaKnowledgebaseId = process.env.QnAKnowledgebaseId;
        var qnaSubscriptionKey = process.env.QnASubscriptionKey;
        
        // QnA Subscription Key and KnowledgeBase Id null verification
        if((qnaSubscriptionKey == null || qnaSubscriptionKey == '') || (qnaKnowledgebaseId == null || qnaKnowledgebaseId == '')){           
  
            session.send('Please set QnAKnowledgebaseId and QnASubscriptionKey in App Settings. Get them at https://qnamaker.ai.');
            //session.send("Sorry I did not understand what you said.\nI\'m still learning.\nType 'help' for assistance.");
        }else{
            session.sendTyping();
            session.replaceDialog('basicQnAMakerDialog');
        }
    }
]);

basicQnAMakerDialog.respondFromQnAMakerResult = function(session, qnaMakerResult){
    // Save the question
    var question = session.message.text;
    session.conversationData.userQuestion = question;
   
    if(!isJson(qnaMakerResult.answers[0].answer)){       
        // Not semi colon delimited, send a normal text response 
        session.send(qnaMakerResult.answers[0].answer);
    }else if(qnaMakerResult.answers && qnaMakerResult.score >= 0.5){
        
        var qnaAnswer =  JSON.parse(qnaMakerResult.answers[0].answer);        
        var msg = "";
        if(qnaAnswer.type.toLowerCase() === "carousal"){
            let cards = [];
            qnaAnswer.cards.forEach(card => {
                cards.push(cardSwitch(session,card));
            });
            // attach the card to the reply message
            msg =  new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        }else{
            msg = new builder.Message(session).addAttachment(cardSwitch(session, qnaAnswer));
        }

        session.send(msg).endDialog();
    } 
    
}

function cardSwitch(session, card){    
     //Card Switch
    switch (card.type.toLowerCase()) {
        case "herocard":
            return cardGen.heroCard(session, card);               
        case "videocard":
            return cardGen.videoCard(session, card);
        default:
            return cardGen.heroCard(session, card);
    }     
}

// Middleware for logging
bot.use({
    receive: function (event, next) {
        //logUserConversation(event);
        next();
    },
    send: function (event, next) {
        //logUserConversation(event);
        next();
    }
});

/*
// This dialog helps the user to add data to knowlage base.
bot.dialog('knowledgeBase', [
    function (session) {
        session.sendTyping();
        builder.Prompts.text(session, "Contribute to Knowledge Base.\nPlease type the question.");
        //session.beginDialog('askForDateTime');
    },
    function (session, results) {
        session.sendTyping();
        session.dialogData.question = results.response;
        builder.Prompts.text(session, "Please type the answer.");
        //session.beginDialog('askForPartySize');
    },
    function (session, results) {
        session.sendTyping();
        session.dialogData.answer = results.response;
        session.send(`Your entry.<br/> Question: ${session.dialogData.question} <br/>Answer: ${session.dialogData.answer}`);
        builder.Prompts.confirm(session, "Is everything looks good to submit?");
        //session.beginDialog('askForReserverName');
        
    },function(session, results){
        session.sendTyping();
        if(results.response){
            knowledgebaseUpdate(session.dialogData);
            session.send("Thank you for sharing knowledge with me.\nThis knowledge will be published after a review.").endDialog();                        
        }
       session.send("Please type \'knowledge base\' and retry to share your knowledge with me.").endDialog();             
    }
])
.triggerAction({
    matches: /(knowledge base|teach|contribute)/i
});
*/

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function knowledgebaseUpdate(data){   

    var data = {
                "add": {
                    "qnaPairs": [
                        {
                            "answer": data.answer,
                            "question": data.question
                        }
                    ],
                    "urls": [ ]
                }
            }
    
    request({
        uri:"https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/"+process.env.QnAKnowledgebaseId,
        method: "PATCH",
        json: true,   
    	headers:{
        'Ocp-Apim-Subscription-Key': process.env.QnASubscriptionKey,
        'Content-Type':'application/json'
        },
      body: data
    	
    }, function (error, response, body){
        //console.log(response);
    });
    
} 

const logUserConversation = (event) => {
    //console.log('message: ' + event.text + ', user: ' + event.address.user.name);
    insertFeedbackData(event.text, event.address.user.name);
};

//Create CEMboss
cemboss.create(bot);
//CEM Stall Prompts
cemStall.prompts(bot);


