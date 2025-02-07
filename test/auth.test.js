const request = require("supertest");
const chai = require("chai");
const app = require("../server");
const { expect } = chai;
const { token } = require("./setup");
const authService = require("../src/services/authService");
let userId;
let sessionCookie;

async function authenticateUser() {
  const res = await request(app)
    .post("/auth/login")
    .send({ email: "admin@example.com", password: "adminpassword" });

  expect(res.status).to.equal(302);
  expect(res.headers.location).to.equal("/dashboard");

  return res.headers["set-cookie"];
}

beforeEach(async () => {
  sessionCookie = await authenticateUser();
});

describe("Tests API - Authentification", () => {
  it("Devrait rediriger vers /dashboard après une connexion réussie (POST /auth/login)", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@example.com", password: "adminpassword" });

    expect(res.status).to.equal(302);
    expect(res.headers.location).to.equal("/dashboard");
  });

  it("Devrait rediriger vers /index en cas d’échec de connexion (POST /auth/login)", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "wrong@example.com", password: "wrongpassword" });

    expect(res.status).to.equal(400);
    expect(res.text).to.include("Email ou mot de passe incorrect");
  });

  it("Devrait ajouter un utilisateur (POST /auth/register)", async () => {
    const res = await request(app)
      .post("/auth/register")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "newuser",
        email: "newuser@example.com",
        password: "password123",
      });

    expect(res.status).to.equal(302);
    expect(res.headers.location).to.include("/?message=");

    const user = await authService.getUserByEmail("newuser@example.com");
    userId = user._id;

    expect(userId).to.exist;
  });
});

describe("Tests API - Catways", () => {
  it("Devrait récupérer tous les catways (GET /catways)", async () => {
    const res = await request(app)
      .get("/catways")
      .set("Cookie", sessionCookie)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });
});

describe("Tests API - Réservations", () => {
  it("Devrait récupérer toutes les réservations (GET /reservations)", async () => {
    const res = await request(app)
      .get("/reservations")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", sessionCookie);

    expect(res.status).to.equal(200);
  });
});

describe("Tests API - Utilisateurs", () => {
  it("Devrait modifier un utilisateur (PUT /users/:id)", async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "newname",
        email: "newemail@example.com",
        password: "newpassword123",
      });

    expect(res.status).to.equal(302);
    const expectedMessage = encodeURIComponent(
      "Utilisateur mis à jour avec succès !"
    );
    expect(res.headers.location).to.include(
      `/dashboard?message=${expectedMessage}`
    );
  });

  it("Devrait supprimer un utilisateur (DELETE /users/:id)", async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(302);
    const expectedMessage = encodeURIComponent(
      "Utilisateur supprimé avec succès !"
    );
    expect(res.headers.location).to.include(
      `/dashboard?message=${expectedMessage}`
    );
  });
});
