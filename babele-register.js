Hooks.once('init', () => { 
	if(typeof Babele !== 'undefined') { 
		Babele.get().register({
			module: 'scum-and-villainy-pt-br',
			lang: 'pt-BR',
			dir: 'compendium'
		}); 
	}
});
