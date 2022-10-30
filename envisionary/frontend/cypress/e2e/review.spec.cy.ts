/**
 * Test first tries to submit without entering anything and expects error messages
 * for name and country. It then tries after only selecting a country, and expects
 * the error message for name. Afterwards it tries after only typing in a name, and
 * expects the error message for country. At last, it tries with all the required 
 * information 
 */

export {};
describe('Testing give review page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/give-review')
    })

    it('Submit without entering anything', () => {
        // No error message before clicking submit
        cy.get('#country-box-helper-text').should('contain.html', '')

        // Error messages 'Country is required' and 'Name is required' should appear after clicking submit
        cy.get('button').contains('Submit').scrollIntoView().click()
        cy.get('#country-box-helper-text').should('contain.html', 'Country is required')
        cy.get('#name-field-helper-text').should('contain.html', 'Name is required')

        
    })
    it('Submit after choosing country only', () => {
        cy.get('#country-box').scrollIntoView().click()
        cy.contains('Andorra').click()

        // Error message should be 'Name required' after clicking submit
        cy.get('button').contains('Submit').scrollIntoView().click()
        cy.get('#name-field-helper-text').should('contain.html', 'Name is required')
    })

    it('Submit after typing name only', () => {
        cy.get('#name-field').scrollIntoView().click().type('Bombibjørn123')

        // Error message should be 'Country is required' after clicking submit
        cy.get('button').contains('Submit').scrollIntoView().click()
        cy.get('#country-box-helper-text').should('contain.html', 'Country is required')
    })
})