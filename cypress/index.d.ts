declare namespace Cypress {
  interface Chainable<Subject> {
    mockAxios(url: string, method, response: object): void;
  }
}
