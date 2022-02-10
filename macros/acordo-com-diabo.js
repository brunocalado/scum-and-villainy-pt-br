/* - v1.1
Source:
Icon: 
*/

(async () => {
  const journalName = await drawNameFromTable('Acordo com o Diabo');
  const description = await drawJournalFromTable(journalName);

  styledChatMessage('Diabo','',description);

})()

/* Functions */
async function drawNameFromTable(tableName) {
  let list_compendium = await game.packs.filter(p=>p.documentName=='RollTable');      
  let inside = await list_compendium.filter( p=>p.metadata.label=='Tabelas' )[0].getDocuments();      
  const table = await inside.filter( p=>p.name==tableName )[0];          
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  const output = await table.roll();
  const result = output.results[0].data.text;
  return result;  
}

async function drawJournalFromTable(journalName) {
  let list_compendium = await game.packs.filter(p=>p.documentName=='JournalEntry');      
  let inside = await list_compendium.filter( p=>p.metadata.label=='Acordo com o Diabo' )[0].getDocuments();      
  const table = await inside.filter( p=>p.name==journalName )[0];          
  
  if (!table) {
    ui.notifications.warn(`Table ${journalName} not found.`, {});
    return;
  }

  return table.data.content;  
}

function addEventListenerOnHtmlElement(element, event, func){    
    Hooks.once("renderChatMessage", (chatItem, html) => { // Use Hook to add event to chat message html element
        html[0].querySelector(element).addEventListener(event, func);        
    });
} // end addEventListenerOnHtmlElement

async function createNPC(data) {  
  const instantAdventure = await JournalEntry.create(data);
  await instantAdventure.sheet.render(true);    
}

async function styledChatMessage(myTitle, message1, message2='') {
  let content = `<label class="titulo" style="font-size:35px; color: #b02b2e;">${myTitle}</label><br><label style="font-size: 15px">${message1}</label><p>${message2}</p>`;  
  let chatData = {
    speaker: null,
    content: content};
  ChatMessage.create(chatData, {});
}