const Pessoa = require("./Pessoa");

class PessoaFisica extends Pessoa {
  #cpf;
  #dataNascimento;

  constructor(nome, endereco, cpf, dataNascimento) {
    // 1. super chama o construtor da classe mãe (Pessoa) para validar nome e endereco
    super(nome, endereco);

    // 2. Chama os setters locais para validar cpf e dataNascimento
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(valor) {
    if (!valor || typeof valor !== "string") {
      throw new Error("O CPF é obrigatório e deve ser uma string.");
    }

    // Remove pontos, traços e espaços, mantendo apenas dígitos
    const apenasDigitos = valor.replace(/\D/g, "");

    // Regra da avaliação: o CPF deve ter exatamente 11 dígitos
    if (apenasDigitos.length !== 11) {
      throw new Error(`CPF inválido: '${valor}'. O CPF deve conter exatamente 11 dígitos numéricos.`);
    }

    // Formata o CPF para exibição limpa (000.000.000-00)
    this.#cpf = apenasDigitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  get dataNascimento() {
    return this.#dataNascimento;
  }

  set dataNascimento(valor) {
    if (!valor) {
      throw new Error("A data de nascimento é obrigatória.");
    }

    let data;
    if (valor instanceof Date) {
      data = valor;
    } else if (typeof valor === "string") {
      // Suporta tanto YYYY-MM-DD quanto DD/MM/YYYY
      if (valor.includes("/")) {
        const [dia, mes, ano] = valor.split("/").map(Number);
        data = new Date(ano, mes - 1, dia);
      } else {
        data = new Date(valor);
      }
    } else {
      throw new Error("Formato de data de nascimento inválido.");
    }

    // Validação 1: É uma data válida no calendário?
    if (isNaN(data.getTime())) {
      throw new Error(`Data de nascimento inválida: '${valor}'.`);
    }

    // Validação 2: Não pode estar no futuro
    const agora = new Date();
    if (data > agora) {
      throw new Error(`Data de nascimento futura não permitida: '${valor}'. A data não pode estar no futuro.`);
    }

    this.#dataNascimento = data;
  }

  exibirDetalhes() {
    const dia = String(this.#dataNascimento.getDate()).padStart(2, "0");
    const mes = String(this.#dataNascimento.getMonth() + 1).padStart(2, "0");
    const ano = this.#dataNascimento.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return `[PESSOA FÍSICA] ${super.exibirDetalhes()} | CPF: ${this.#cpf} | Nasc.: ${dataFormatada}`;
  }
}

module.exports = PessoaFisica;
