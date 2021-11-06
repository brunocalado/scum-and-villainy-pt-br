const version = 'v1.2';

/* Patch Actors

TODO 
- 

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Forged%20in%20the%20Dark/scum-villainy_patch_actors.js
icon: icons/tools/smithing/hammer-sledge-steel-grey.webp
*/

let message=``;
let characters = game.actors.contents.filter(e => e.data.type === 'character');
let ships = game.actors.contents.filter(e => e.data.type === 'ship');

if (characters==undefined && ships==undefined) {
  ui.notifications.warn("You don't have characters or ships!");    
} else {
  
  // VARS  
  const effects = ['Mechanic class', 'Muscle class', 'Mystic class', 'Pilot class', 'Scoundrel class', 'Speaker class', 'Stitch class'];
  const playbooks = ['Mechanic', 'Muscle', 'Mystic', 'Pilot', 'Scoundrel', 'Speaker', 'Stitch'];
  
  if (characters!=undefined) {
    for(const character of characters) {
      for (var i=0; i<=effects.length; i++) {     
        const effect = character.effects.find(e => e.data.label === effects[i]);
        if (effect!=undefined) {
          let changes = duplicate(effect.data.changes);        
          const playbookName = changes[0].value;
          if ( playbooks.includes(playbookName) ) {
            changes[0].value = translatePlaybook(playbookName);
            message += `<h2>${character.name}</h2><p>${playbookName} foi trocado por ${translatePlaybook(playbookName)}</p>`;
            await effect.update({changes});          
          } else {
            message += `<h2>${character.name}</h2><p>Nada foi feito. Tudo certo.</p>`;
          }          
        }      
      }
    }
  }
  
  // VARS
  const effectsShip = ['Firedrake type', 'Stardancer type', 'Firedrake class', 'Stardancer class', 'Cerberus type', 'Cerberus class'];
  const playbooksShip = ['Firedrake', 'Stardancer', 'Cerberus'];

  if (ships!=undefined) {
    for(const ship of ships) {
      for (var i=0; i<=effectsShip.length; i++) {     
        const effect = ship.effects.find(e => e.data.label === effectsShip[i]);
        if (effect!=undefined) {
          let changes = duplicate(effect.data.changes); // ALL EFFECTS
          let changesBut = changes.filter(e => e.key !== 'data.ship_class'); // all effects but the one that will be changed.                 
          let selectedEffect = changes.find(e => e.key === 'data.ship_class');
          let selectedEffect2 = changes.find(e => e.key === 'data.designation');
          let playbookName = selectedEffect.value;
          //console.log(playbookName);
          if ( playbooksShip.includes(playbookName) ) {
            selectedEffect.value = translateShip(playbookName);
            selectedEffect2.value = translateShipDesignation(playbookName);
            changesBut.push(selectedEffect);
            changesBut.push(selectedEffect2);
            message += `<h2>${ship.name}</h2><p>${playbookName} foi trocado por ${translateShip(playbookName)}</p>`;
            await effect.update({changes: changesBut});                
          } else {
            message += `<h2>${ship.name}</h2><p>Nada foi feito. Tudo certo.</p>`;
          }          
        }      
      }
    }
  }

  // to chat
  let chatData = {
    user: game.user.id,
    speaker: ChatMessage.getSpeaker(),
    content: message
  };

  ChatMessage.create(chatData, {});
}

function translatePlaybook(playbook) {
  if (playbook == 'Mechanic') {
    return 'Mecânico';
  } else if (playbook == 'Muscle') {
    return 'Músculo';
  } else if (playbook == 'Mystic') {
    return 'Místico';
  } else if (playbook == 'Pilot') {
    return 'Piloto';
  } else if (playbook == 'Scoundrel') {
    return 'Malandro';
  } else if (playbook == 'Speaker') {
    return 'Comunicador';
  } else if (playbook == 'Stitch') {
    return 'Costureiro';
  }
}

function translateShip(playbook) {
  if (playbook == 'Firedrake') {
    return 'Dragão de Fogo';
  } else if (playbook == 'Stardancer') {
    return 'Dançarina Estelar';
  } else {
    return playbook;
  }
}

function translateShipDesignation(playbook) {
  if (playbook == 'Firedrake') {
    return 'Corveta Convertida Classe Khanjigar';
  } else if (playbook == 'Stardancer') {
    return 'Cargueiro Classe Scarab série CF-350';
  } else if (playbook == 'Cerberus') {
    return 'Embarcação de Patrulha tipo Firebrand R-29';
  }
}


