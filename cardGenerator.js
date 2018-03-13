var builder = require('botbuilder');

//Create Video Card
exports.videoCard = function createVideoCard(session, card){

    let videoCard =  new builder.VideoCard(session)
        .title(card.title)
        .subtitle(card.subtitle)
        .text(card.text);       

        if(card.images && card.images.length > 0){         
           
            let images = [];
            
            card.images.forEach(url => {                  
                images.push(builder.CardImage.create(session, url));
            });
            
            videoCard.images(images);
        }
        
        if(card.media && card.media.length > 0){         
           
            let media = [];
            
            card.media.forEach(mediaUrl => {
                images.push({url:mediaUrl});
            });
            
            videoCard.media(media);
        }
     
        if(card.buttons && card.buttons.length > 0){
            let buttons = [];
            
            card.buttons.forEach(button => {                
                 buttons.push(builder.CardAction.openUrl(session, button.url, button.title));
            });
            
            videoCard.buttons(buttons);
        }
        
   return videoCard;
}

//Create Hero Card
exports.heroCard = function createHeroCard(session, card){
    
    console.log(card);
    
    let heroCard =  new builder.HeroCard(session)
        .title(card.title)
        .subtitle(card.subtitle)
        .text(card.text);       
                
        if(card.images && card.images.length > 0){         
           
            let images = [];
            
            card.images.forEach(url => {
                images.push(builder.CardImage.create(session, url));
            });
            
            heroCard.images(images);
        }
                
        if(card.buttons && card.buttons.length > 0){
            let buttons = [];
            
            card.buttons.forEach(button => {
                 buttons.push(builder.CardAction.openUrl(session, button.url, button.title));
            });
            
            heroCard.buttons(buttons);
        }
        
   return heroCard;
}