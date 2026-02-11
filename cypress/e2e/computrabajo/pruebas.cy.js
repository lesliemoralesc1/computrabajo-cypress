// cypress/e2e/pruebas.cy.js
/**
 * Test de búsqueda avanzada en Computrabajo
 * Test de postulación y validación de error captcha
 */

import { logInfo, logWarning } from '../../support/helpers/logger';

describe('Computrabajo - Búsqueda avanzada y postulación', () => {
    let testData;

    const resolveUserData = (data) => ({
        email: Cypress.env('CT_EMAIL') || data.userData.email,
        name: Cypress.env('CT_NAME') || data.userData.name,
        surname: Cypress.env('CT_SURNAME') || data.userData.surname,
        password: Cypress.env('CT_PASSWORD') || data.userData.password,
        role: Cypress.env('CT_ROLE') || data.userData.role,
    });

    before(() => {
        cy.fixture('computrabajo').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        logInfo('Visitar sitio principal de Computrabajo');
        cy.visit(testData.baseUrl);

        logInfo('Seleccionar país Colombia');
        cy.selectCountryColombia();

        // Validar que se cambió el dominio
        cy.origin(testData.coUrl, () => {
            cy.log('Validando dominio de Colombia');
            cy.url().should('include', 'https://co.computrabajo.com');
        });
    });

    it('Búsqueda filtrada de oferta QA en Guainía', () => {
        logInfo('Iniciar búsqueda avanzada y aplicación');
        const userData = resolveUserData(testData);

        cy.origin(
            testData.coUrl,
            {
                args: {
                    offerTitle: testData.offerTitle,
                    location: testData.location,
                    roleSearch: testData.roleSearch,
                    salaryFilter: testData.salaryFilter,
                    experienceFilter: testData.experienceFilter,
                },
            },
            ({ offerTitle, location, roleSearch, salaryFilter, experienceFilter }) => {
                Cypress.require('../../support/commands');
                cy.log('Iniciando búsqueda avanzada en Colombia');
                cy.searchOffers({ location, role: roleSearch });
                cy.log('Aplicar filtros');
                cy.applyFilters({ salary: salaryFilter, experience: experienceFilter });
                cy.log('Validar resultados de búsqueda');
                cy.assertOfferVisible({ title: offerTitle, location });
                cy.log('Iniciar postulación a la oferta');
                cy.openOfferAndApply({ title: offerTitle });
            }
        );

        logInfo('Completar formulario de postulación');
        cy.origin(testData.secureUrl, { args: { userData, location: testData.location } }, ({ userData, location }) => {
            Cypress.require('../../support/commands');
            cy.log('Ingresar datos de postulación');
            cy.fillApplicationForm({ userData, location });
            cy.assertCaptchaError();
            cy.log('Error de captcha validado correctamente');
        });

        logWarning('La disponibilidad de la oferta y textos pueden variar según el sitio');
    });
});
