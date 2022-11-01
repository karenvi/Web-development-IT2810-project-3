/**
 * Test first tries to submit without entering anything and expects error messages
 * for name and country. It then tries after only selecting a country, and expects
 * the error message for name. Afterwards it tries after only typing in a name, and
 * expects the error message for country. At last, it tries with all the required 
 * information, chosing a random country, rating, name and review content.
 */

export {};

const countries: string[] = ['Saint Vincent and the Grenadines', 'Timor-Leste', 'Djibouti', 'Sao Tome and Principe', 'Sierra Leone'];
const names: string[] = ['Bombibjørn123', 'SuperOlivia', 'Bernt med barten', 'Salmonellamannen', 'PowerPuffGirl627'];
const reviewContents: string[] = [
    'En meget god tur for meg og familien',
    'Helt alreit, ønsket litt mer fart og spenning',
    'Er jo akkurat som hjemme, kunne like godt ikke dratt',
    'Å gurimalla altså, for et land! Må ta med meg vennene mine fra syklubben neste gang!',
    'Jeg er kanskje fem-og-nitti, men etter å ha besøkt dette landet føler jeg meg som fire-og-før!'
];

describe('Testing give review page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/#/give-review')
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

    it('Submit after entering/chosing required info', () => {
        
        // pick random country, name and review content
        const country: string = countries[Math.floor(Math.random() * countries.length)];
        const name: string = names[Math.floor(Math.random() * names.length)];
        const reviewContent: string = reviewContents[Math.floor(Math.random() * reviewContents.length)];
        cy.get('#country-box').click().type(country).should('have.value', country);
        cy.get('#country-box').type('{downArrow}').type('{enter}');     // press arrow down and press enter to select form menu
        cy.get('#name-field').click().type(name).should('have.value', name);
        cy.get('#review-content-field').click().type(reviewContent).should('have.value', reviewContent);

        // give random rating
        const rating: number = Math.random() * 135;
        cy.get('#rating-stars').click(rating, 0);
        
        // submit
        cy.get('button').contains('Submit').scrollIntoView().click();
        cy.contains('Countries').click()

        // look for the review and confirm it exists and is correct
        cy.get('#header-search').clear().type(country).should('have.value', country);
        cy.get('tbody').contains(country).click();
        cy.contains('Reviews').click()
        cy.contains(name)
        cy.get('p').contains(reviewContent);
    })
})