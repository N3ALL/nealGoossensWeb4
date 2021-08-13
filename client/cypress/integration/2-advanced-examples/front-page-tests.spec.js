const { createYield } = require("typescript")

describe('front_page_test', function() {
    it('app runs', function(){
        cy.visit('http://localhost:4200');
        cy.get('[data-cy=topicCard]').should('be.visible');
        cy.get('[data-cy=filtersearch]').should('be.visible');
        cy.get('[data-cy=tabgroup]').should('be.visible');
        cy.get('[data-cy=newtopicbtn]').should('be.visible');
    });
    
})