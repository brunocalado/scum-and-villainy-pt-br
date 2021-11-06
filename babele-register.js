Hooks.once('init', () => { 
	if(typeof Babele !== 'undefined') { 
		Babele.get().register({
			module: 'monstro-da-semana-pt-br',
			lang: 'pt-BR',
			dir: 'compendium'
		}); 
  } // END if(typeof Babele  
});
