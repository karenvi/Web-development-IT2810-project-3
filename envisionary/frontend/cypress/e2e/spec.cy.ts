
export {};

    /*

    cy.url().should('include', 'commands/actions')

    cy.get('.action-email').type('fake@email.com').should('have.value', 'fake@email.com') */

describe('Testing countries page', () => {
  it('Goes to page 2 to page to and opens Austria', () => {
    cy.visit('http://localhost:3000')
    cy.get('button').contains("2").scrollIntoView().click()
    cy.contains("Austria").click()

  })

  it('Austria contains correct information', () => {
    cy.get('h3').contains("Austria")
    cy.get('span').contains("Area: 83,871 km²")
    cy.get('span').contains("Population rank: 99")
    cy.get('span').contains("Capital: Vienna")
  })

  it('Austria has review by Willy', () => {
    cy.contains('Reviews').click()
    cy.contains('Willy')
    cy.get('p').contains('HELT TIPPTOPP Å VÆRE I ØSTERRIKE MED MINE GODE VENNER :-) ØNSKER DERE ALLE EN RIKTIG GOD HELG VIDERE.')
  })

  it('Go back and search for Taiwan', () => {
    cy.go('back')
  })
})

