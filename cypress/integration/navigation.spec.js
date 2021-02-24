describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.get('ul > :nth-child(2)')
    .click()
    .should("have.class","day-list__item--selected")
  })
});