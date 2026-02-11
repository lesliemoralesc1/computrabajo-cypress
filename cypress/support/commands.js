// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('selectCountryColombia', () => {
	cy.get('a#Colombialink', { timeout: 15000 })
		.should('be.visible')
		.click({ force: true });
});

Cypress.Commands.add('searchOffers', ({ location, role }) => {
	cy.get('#place-search-input')
		.should('be.visible')
		.clear()
		.type(location, { delay: 30 });
	cy.get('#search-button').should('be.visible').click();

	cy.get('#prof-cat-search-input', { timeout: 10000 })
		.should('be.visible')
		.click()
		.type(role);
});

Cypress.Commands.add('applyFilters', ({ salary, experience }) => {
	cy.contains('p', 'Salario').should('be.visible').click();
	cy.contains('span', salary).click();

	cy.contains('p', 'Experiencia').should('be.visible').click();
	cy.contains('span', experience).click({ force: true });
});

Cypress.Commands.add('assertOfferVisible', ({ title, location }) => {
	cy.contains('.box_offer', title, { timeout: 15000 })
		.scrollIntoView()
		.should('be.visible')
		.within(() => {
			cy.contains(location).should('be.visible');
		});
});

Cypress.Commands.add('openOfferAndApply', ({ title }) => {
	cy.contains('.box_offer', title, { timeout: 15000 })
		.scrollIntoView()
		.should('be.visible')
		.within(() => {
			cy.get('.opt_dots').click({ force: true });
			cy.contains('span', 'Aplicar').click({ force: true });
		});
});

Cypress.Commands.add('fillApplicationForm', ({ userData, location }) => {
	cy.get('#Email', { timeout: 10000 })
		.should('be.visible')
		.type(userData.email);
	cy.get('#continueWithMailButton').should('be.visible').click();

	cy.get('#Name', { timeout: 10000 })
		.should('be.visible')
		.type(userData.name);
	cy.get('#SurName')
		.should('be.visible')
		.type(userData.surname);

	cy.get('#Password', { timeout: 10000 })
		.should('be.visible')
		.type(userData.password);

	cy.get('#Cargo', { timeout: 10000 })
		.should('be.visible')
		.type(userData.role);

	cy.get('#dropdown-locations', { timeout: 10000 })
		.should('be.visible')
		.click();
	cy.contains('li', location, { timeout: 10000 }).click();

	cy.get('#continueButton').should('be.visible').click();
});

Cypress.Commands.add('assertCaptchaError', () => {
	cy.contains(
		'span',
		'La validación de Recaptcha ha fallado. Por favor, inténtalo de nuevo.',
		{ timeout: 10000 }
	).should('be.visible');
});