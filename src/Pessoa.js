const Endereco = require("./Endereco");

class Pessoa {
  #nome;
  #endereco;

  constructor(nome, endereco) {
    if (new.target === Pessoa) {
      throw new Error("A classe Pessoa é abstrata e não pode ser instanciada diretamente.");
    }
    this.nome = nome;
    this.endereco = endereco;
  }

  get nome() {
    return this.#nome;
  }

  set nome(valor) {
    if (!valor || typeof valor !== "string" || valor.trim().length < 3) {
      throw new Error("O nome deve ter ao menos 3 caracteres.");
    }
    this.#nome = valor.trim();
  }

  get endereco() {
    return this.#endereco;
  }

  set endereco(valor) {
    if (!valor || !(valor instanceof Endereco)) {
      throw new Error("O endereço deve ser uma instância válida da classe Endereco.");
    }
    this.#endereco = valor;
  }

  exibirDetalhes() {
    return `Nome: ${this.#nome} | Endereço: [${this.#endereco.formatar()}]`;
  }
}

module.exports = Pessoa;
