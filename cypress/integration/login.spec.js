context("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have the button disabled if the form inputs are not valid", () => {
    cy.contains("Submit").should("be.disabled");
    cy.get("#passwordInput").type("password123");
    cy.contains("Submit").should("be.disabled");

    cy.get("#emailInput").type("edward_yang@asus.com");
    cy.get("#passwordInput").clear();
    cy.contains("Submit").should("be.disabled");
  });

  it("should submit the form with the correct values and show the success alert", () => {
    cy.get("#emailInput")
      .type("edward_yang@asus.com")
      .get("#passwordInput")
      .type("password123");
    cy.contains("Submit").click();
    cy.get(".alert.alert-success").should("be.visible");
  });

  it("should hide the sucees alert on click close button", () => {
    successfulLogin();
    cy.get(".alert.alert-success").find(".btn-close").click();
    cy.get(".alert.alert-success").should((domList) => {
      expect(domList.length).to.equal(0);
    });
  });

  it("should hide the success alert on changing the input", () => {
    successfulLogin();
    cy.get("#emailInput").clear().type("allen3_huang@asus.com");
    cy.get(".alert.alert-success").should((domList) => {
      expect(domList.length).to.equal(0);
    });
  });

  it("should show the (required) input errors on invalid inputs", () => {
    ["#emailHelp", "#passwordHelp"].map((selector) => {
      cy.get(selector).should((domList) => expect(domList.length).to.equal(0));
    });
    cy.get("#emailInput").type("edward_yang@asus.com").clear().blur();
    cy.get("#emailHelp").should("be.visible");
    cy.get("#passwordInput").type("password123").clear().blur();
    cy.get("#passwordHelp").should("be.visible");
  });
});

function successfulLogin() {
  cy.get("#emailInput")
    .type("edward_yang@asus.com")
    .get("#passwordInput")
    .type("password123");
  cy.contains("Submit").click();
}
