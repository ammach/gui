context('Intro page', () => {
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

	it('should show intro page', () => {
		sizes.forEach((size) => {
			cy.viewport(size.device);
			cy.window().then((win) => {
				win.sessionStorage.clear();
				cy.login('email@paris2024.org');

				cy.get('button:contains(lancez-vous)').click({ force: true });

				cy.url()
					.should('include', '/intro')
					.then(() => {
						cy.takeSnapshots('intro page', size);
					});
			});
		});
	});

	it('should open infos modal', () => {
		sizes.forEach((size) => {
			cy.viewport(size.device);
			cy.window().then((win) => {
				win.sessionStorage.clear();
				cy.login('email@paris2024.org');

				const openModalBtnSelector = '.header-container > .ant-btn';
				cy.get(openModalBtnSelector).click();

				cy.get('body:contains(à propos)')
					.should('exist')
					.then(() => {
						cy.takeSnapshots('open infos modal', size);
					});
			});
		});
	});

	it('should not redirect user to page form due to error 404', () => {
		cy.stubRequest('GET', '**/api/user/progress', 404);

		cy.window().then((win) => {
			win.sessionStorage.clear();
			cy.login('email@paris2024.org');
			cy.get('button:contains(lancez-vous)').click({ force: true });
			cy.get('button span:contains(suite)').click();
			cy.url().should('include', '/intro');
		});
	});

	it('should not redirect user to form page when user completes the form', () => {
		cy.stubRequest('GET', '**/api/user/progress', 200, 'progress-results.json', 'progressJSON');

		cy.window().then((win) => {
			win.sessionStorage.clear();
			cy.login('email@paris2024.org');

			cy.get('button:contains(lancez-vous)').click({ force: true });

			cy.get('.footer-navigation-right span').contains('Résultats').should('exist');

			cy.get('button span:contains(suite)').click();
			cy.url().should('include', '/results');
		});
	});

	it("should redirect user to form page when user didn't complete the form", () => {
		cy.stubRequest('GET', '**/api/user/progress', 200, 'progress-vie-pro.json', 'progressJSON');

		cy.window().then((win) => {
			win.sessionStorage.clear();
			cy.login('email@paris2024.org');

			cy.get('button:contains(lancez-vous)').click({ force: true });

			cy.get('.footer-navigation-right span').contains('Vie professionnelle').should('exist');

			cy.get('button span:contains(suite)').click();
			cy.url().should('include', '/form');
		});
	});
});
