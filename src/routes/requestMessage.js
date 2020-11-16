const { request, response, Router } = require('express');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator} = require('ibm-watson/auth');

const requestMessage =  Router();
const assistantId = 'f586f5d0-99ed-40f7-ba4b-45da1e720545';
let requestSession='';

requestMessage.get('/kill-session', async (request, response) => {
console.log('KILL SESSION')

if(requestSession !== undefined && requestSession !== ''){
  const assistant = new AssistantV2({
    version: '2020-09-24',
    authenticator: new IamAuthenticator({
      apikey: '4mcMLjMromtJRnizHJVWi2l0SgtEYTp_BoXNGSKLUuFF',
    }),
    serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/',
  });

  assistant.deleteSession({
    assistantId: assistantId,
    sessionId: requestSession.result.session_id,
  })
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.log(err);
    });
    requestSession='';

}
}
)
requestMessage.post('/', async (request, response) => {
  const text = request.body.message;
  try{

    const assistant = new AssistantV2({
      version: '2020-09-24',
      authenticator: new IamAuthenticator({
        apikey: '4mcMLjMromtJRnizHJVWi2l0SgtEYTp_BoXNGSKLUuFF',
      }),
      serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/',
    });

    
    console.log(requestSession, 'antes')
    if(requestSession === ''){
      console.log(requestSession, 'durante')
      requestSession = await assistant.createSession({
        assistantId: assistantId
      })
    }
    console.log(requestSession.result, 'depois')
    
    assistant.message({
      assistantId: assistantId,
      sessionId: requestSession.result.session_id,
      input: {
        'message_type': 'text',
        'text': text
        }
      })
      .then(res => {
        console.log(JSON.stringify(res.result))
        return response.json(JSON.stringify(res.result.output.generic[0].text));
      })
      .catch(err => {
        
      });

      
  }
  catch(err){
  }
  
  
  
});

module.exports = requestMessage;