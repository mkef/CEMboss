var builder = require('botbuilder');

//CEMBoss Dialogs
exports.create = function (bot) {
    
    bot.dialog('cemi', [
        function(session, args, next){     
            session.sendTyping();   
            const card = new builder.ThumbnailCard(session)
            .title('Hi! I\'m CEMi')
            .subtitle('CEMi is created to get help for CEM(Customer Experience Management) related questions.\n#TD18CEM')
            .text('')
            .images([
                builder.CardImage.create(session,"https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_1508920769/chatbotsbuilder.png" )
                
            ])
            card.buttons([
                //new builder.CardAction(session).title('What is CEM ?').value('Show CEM Intro').type('imBack'),
                new builder.CardAction(session).title('Tech Month 2018 - CEM (#TD18CEM)').value('What\'s in CEM Stall?').type('imBack'),        
                new builder.CardAction(session).title('Get help').value('Help').type('imBack'),
            ]).text("What's your interest?");
    
            const message = new builder.Message(session).speak('Hi! I\'m CEMi').inputHint(builder.InputHint.acceptingInput);
            message.addAttachment(card);  
            card.images.argument
            // we can end the conversation here
            // the buttons will provide the appropriate message
            session.endConversation(message);   
        },
    ]).triggerAction( {matches: /^cemi$/i});       
  
    bot.dialog('IdidNotUndestand', [
        function(session, args, next){
            session.send("Sorry I did not undertand what you said.\n Please Check the below options.");  
            session.beginDialog("cemi");  
        },
    ]);
    
    bot.dialog('GoodBye', [
        function(session, args, next){       
           session.endConversation("Goodbye");
        },
    ]).triggerAction( {matches: /(bye|cancel|exit|close|reset)/i});
    
    bot.dialog('Help', [
        function(session, args, next){            
            session.endConversation("Type 'CEM Stall' to check CEM stall.\nAsk any CEM related question."); 
        },
    ]).triggerAction( {matches: /(help|get help)/i}); 
    
    // Send welcome when conversation with bot is started, by initiating the root dialog
    bot.on('conversationUpdate', function (message) {
        if (message.membersAdded) {           
            message.membersAdded.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    bot.beginDialog(message.address, 'cemi');
                }
            });
        }
    });
}
