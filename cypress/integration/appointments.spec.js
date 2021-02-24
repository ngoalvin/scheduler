const { CYCLIC_KEY } = require("@storybook/addon-actions")

describe("appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it("should book an interview", () => {
    cy.contains("Monday")

    cy.get(':nth-child(2) > .appointment__add > .appointment__add-button')
    .click()

    cy.get('[data-testid=student-name-input]')
    .type("Lydia Miller-Jones")

    cy.get("[alt='Sylvia Palmer']")
    .click();

    cy.contains("Save")
    .click()

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })
  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
  
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
  
    cy.contains("Save").click();
  
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
    .first()
    .click({force:true})

    cy.get('.appointment__actions > :nth-child(2)')
    .contains("Confirm")
    .click()
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  })
})