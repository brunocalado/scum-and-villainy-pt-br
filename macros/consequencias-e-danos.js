/* - v1.0
Source:
Icon: 
*/

(async () => {
  const journalName = await drawNameFromTable('Consequências e Danos');
  let description;
  console.log(journalName)
  if (journalName=='Complicação') {
    description = `<p>@Compendium[scum-and-villainy-pt-br.consequencias-e-danos.WUW6BEEPHuoaKQYl]{Complica&ccedil;&atilde;o}</p>`;
  } else if (journalName=='Dano') {
    description = `<p>@Compendium[scum-and-villainy-pt-br.consequencias-e-danos.zfe28UlwyI4fXr3N]{Dano}</p>`;
  } else if (journalName=='Danos Não Físicos') {
    description = `<p>@Compendium[scum-and-villainy-pt-br.consequencias-e-danos.RU86rZc2EuC9ltil]{Danos N&atilde;o F&iacute;sicos}</p>`;
  } else if (journalName=='Efeito Reduzido') {
    description = `<p>@Compendium[scum-and-villainy-pt-br.consequencias-e-danos.YOZxg5RayFycMRTv]{Efeito Reduzido}</p>`;
  } else if (journalName=='Oportunidade Perdida') {
    description = `<p>@Compendium[scum-and-villainy-pt-br.consequencias-e-danos.5xRWEdpTilzw7JLK]{Oportunidade Perdida}</p>`;
  } else if (journalName=='Posição Prejudicada') {
    description = `<p>@Compendium[scum-and-villainy-pt-br.consequencias-e-danos.um18w9qVPRsAsnTV]{Posi&ccedil;&atilde;o Prejudicada}</p>`;
  }

  styledChatMessage('Consequências','',description);

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

async function styledChatMessage(myTitle, message1, message2='') {
  let content = `<label class="titulo" style="font-size:30px; color: #b02b2e;">${myTitle}</label><br><label style="font-size: 15px">${message1}</label><p>${message2}</p>`;  
  let chatData = {
    speaker: null,
    content: content};
  ChatMessage.create(chatData, {});
}