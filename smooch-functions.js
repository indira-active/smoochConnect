
const smoochFunctions = (smooch)=>{

  smooch.webhooks.list().then((response) => {
    console.log(response)
});

smooch.appUsers.sendMessage('68c03f415fce99c4be3f7156', {
    text: 'this is sent from the backend',
    role: 'appUser',
    type: 'text'
}).then(() => {
  console.log('lets see what happens on the console')
});

smooch.appUsers.sendMessage('68c03f415fce99c4be3f7156', {
    text: 'this is sent from the backend and I am now the appMaker',
    role: 'appMaker',
    type: 'text'
}).then(() => {
  console.log('lets see what happens on the console')
});

smooch.appUsers.getMessages('b89f8eb3de689288333d96d8').then((response) => {
   console.log("\n".repeat(5));
    console.log(JSON.stringify(response,null,2));
    console.log("\n".repeat(5));
});


/*smooch.appUsers.deleteMessages('68c03f415fce99c4be3f7156').then(() => {
    console.log('lets see if things were deleted') 
});*/
}
module.exports = smoochFunctions