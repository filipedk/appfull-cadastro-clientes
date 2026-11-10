const Pessoa = require("./Pessoa");

class PessoaJuridica extends Pessoa {
  #cnpj;
  #razaoSocial;

  constructor(nome, endereco, cnpj, razaoSocial) {
    // 1. super chama o construtor da classe mãe (Pessoa)
    super(nome, endereco);

    // 2. Chama os setters locais para validar cnpj e razaoSocial
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
  }

  get cnpj() {
    return this.#cnpj;
  }

  set cnpj(valor) {
    if (!valor || typeof valor !== "string") {
      throw new Error("O CNPJ é obrigatório e deve ser uma string.");
    }

    // Remove pontos, traços, barras e espaços, mantendo apenas dígitos
    const apenasDigitos = valor.replace(/\D/g, "");

    // Regra da avaliação: o CNPJ deve ter exatamente 14 dígitos
    if (apenasDigitos.length !== 14) {
      throw new Error(`CNPJ inválido: '${valor}'. O CNPJ deve conter exatamente 14 dígitos numéricos.`);
    }

    // Formata o CNPJ para exibição limpa (00.000.000/0000-00)
    this.#cnpj = apenasDigitos.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  get razaoSocial() {
    return this.#razaoSocial;
  }

  set razaoSocial(valor) {
    // Regra da avaliação: a razão social é obrigatória
    if (!valor || typeof valor !== "string" || valor.trim().length === 0) {
      throw new Error("A razão social é obrigatória.");
    }
    this.#razaoSocial = valor.trim();
  }

  exibirDetalhes() {
    return `[PESSOA JURÍDICA] ${super.exibirDetalhes()} | CNPJ: ${this.#cnpj} | Razão Social: ${this.#razaoSocial}`;
  }
}

module.exports = PessoaJuridica;
