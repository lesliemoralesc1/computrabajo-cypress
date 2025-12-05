// cypress/e2e/pruebas.cy.js
/**
 * Test de búsqueda avanzada en Computrabajo
 * Test de postulación y validación de error captcha
 */

describe('Computrabajo - Búsqueda avanzada y postulación', () => {
    beforeEach(() => {
        cy.visit('https://www.computrabajo.com/');

        cy.get('a#Colombialink', { timeout: 15000 })
            .should('be.visible')
            .click({ force: true });

        // Validar que se cambió el dominio
        cy.origin('https://co.computrabajo.com', () => {
            cy.url().should('include', 'https://co.computrabajo.com');
        });
    });

    it('Búsqueda filtrada de oferta QA en Guainía', () => {
        // Realizar búsqueda en la página de Computrabajo Colombia
        cy.origin('https://co.computrabajo.com', () => {
            //logInfo('Iniciando búsqueda avanzada de ofertas de QA en Guainía');
            // Ingresar ubicación Guainía
            cy.get('#place-search-input').should('be.visible')
                .clear()
                .type('Guainía', { delay: 30 });
            cy.get('#search-button').should('be.visible').click();
            //   logInfo('Buscar ofertas de QA')
            //Buscar ofertas de QA
            cy.get('#prof-cat-search-input', { timeout: 10000 })
                .should('be.visible')
                .click()
                .type('qa');
            //   logInfo('Aplicar filtro de salario menos de 700.000')
            //Filtro: Salario menos de 700.000
            cy.contains('p', 'Salario').should('be.visible').click();
            cy.contains('span', 'Menos de $ 700.000').click();
            //   logInfo('Aplicar filtro de experiencia 1 año')
            // Filtro: experiencia 1 año
            cy.contains('p', 'Experiencia').should('be.visible').click();
            cy.contains('span', '1 año').click({ force: true });
            //   logInfo('Validar que la búsqueda se realizó correctamente')
            //Validar que la búsqueda se realizó correctamente
            cy.contains('.box_offer', 'Test automation Engineer QA', { timeout: 15000 })
                .scrollIntoView()
                .should('be.visible')
                .within(() => {
                    cy.contains('Guainía').should('be.visible');
                });
            //   logInfo('Iniciar postulación a la oferta')
            // Aplicar a la oferta    
            cy.contains('.box_offer', 'Test automation Engineer QA', { timeout: 15000 })
                .scrollIntoView()
                .should('be.visible')
                .within(() => {
                    cy.get('.opt_dots').click({ force: true });
                    cy.contains('span', 'Aplicar').click({ force: true });

                });
        });
        cy.origin('https://secure.computrabajo.com', () => {
            //Agregar Email
            cy.get('#Email', { timeout: 10000 })
                .should('be.visible')
                .type('leslietester@tester.com');
            cy.get('#continueWithMailButton').should('be.visible').click();

            //Agregar nombre y apellido
            cy.get('#Name', { timeout: 10000 })
                .should('be.visible')
                .type('Leslie');
            cy.get('#SurName')
                .should('be.visible')
                .type('Morales');

            //Agregar contraseña
            cy.get('#Password', { timeout: 10000 })
                .should('be.visible')
                .type('Test1234!');

            //Agregar cargo
            cy.get('#Cargo', { timeout: 10000 })
                .should('be.visible')
                .type('QA');
            //Seleccionar departamento
            cy.get('#dropdown-locations', { timeout: 10000 })
                .should('be.visible').click();
            cy.contains('li','Guainía',{ timeout: 10000 }).click();
        
            //Click en el botón continuar
            cy.get('#continueButton').should('be.visible').click();

            //Validar error de captcha
            cy.contains('span', 'La validación de Recaptcha ha fallado. Por favor, inténtalo de nuevo.', { timeout: 10000 })
                .should('be.visible');
            //   logInfo('Error de captcha validado correctamente

        });
    });
});
