Feature: Búsqueda avanzada y postulación en Computrabajo
  Como usuario  
  Quiero buscar ofertas filtradas y aplicar a una vacante  
  Para validar que el flujo de postulación funciona correctamente  

  Background:
    Given que ingreso a la página de Computrabajo
    And selecciono el país Colombia
    Then debería visualizar la página principal de Computrabajo Colombia

  Scenario: Búsqueda filtrada de oferta QA en Guainía y validación de error de captcha
    When ingreso "Guainía" en el buscador de ubicación
    And ingreso "qa" en el buscador de cargo
    And aplico el filtro de salario "Menos de $ 700.000"
    And aplico el filtro de experiencia "1 año"
    Then debería visualizar en los resultados la oferta "Test automation Engineer QA" en "Guainía"

    When abro las opciones de la oferta "Test automation Engineer QA"
    And selecciono la opción "Aplicar"
    And ingreso mi correo "leslietester@tester.com"
    And completo mis datos personales
    Then debería visualizar el mensaje de error del captcha
