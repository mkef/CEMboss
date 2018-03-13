
/*
    CEM Stall Module
*/

var builder = require('botbuilder');
var stallCards = require("./cemStallCards.json");
var cardGen = require("./cardGenerator.js");

var CemCard = "CEM Intro";
var HeroCardName = "Hero Card";
var ThumbnailCardName = "Thumbnail Card";
var ReceiptCardName = "Receipt Card";
var SigninCardName = "Sign-in Card";
var AnimationCardName = "Animation Card";
var VideoCardName = "Video Card";
var AudioCardName = "Audio Card";

//CEM Stall Items
var MrBroCardName = "kAinos";
var SnapAndWinCardName = "Snap And Win";
var SpinWheellCardName = "Spin The Wheel And Win";
var KahootGameCardName = "MobiQuiz";
var DigitalPracticeCardName = "Digital Practice Expertise";
var VortexCardName = "VORTEX";
var Offfice365CardName = "O365 Features"
 
var stallItems = [MrBroCardName, SnapAndWinCardName, SpinWheellCardName, KahootGameCardName, DigitalPracticeCardName, VortexCardName, Offfice365CardName];

//var CardNames = [HeroCardName, ThumbnailCardName, ReceiptCardName, SigninCardName, AnimationCardName, VideoCardName, AudioCardName];

function createCard(session, selectedCardName) {    
    switch (selectedCardName) {
        case MrBroCardName:
            return cardGen.heroCard(session, stallCards.mrBro);            
        case SpinWheellCardName:
            return cardGen.heroCard(session, stallCards.spinWheel); 
        case KahootGameCardName:
            return cardGen.heroCard(session, stallCards.kahootGame);
        case DigitalPracticeCardName:
            return cardGen.heroCard(session, stallCards.digitalPractice);
        case VortexCardName:
            return cardGen.heroCard(session, stallCards.vortex);
        case SnapAndWinCardName:
            return cardGen.heroCard(session, stallCards.SnapAndWin);
        case Offfice365CardName:
            return cardGen.heroCard(session, stallCards.o365);
        
        
        //case HeroCardName:
            //return createHeroCard(session);
        case ThumbnailCardName:
            return createThumbnailCard(session);
        case ReceiptCardName:
            return createReceiptCard(session);
        case SigninCardName:
            return createSigninCard(session);
        case AnimationCardName:
            return createAnimationCard(session);
        case VideoCardName:
            return createVideoCard(session);
        case AudioCardName:
            return createAudioCard(session);
        case CemCard:
            return createCemCard(session);
        default:
            return new builder.HeroCard(session)
            .title('Get Help')            
            .text('CEMi  Help')
            .images([
                builder.CardImage.create(session, 'http://www.psdgraphics.com/file/life-belt-icon.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://www.yammer.com/virtusa.com/#/threads/inGroup?type=in_group&feedId=14057101', 'Get Help')
            ]);
    }
}


function createThumbnailCard(session) {
    return new builder.ThumbnailCard(session)
        .title('BotFramework Thumbnail Card')
        .subtitle('Your bots — wherever your users are talking')
        .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        .images([
            builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Started')
        ]);
}

var order = 1234;
function createReceiptCard(session) {
    return new builder.ReceiptCard(session)
        .title('John Doe')
        .facts([
            builder.Fact.create(session, order++, 'Order Number'),
            builder.Fact.create(session, 'VISA 5555-****', 'Payment Method')
        ])
        .items([
            builder.ReceiptItem.create(session, '$ 38.45', 'Data Transfer')
                .quantity(368)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png')),
            builder.ReceiptItem.create(session, '$ 45.00', 'App Service')
                .quantity(720)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png'))
        ])
        .tax('$ 7.50')
        .total('$ 90.95')
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/pricing/', 'More Information')
                .image('https://raw.githubusercontent.com/amido/azure-vector-icons/master/renders/microsoft-azure.png')
        ]);
}

function createSigninCard(session) {
    return new builder.SigninCard(session)
        .text('BotFramework Sign-in Card')
        .button('Sign-in', 'https://login.microsoftonline.com');
}

function createAnimationCard(session) {
    return new builder.AnimationCard(session)
        .title('Microsoft Bot Framework')
        .subtitle('Animation Card')
        .image(builder.CardImage.create(session, 'https://docs.microsoft.com/en-us/bot-framework/media/how-it-works/architecture-resize.png'))
        .media([
            { url: 'http://i.giphy.com/Ki55RUbOV5njy.gif' }
        ]);
}

