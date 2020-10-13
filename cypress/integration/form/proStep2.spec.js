context('Form | Vie professionnelle - Empreinte numérique step2', () => {
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

	it('should show Empreinte numérique step on form page', () => {
		sizes.forEach((size) => {
			cy.viewport(size.device);
			cy.window().then((win) => {
				win.sessionStorage.clear();
				win.sessionStorage.setItem('current-step', 2);
				cy.login('email@paris2024.org');

				cy.visit('/form');

				cy.url()
					.should('include', '/form')
					.then(() => {
						cy.takeSnapshots('form - Empreinte numérique', size);
					});
			});
		});
	});

	it('should submit form', () => {
		cy.window().then((win) => {
			win.sessionStorage.clear();
			win.sessionStorage.setItem('current-step', 2);
			cy.login('email@paris2024.org');

			cy.visit('/form');

			cy.get('#5f554eb63be47').clear().type('99');

			cy.pickValue('.nbr-recherche', '1');

			cy.pickValue('.nbr-conference', '5');

			cy.pickValue('.nbr-streaming', '9');

			cy.get('button span:contains(suite)').click();

			cy.wait(1000);

			cy.get('.footer-navigation-left span').contains('Empreinte numérique').should('exist');
			cy.get('.footer-navigation-right span').contains('Trajets').should('exist');

			cy.get('.footer-buttons-left button').click();

			cy.get(`label[for="5f554eb63be47"]`)
				.parents('.ant-form-item')
				.find('.ant-input-number-input')
				.should('have.attr', 'value', '99');

			cy.get('.nbr-recherche .ant-slider-handle').should('have.attr', 'aria-valuenow', '1');

			cy.get('.nbr-conference .ant-slider-handle').should('have.attr', 'aria-valuenow', '5');

			cy.get('.nbr-streaming .ant-slider-handle').should('have.attr', 'aria-valuenow', '9');
		});
	});
});
