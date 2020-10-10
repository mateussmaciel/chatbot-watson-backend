const { request, response, Router } = require('express');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator} = require('ibm-watson/auth');

const requestMessage =  Router();

const assistant = new AssistantV2({
  authenticator: new IamAuthenticator({ apikey: 'ruPQwDxedp-C48YplBBezr6fnBijSsESweABQuVXmSZl' }),
  serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/',
  version: '2020-09-24',
});

async function sendMessageWatson({session, message}){  
  try{    
    const responseWatson = await assistant.message({
      assistantId: '47b3b0e3-af9a-48fa-99e8-2047fb476468',
      sessionId: session,
      input: {
        'message_type': 'text',
        'text': `${message}`
        }
      });    
    
      return responseWatson.result.output.generic[0].text;
  }catch(e){
    console.error(e.message);
  }  
}

requestMessage.post('/', async (request, response) => {
  const {message} = request.body;
  const sessionId = await assistant.createSession({
    assistantId: '47b3b0e3-af9a-48fa-99e8-2047fb476468'
  });
  
  const requesteWatson = await sendMessageWatson({session: sessionId.result.session_id, message});
  return response.json({message: requesteWatson});
});

module.exports = requestMessage;