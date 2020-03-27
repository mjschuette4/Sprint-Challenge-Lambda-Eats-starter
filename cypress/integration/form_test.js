describe("Testing the pizza routes and form", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000");
    });
    it("Add test to inputs and submit form", function() {
      cy
      .get('button[name="orderbutton"]')
      .click()
      cy
      .get('input[name="name"]')
      .type("Matthew")
      .should("have.value", "Matthew")
      cy
      .get('textarea[name="specialReq"]')
      .type("Special Request")
      .should("have.value", "Special Request")
      cy
      .get('select[name="size"]')
      .select('Belly Buster')
      .should("have.value", "Belly Buster")
      cy
      .get('[type=checkbox]')
      .check()
      .should("be.checked")
      cy
      .get('button[name="order"]')
      .click()
    });
});