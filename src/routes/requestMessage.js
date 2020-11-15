const { request, response, Router } = require('express');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator} = require('ibm-watson/auth');

const requestMessage =  Router();
const assistantId = '273b6b99-2cb7-4623-8560-3a5bdb7ebdab';
let requestSession='';

requestMessage.post('/', async (request, response) => {
  const text = request.body.message;
  try{

    const assistant = new AssistantV2({
      version: '2020-09-24',
      authenticator: new IamAuthenticator({
        apikey: '6GM6SW56FbiWWgBVjGjRF7dweRfyyjB0S31ocChS9ZBb',
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