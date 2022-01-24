/* - v1.3
Source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Forged%20in%20the%20Dark/scum-villainy_people.js
Icon: 
*/
const folderName = 'Personagens Gerados';

(async () => {
  const name1 = await drawFromTable('Nomes');
  const surname = await drawFromTable('Sobrenomes');
  const aparen1 = await drawFromTable('Aparência - Identidade');
  const aparen2 = await drawFromTable('Aparência');
  const alias = await drawFromTable('Codinomes');

  let msg = `<h2>${name1} ${surname} (${alias})</h2>`;
  msg += `<ul><li>Sugestão de Identidade: <b>${aparen1}</b></li>`;
  msg += `<li>Aparência: <b>${aparen2}</b></li></ul>`;
  
  let message=msg;
  let msgId = randomID(); // Foundry VTT function 
  let data = {
    name: `${name1} ${surname} (${alias})`,
    type: "npc",
    data: {
      notes: msg
    }
  };
         
  message+=`<button style="background:#d10000;color:white" id="createNPC-`
  message+=msgId;
  message+=`">Criar Registro</button>`;
  
  let chatData = {
    content: message,
    whisper : ChatMessage.getWhisperRecipients("GM")
  };  
  ChatMessage.create(chatData, {});  
  
  addEventListenerOnHtmlElement("#createNPC-" + msgId, 'click', (e) => {
    createNPC(data);    
  });
  
})()

/* Functions */
async function drawFromTable(tableName) {
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

function addEventListenerOnHtmlElement(element, event, func){    
  Hooks.on("renderChatMessage", (chatItem, html, data) => {
    if( html[0].querySelector(element) !== null ) {
      html[0].querySelector(element).addEventListener(event, func);
    }
  });
}

async function createNPC(data) {
  let folder;
  if( game.folders.filter( f => f.type === 'Actor').find( f => f.name === folderName) ===undefined ) {
    folder = await Folder.create( {
      name: folderName,
      type: "Actor"
    } );
  } else {
    folder = game.folders.find( f => f.name === folderName);
  }
  data.folder = folder;
  console.log('--------------')
  console.log(data)
  console.log('================')
  console.log(folder)
  console.log('--------------')

  const instantNPC = await Actor.create(data);
  await instantNPC.sheet.render(true);      
}
