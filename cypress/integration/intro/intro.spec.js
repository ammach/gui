context('Intro page', () => {

    const sizes = [
        {
            device: 'iphone-5',
            width: 320
        },
        {
            device: 'ipad-2',
            width: 768
        },
        {
            device: 'macbook-13',
            width: 1280
        }
    ];


    it('should show intro page', () => {
        sizes.forEach(size => {
            cy.viewport(size.device);
            cy.login('email@paris2024.org');

            cy.get('button:contains(lancez-vous)').click({force: true});

            cy.url().should('include', '/intro').then(() => {
                cy.takeSnapshots('intro page', size);
            });
        })
    });

    it.only('should open infos modal', () => {
        sizes.forEach(size => {
            cy.viewport(size.device);
            cy.login('email@paris2024.org');

            const openModalBtnSelector = '.header-container > .ant-btn';
            cy.get(openModalBtnSelector).click();

            cy.get('body:contains(à propos)').should('exist')
                .then(() => {
                    cy.takeSnapshots('open infos modal', size);
                });
        })
    });
});