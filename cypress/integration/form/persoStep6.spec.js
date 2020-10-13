context('Form | Déplacements step', () => {
	const sizes = [
		{
			device: 'iphone-5',
			width: 320,
		},
		{
			device: 'ipad-2',
			width: 768,
		},
		{
			device: 'macbook-13',
			width: 1280,
		},
	];

	it('should show Déplacements step on form page', () => {
		sizes.forEach((size) => {
			cy.viewport(size.device);
			cy.window().then((win) => {
				win.sessionStorage.clear();
				win.sessionStorage.setItem('current-step', 11);
				cy.login('email@paris2024.org');

				cy.visit('/form');

				cy.url()
					.should('include', '/form')
					.then(() => {
						cy.takeSnapshots('form - Déplacements', size);
					});
			});
		});
	});

	it('should submit form', () => {
		cy.window().then((win) => {
			win.sessionStorage.clear();
			win.sessionStorage.setItem('current-step', 11);
			cy.login('email@paris2024.org');
			cy.visit('/form');

			cy.typeNumberForQuestionWithUnit('5f5575ba93b32', 9);
			cy.selectOption('#5f5575dc9b4ac', 'Electrique');
			cy.get('#5f55776c56494').clear().type('22');
			cy.typeNumber([
				{
					name: '5f557851c481e',
					value: 20,
				},
				{
					name: '5f5578d055227',
					value: 30,
				},
				{
					name: '5f5578e039aea',
					value: 40,
				},
			]);
			cy.typeNumber([
				{
					name: '5f55791c16575',
					value: 20,
				},
				{
					name: '5f55797b8b5f2',
					value: 30,
				},
				{
					name: '5f55799ed06a0',
					value: 40,
				},
			]);
			cy.typeNumber([
				{
					name: '5f5579c25b653',
					value: 20,
				},
				{
					name: '5f5579df87f62',
					value: 30,
				},
				{
					name: '5f5579f265cce',
					value: 40,
				},
			]);
			cy.typeNumber([
				{
					name: '5f557a0b076f3',
					value: 20,
				},
				{
					name: '5f557a34ea334',
					value: 30,
				},
				{
					name: '5f557a44eafc4',
					value: 40,
				},
			]);
			cy.get('.ant-switch').eq(2).click({ force: true });
			cy.get('#5f60aadf53101').clear().type('5');

			cy.get('button span:contains(suite)').click();

			cy.wait(1000);
			cy.get('.footer-navigation-left span').contains('Déplacements').should('exist');
			cy.get('.footer-navigation-right span').contains('résultats').should('exist');
			cy.get('.footer-buttons-left button').click();
			cy.get(`label[for="5f5575ba93b32"]`)
				.parents('.ant-form-item')
				.find('.ant-input-number-input')
				.should('have.attr', 'value', '9');
			cy.get('#5f55776c56494').should('have.attr', 'value', '22');
			cy.get('#5f55763a2d2b1').should('have.attr', 'disabled');
			cy.get('#5f557851c481e').should('have.attr', 'value', '20');
			cy.get('#5f5578d055227').should('have.attr', 'value', '30');
			cy.get('#5f5578e039aea').should('have.attr', 'value', '40');
			cy.get('#5f55791c16575').should('have.attr', 'value', '20');
			cy.get('#5f55797b8b5f2').should('have.attr', 'value', '30');
			cy.get('#5f55799ed06a0').should('have.attr', 'value', '40');
			cy.get('#5f5579c25b653').should('have.attr', 'value', '20');
			cy.get('#5f5579df87f62').should('have.attr', 'value', '30');
			cy.get('#5f5579f265cce').should('have.attr', 'value', '40');
			cy.get('#5f557a0b076f3').should('have.attr', 'value', '20');
			cy.get('#5f557a34ea334').should('have.attr', 'value', '30');
			cy.get('#5f557a44eafc4').should('have.attr', 'value', '40');
			cy.get('#5f60aadf53101').should('have.attr', 'value', '5');
		});
	});

	it('should not submit form when questions are not filled', () => {
		sizes.forEach((size) => {
			cy.viewport(size.device);
			cy.window().then((win) => {
				win.sessionStorage.clear();
				win.sessionStorage.setItem('current-step', 11);
				cy.login('email@paris2024.org');
				cy.visit('/form');

				cy.get('button span:contains(suite)').click({force: true});

				cy.get('.ant-form-item-explain div:contains("⚠ Merci de saisir votre réponse")')
					.should(($el) => {
						expect($el).to.have.length(1);
					})
					.then(() => {
						cy.takeSnapshots('form - Déplacements errors', size);
					});
			});
		});
	});
});