function createVideoCard(session) {
    return new builder.VideoCard(session)
        .title('Big Buck Bunny')
        .subtitle('by the Blender Institute')
        .text('Big Buck Bunny (code-named Peach) is a short computer-animated comedy film by the Blender Institute, part of the Blender Foundation. Like the foundation\'s previous film Elephants Dream, the film was made using Blender, a free software application for animation made by the same foundation. It was released as an open-source film under Creative Commons License Attribution 3.0.')
        .image(builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/220px-Big_buck_bunny_poster_big.jpg'))
        .media([
            { url: "https://virtusaonline-my.sharepoint.com/personal/tsutharsan_virtusa_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Ftsutharsan_virtusa_com%2FDocuments%2FShared%20with%20Everyone%2FCEM%2Emp4&parent=%2Fpersonal%2Ftsutharsan_virtusa_com%2FDocuments%2FShared%20with%20Everyone&slrid=5b9a4c9e-e012-5000-14f6-70f67ba7f580"}
                //'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://virtusaonline-my.sharepoint.com/personal/tsutharsan_virtusa_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Ftsutharsan_virtusa_com%2FDocuments%2FShared%20with%20Everyone%2FCEM%2Emp4&parent=%2Fpersonal%2Ftsutharsan_virtusa_com%2FDocuments%2FShared%20with%20Everyone&slrid=5b9a4c9e-e012-5000-14f6-70f67ba7f580', 'Watch Online')
        ]);
}

function createAudioCard(session) {
    return new builder.AudioCard(session)
        .title('I am your father')
        .subtitle('Star Wars: Episode V - The Empire Strikes Back')
        .text('The Empire Strikes Back (also known as Star Wars: Episode V – The Empire Strikes Back) is a 1980 American epic space opera film directed by Irvin Kershner. Leigh Brackett and Lawrence Kasdan wrote the screenplay, with George Lucas writing the film\'s story and serving as executive producer. The second installment in the original Star Wars trilogy, it was produced by Gary Kurtz for Lucasfilm Ltd. and stars Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams, Anthony Daniels, David Prowse, Kenny Baker, Peter Mayhew and Frank Oz.')
        .image(builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'))
        .media([
            { url: 'http://www.wavlist.com/movies/004/father.wav' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://en.wikipedia.org/wiki/The_Empire_Strikes_Back', 'Read More')
        ]);
}

function toTitleCase(str){
   return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
     );
}

exports.prompts = function(bot){
    
    bot.dialog('CEMStall', [
        (session, args, next) => {
            session.sendTyping();
            builder.Prompts.choice(session, 'Events in Tech Month 2018 CEM stall . What is your intrest?', stallItems, {
                maxRetries: 1,
                retryPrompt: 'Ooops, what you wrote is not a valid option, please try again',
                listStyle: builder.ListStyle.button
            });
        },
        (session, args, next) => {
            session.sendTyping();
            console.log(args.response)
            if(!args.response){
                next();
            }else{
                var selectedCardName = args.response.entity;
                console.log("CEMStall: " + selectedCardName)
                var card = createCard(session, selectedCardName);
        
                // attach the card to the reply message
                var msg = new builder.Message(session).addAttachment(card);
                session.send(msg);
                builder.Prompts.confirm(session, "Do you like to explore more?");
            }
            
        },
        (session, args, next) => {
            session.sendTyping();
            if(args.response){
                session.endDialog();
                session.beginDialog('CEMStall');
            }else{
                session.send("Thanks for exploring our stall.").endDialog();          
            }
       
        },
    ]).triggerAction( {matches: /CEM Stall/i});
    
    /*bot.dialog('ShowCard', [
        function(session, args, next){
            // create the card based on selection
            session.sendTyping();
            //console.log(session);
            console.log(args);
            console.log(args.intent.matched[0]);    
    
            var selectedCardName = args.intent.matched[0];       
            console.log(selectedCardName.toLowerCase().replace("show ",""));
            var card = createCard(session, selectedCardName.toLowerCase().replace("show ","") );
            //var card = createCard("Video card", session);
            // attach the card to the reply message
            var msg = new builder.Message(session).addAttachment(card);
            session.endConversation(msg);  
        },
    ]).triggerAction( {matches: /show\s.*i});  */
}
