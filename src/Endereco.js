class Endereco {
  #logradouro;
  #numero;
  #cidade;
  #uf;

  constructor(logradouro, numero, cidade, uf) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.cidade = cidade;
    this.uf = uf;
  }

  get logradouro() {
    return this.#logradouro;
  }

  set logradouro(valor) {
    if (!valor || typeof valor !== "string" || valor.trim().length === 0) {
      throw new Error("O logradouro do endereço é obrigatório.");
    }
    this.#logradouro = valor.trim();
  }

  get numero() {
    return this.#numero;
  }

  set numero(valor) {
    if (!valor || valor.toString().trim().length === 0) {
      throw new Error("O número do endereço é obrigatório.");
    }
    this.#numero = valor.toString().trim();
  }

  get cidade() {
    return this.#cidade;
  }

  set cidade(valor) {
    if (!valor || typeof valor !== "string" || valor.trim().length === 0) {
      throw new Error("A cidade do endereço é obrigatória.");
    }
    this.#cidade = valor.trim();
  }

  get uf() {
    return this.#uf;
  }

  set uf(valor) {
    if (!valor || typeof valor !== "string" || valor.trim().length !== 2) {
      throw new Error("A UF deve conter exatamente 2 caracteres (ex.: SP, RJ, MG).");
    }
    this.#uf = valor.trim().toUpperCase();
  }

  formatar() {
    return `${this.#logradouro}, nº ${this.#numero} - ${this.#cidade}/${this.#uf}`;
  }
}

module.exports = Endereco;
