context("Login page", () => {
  const sizes = [
    {
      device: "iphone-5",
      width: 320,
    },
    {
      device: "ipad-2",
      width: 768,
    },
    {
      device: "macbook-13",
      width: 1280,
    },
  ];

  const IDENTIFIER_REQUIRED = "Veuillez renseigner votre émail";
  const IDENTIFIER_NOT_VALID =
    "Veuillez respecter le format d’émail (exemple@paris2024.org)";

  it("should show email required when not enter email", () => {
    sizes.forEach((size) => {
      cy.viewport(size.device);
      cy.visit("/");

      cy.get("form").submit();

      cy.get(`body:contains("${IDENTIFIER_REQUIRED}")`)
        .should("exist")
        .then(() => {
          cy.takeSnapshots("email is required", size);
        });
    });
  });

  it("should show email not valid when enter email not valid", () => {
    const notValidMails = [" ", "email", "email@gmail.com"];
    cy.visit("/");

    notValidMails.forEach((notValidMail) => {
      cy.get("#login_email").clear().type(notValidMail);

      cy.get("form").submit();

      cy.get(`body:contains("${IDENTIFIER_NOT_VALID}")`).should("exist");
    });
  });

  it("should not log user when backend refuses to log him", () => {
    cy.stubRequest("POST", "**/auth/signin", 400);
    cy.window().then((win) => {
      win.sessionStorage.clear();
      cy.visit("/");
      cy.get("#login_email").clear().type("email@paris2024.org");

      cy.get("form").submit();

      cy.url().should("include", "/login");
      cy.get(`body:contains("${IDENTIFIER_NOT_VALID}")`).should("exist");
    });
  });

  it("should show notification error when backend return error", () => {
    cy.stubRequest("POST", "**/auth/signin", 401);
    cy.window().then((win) => {
      win.sessionStorage.clear();
      cy.visit("/");
      cy.get("#login_email").clear().type("email@paris2024.org");

      cy.get("form").submit();

      cy.url().should("include", "/login");
      cy.get(
        `.ant-notification-notice-description:contains("Vous n\'êtes pas autorisé")`
      ).should("exist");
    });
  });

  it("should log user when enter a valid email", () => {
    const validMails = [
      "email@paris2024.org",
      "email65@paris2024.org",
      "email_65@paris2024.org",
      "email-65@paris2024.org",
    ];
    cy.stubRequest("POST", "**/auth/signin", 200, "signin.json", "signinJSON");

    cy.visit("/");

    validMails.forEach((validMail) => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        cy.visit("/");
        cy.get("#login_email").clear().type(validMail);

        cy.get("form").submit();

        cy.url().should("include", "/home");
      });
    });
  });

  it("should redirect logged user to home page when access application again", () => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.sessionStorage.setItem(
        "currentUser",
        JSON.stringify({ token: "token" })
      );

      cy.visit("/");

      cy.get("#login_email").should("not.exist");
    });
  });

  it("should not access home page when user is not logged", () => {
    sizes.forEach((size) => {
      cy.viewport(size.device);
      cy.window().then((win) => {
        win.sessionStorage.clear();
        cy.visit("/");

        cy.url().should("not.include", "/home");
        cy.url()
          .should("include", "/login")
          .then(() => {
            cy.takeSnapshots("login page", size);
          });
      });
    });
  });

  it("should redirect to login page if token is expired", () => {
    cy.window().then((win) => {
      cy.stubRequest(
        "POST",
        "**/auth/signin",
        200,
        "signin.json",
        "signinJSON"
      );
      win.sessionStorage.clear();
      win.sessionStorage.setItem("current-step", 12);
      win.sessionStorage.setItem("responses", JSON.stringify([]));
      cy.login("email@paris2024.org");

      cy.visit("/form");
      cy.stubRequest("POST", "**/api/response", 401);
      cy.get("button span:contains(suite)").click();
    });
  });
});
