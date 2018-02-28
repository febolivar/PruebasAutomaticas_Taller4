describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomClick(2);
		randomEvent(5);
    })
})
function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

	var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {			
			var i = getRandomInt(0, $links.length);
            var randomLink = $links.get(i);			
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
			setTimeout(randomClick, 1000, monkeysLeft);			
        });
    }   
}


function randomEvent(monkeysLeft) {	
	function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };		
	
	function getLink()
	{		
		cy.get('a').then($links => {			
		var i = getRandomInt(0, $links.length);
		var randomLink = $links.get(i);			
		if(!Cypress.dom.isHidden(randomLink)) {
			cy.wrap(randomLink).click({force: true});                
		}				
		});		
	};
	
	function getText(){
		cy.get('input').then($txt => {			
		var i = getRandomInt(0, $txt.length);
		var randomText = $txt.get(i);						   
		cy.wrap(randomText).type('Monkey escribiendo');			
		});
	};
	
	function getCombo(){
		cy.get('select').then($chkbx => {			
		var i = getRandomInt(0, $chkbx.length);
		var randomCombo = $chkbx.get(i);						   		
		//TODO: Seleccionar un valor del combobox
		//cy.wrap(randomCombo).select('apples')		
		});		
	};
	
	function getButton(){
		cy.get('button').then($btn => {			
		var i = getRandomInt(0, $btn.length);
		var randomButton = $btn.get(i);						   
		cy.wrap(randomButton).click();	
		});
	};
	
	var monkeysLeft = monkeysLeft;
	if(monkeysLeft > 0) 
	{
		var sw = getRandomInt(0,4);
		alert("case " + sw);
		alert("faltan " + monkeysLeft);
		switch(sw) 
		{
			case 0:
				//Hacer click en un link al azar
				getLink();
				break;
			case 1:
				//Llenar un campo de texto al azar
				getText();
				break;
			case 2:
				//Seleccionar un combo al azar
				getCombo();
				break;
			case 3:
				//Hacer click en un botón al azar
				getButton();
				break;
		}	
		
		monkeysLeft = monkeysLeft - 1;
		setTimeout(randomEvent, 1000, monkeysLeft);	
	}
}