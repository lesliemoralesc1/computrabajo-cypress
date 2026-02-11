# Computrabajo Cypress

Automatización de pruebas end‑to‑end para Computrabajo con Cypress y reporte Allure.

## Requisitos
- Node.js 20+
- npm 10+

## Instalación
- npm install

## Ejecución local
- npm run test (ejecuta pruebas + genera reporte + abre Allure)
- npm run test:chrome
- npm run test:headed
- npm run open (modo interactivo)

## Reportes Allure
- Generar reporte: npm run report:allure
- Abrir reporte: npm run report:open

El reporte HTML se genera en `allure-report`.

## Variables de entorno
Puedes sobreescribir datos sensibles con variables:
- CT_EMAIL
- CT_NAME
- CT_SURNAME
- CT_PASSWORD
- CT_ROLE
- CT_LOCATION
- CT_OFFER_TITLE
- CT_ROLE_SEARCH
- CT_SALARY_FILTER
- CT_EXPERIENCE_FILTER

## CI (GitHub Actions)
El pipeline ejecuta Cypress en Chrome y publica artefactos:
- `allure-report`
- `allure-results`
- `cypress/screenshots` y `cypress/videos`

Script usado en CI:
- npm run test:ci

## Notas
Las pruebas dependen de un sitio público y contenido dinámico, por lo que puede haber variaciones en resultados o textos.
