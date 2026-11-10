const Endereco = require("./src/Endereco");
const PessoaFisica = require("./src/PessoaFisica");
const PessoaJuridica = require("./src/PessoaJuridica");

console.log("================================================================================");
console.log("           APPFULL / ELECTRONIC - SISTEMA DE CADASTRO DE CLIENTES               ");
console.log("================================================================================\n");

// Lista para armazenar apenas os cadastros válidos (exigência da avaliação)
const clientesValidos = [];

// Lista de cenários de teste (contemplando a rubrica: PF válida, PJ válida, PF inválida, PJ inválida)
const cenariosDeTeste = [
  {
    cenario: "CENÁRIO 1: Pessoa Física VÁLIDA",
    tipo: "PF",
    dados: {
      nome: "Carlos Eduardo Silva",
      logradouro: "Avenida Paulista",
      numero: "1578",
      cidade: "São Paulo",
      uf: "SP",
      cpf: "123.456.789-01",
      dataNascimento: "1995-08-14"
    }
  },
  {
    cenario: "CENÁRIO 2: Pessoa Jurídica VÁLIDA",
    tipo: "PJ",
    dados: {
      nome: "Tech Inovação E-commerce",
      logradouro: "Rua das Flores",
      numero: "500",
      cidade: "Curitiba",
      uf: "PR",
      cnpj: "12.345.678/0001-95",
      razaoSocial: "Tech Inovação Comércio de Eletrônicos Ltda"
    }
  },
  {
    cenario: "CENÁRIO 3: Pessoa Física INVÁLIDA (CPF com dígitos incorretos)",
    tipo: "PF",
    dados: {
      nome: "Mariana Souza",
      logradouro: "Rua Bahia",
      numero: "120",
      cidade: "Belo Horizonte",
      uf: "MG",
      cpf: "123.456.78", // Inválido: apenas 8 dígitos em vez de 11!
      dataNascimento: "2000-01-10"
    }
  },
  {
    cenario: "CENÁRIO 4: Pessoa Jurídica INVÁLIDA (Razão Social vazia)",
    tipo: "PJ",
    dados: {
      nome: "Mega Atacado Express",
      logradouro: "Avenida Brasil",
      numero: "2020",
      cidade: "Rio de Janeiro",
      uf: "RJ",
      cnpj: "98.765.432/0001-10",
      razaoSocial: "   " // Inválido: Razão social obrigatória não preenchida!
    }
  },
  {
    cenario: "CENÁRIO 5: Pessoa Física INVÁLIDA (Data de Nascimento no Futuro)",
    tipo: "PF",
    dados: {
      nome: "Lucas Pereira",
      logradouro: "Rua do Sol",
      numero: "45",
      cidade: "Recife",
      uf: "PE",
      cpf: "456.789.123-45",
      dataNascimento: "2030-05-20" // Inválido: data futura!
    }
  },
  {
    cenario: "CENÁRIO 6: Cliente INVÁLIDO (Nome com menos de 3 caracteres)",
    tipo: "PF",
    dados: {
      nome: "Al", // Inválido: menos de 3 caracteres!
      logradouro: "Rua das Palmeiras",
      numero: "10",
      cidade: "Florianópolis",
      uf: "SC",
      cpf: "999.888.777-66",
      dataNascimento: "1992-11-03"
    }
  }
];

// Processamento de cada cadastro utilizando try...catch para impedir que o programa trave
console.log(">>> INICIANDO PROCESSAMENTO DOS CADASTROS...\n");

cenariosDeTeste.forEach((teste, index) => {
  console.log(`--------------------------------------------------------------------------------`);
  console.log(`[TESTE ${index + 1}] ${teste.cenario}`);

  try {
    // 1. Cria a instância de endereço
    const endereco = new Endereco(
      teste.dados.logradouro,
      teste.dados.numero,
      teste.dados.cidade,
      teste.dados.uf
    );

    // 2. Cria o cliente conforme o tipo (PF ou PJ)
    let cliente;
    if (teste.tipo === "PF") {
      cliente = new PessoaFisica(
        teste.dados.nome,
        endereco,
        teste.dados.cpf,
        teste.dados.dataNascimento
      );
    } else if (teste.tipo === "PJ") {
      cliente = new PessoaJuridica(
        teste.dados.nome,
        endereco,
        teste.dados.cnpj,
        teste.dados.razaoSocial
      );
    }

    // 3. Se passou pelas validações sem erro, adiciona na lista
    clientesValidos.push(cliente);
    console.log("STATUS: ✅ CADASTRO REALIZADO COM SUCESSO!");
    console.log(`DADOS:  ${cliente.exibirDetalhes()}`);

  } catch (erro) {
    // 4. Captura o erro, exibe mensagem clara e NÃO DERRUBA o programa!
    console.log("STATUS: ❌ FALHA NO CADASTRO (Erro tratado com sucesso)");
    console.log(`MOTIVO: ${erro.message}`);
  }
});

console.log("\n================================================================================");
console.log("                     RELATÓRIO FINAL: CLIENTES CADASTRADOS                      ");
console.log("================================================================================\n");

console.log(`Total de tentativas: ${cenariosDeTeste.length}`);
console.log(`Cadastros válidos aprovados: ${clientesValidos.length}`);
console.log(`Cadastros recusados por inconsistência: ${cenariosDeTeste.length - clientesValidos.length}\n`);

console.log(">>> LISTA DE CLIENTES VÁLIDOS ATIVOS NO SISTEMA:");
clientesValidos.forEach((cliente, idx) => {
  console.log(` ${idx + 1}. ${cliente.exibirDetalhes()}`);
});

console.log("\n================================================================================");
console.log("                 FIM DA EXECUÇÃO - PROGRAMA FINALIZADO COM ÊXITO                ");
console.log("================================================================================");
