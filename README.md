# Appfull / Electronic — Módulo de Cadastro de Clientes
**Unidade Curricular:** Programação Orientada a Objetos (Desenvolvimento Mobile — SENAI)  
**Avaliação 01:** Modelagem e Implementação de Sistema de Cadastro com POO em JavaScript  
**Estudante:** Filipe  
**Repositório GitHub:** [https://github.com/filipedk/appfull-cadastro-clientes](https://github.com/filipedk/appfull-cadastro-clientes)  
**Data:** Novembro / 2026  

---

## 📌 1. Sobre o Projeto

Este projeto consiste no módulo de cadastro de clientes do aplicativo de e-commerce da **Electronic**, desenvolvido pela **Appfull**. O sistema é capaz de cadastrar e gerenciar tanto **Pessoas Físicas (PF)** quanto **Pessoas Jurídicas (PJ)**, aplicando rigorosamente os princípios do **Paradigma Orientado a Objetos (POO)**.

### Características e Boas Práticas Aplicadas:
- **Abstração:** Modelagem das entidades centrais (`Pessoa`, `PessoaFisica`, `PessoaJuridica` e `Endereco`).
- **Herança:** A classe base abstrata `Pessoa` centraliza nome e endereço, sendo estendida (`extends` e `super`) por `PessoaFisica` e `PessoaJuridica`.
- **Composição/Associação:** Toda `Pessoa` possui uma instância associada da classe `Endereco`.
- **Encapsulamento Rígido:** Utilização de campos privados (`#`) do ECMAScript moderno, acessados e modificados exclusivamente via `getters` e `setters`.
- **Validação de Dados:** Interceptação nos setters lançando exceções (`throw new Error`) para dados fora do padrão.
- **Tratamento de Exceções:** Fluxo protegido com `try...catch`, impedindo o encerramento abrupto do programa e mantendo a integridade da lista de clientes cadastrados.

---

## 📐 2. Modelagem do Sistema — Diagrama de Classes UML

O diagrama foi elaborado no **Draw.io** e encontra-se disponível na pasta `diagramas/`:
- Arquivo editável: `diagramas/diagrama_classes.drawio`

### Visão Geral da Arquitetura de Classes:

```text
       +-----------------------+
       |       Endereco        |
       +-----------------------+
       | - logradouro: String  |
       | - numero: String      |
       | - cidade: String      |
       | - uf: String          |
       +-----------------------+
       | + formatar(): String  |
       +-----------------------+
                   ^
                   | 1 tem 1 (associação)
       +-----------------------+
       |  <<abstract>> Pessoa  |
       +-----------------------+
       | # nome: String        |
       | # endereco: Endereco  |
       +-----------------------+
       | + exibirDetalhes()    |
       +-----------------------+
              ^         ^
              |         | extends (herança)
     +--------+         +--------+
     |                           |
+---------------------+     +-------------------------+
|    PessoaFisica     |     |     PessoaJuridica      |
+---------------------+     +-------------------------+
| - cpf: String       |     | - cnpj: String          |
| - dataNasc: Date    |     | - razaoSocial: String   |
+---------------------+     +-------------------------+
| + exibirDetalhes()  |     | + exibirDetalhes()      |
+---------------------+     +-------------------------+
```

---

## ⚙️ 3. Regras de Validação Implementadas

1. **Nome:** Obrigatório, com no mínimo 3 caracteres válidos.
2. **CPF:** Obrigatório, deve possuir exatamente 11 dígitos numéricos (pontos e traços são desconsiderados e formatados).
3. **CNPJ:** Obrigatório, deve possuir exatamente 14 dígitos numéricos (pontos, barras e traços são desconsiderados).
4. **Data de Nascimento:** Obrigatória, deve ser uma data válida e não pode estar no futuro.
5. **Razão Social:** Obrigatória (não vazia).
6. **Endereço:** Todos os campos são obrigatórios, e a UF deve conter 2 letras maiúsculas.

---

## 🚀 4. Instruções de Execução

### Pré-requisitos:
- Node.js instalado (versão 16 ou superior).

### Passo a passo para rodar:
1. Abra o terminal na pasta raiz do projeto:
   ```bash
   cd appfull-cadastro-clientes
   ```
2. Execute o arquivo principal com o comando solicitado na avaliação:
   ```bash
   node index.js
   ```

---

## 🧪 5. Evidências de Teste (Cenários da Avaliação)

A execução do arquivo `index.js` realiza testes automatizados cobrindo os cenários exigidos pela rubrica:

### Saída Real do Terminal:

```text
================================================================================
           APPFULL / ELECTRONIC - SISTEMA DE CADASTRO DE CLIENTES               
================================================================================

>>> INICIANDO PROCESSAMENTO DOS CADASTROS...

--------------------------------------------------------------------------------
[TESTE 1] CENÁRIO 1: Pessoa Física VÁLIDA
STATUS: ✅ CADASTRO REALIZADO COM SUCESSO!
DADOS:  [PESSOA FÍSICA] Nome: Carlos Eduardo Silva | Endereço: [Avenida Paulista, nº 1578 - São Paulo/SP] | CPF: 123.456.789-01 | Nasc.: 13/08/1995
--------------------------------------------------------------------------------
[TESTE 2] CENÁRIO 2: Pessoa Jurídica VÁLIDA
STATUS: ✅ CADASTRO REALIZADO COM SUCESSO!
DADOS:  [PESSOA JURÍDICA] Nome: Tech Inovação E-commerce | Endereço: [Rua das Flores, nº 500 - Curitiba/PR] | CNPJ: 12.345.678/0001-95 | Razão Social: Tech Inovação Comércio de Eletrônicos Ltda
--------------------------------------------------------------------------------
[TESTE 3] CENÁRIO 3: Pessoa Física INVÁLIDA (CPF com dígitos incorretos)
STATUS: ❌ FALHA NO CADASTRO (Erro tratado com sucesso)
MOTIVO: CPF inválido: '123.456.78'. O CPF deve conter exatamente 11 dígitos numéricos.
--------------------------------------------------------------------------------
[TESTE 4] CENÁRIO 4: Pessoa Jurídica INVÁLIDA (Razão Social vazia)
STATUS: ❌ FALHA NO CADASTRO (Erro tratado com sucesso)
MOTIVO: A razão social é obrigatória.
--------------------------------------------------------------------------------
[TESTE 5] CENÁRIO 5: Pessoa Física INVÁLIDA (Data de Nascimento no Futuro)
STATUS: ❌ FALHA NO CADASTRO (Erro tratado com sucesso)
MOTIVO: Data de nascimento futura não permitida: '2030-05-20'. A data não pode estar no futuro.
--------------------------------------------------------------------------------
[TESTE 6] CENÁRIO 6: Cliente INVÁLIDO (Nome com menos de 3 caracteres)
STATUS: ❌ FALHA NO CADASTRO (Erro tratado com sucesso)
MOTIVO: O nome deve ter ao menos 3 caracteres.

================================================================================
                     RELATÓRIO FINAL: CLIENTES CADASTRADOS                      
================================================================================

Total de tentativas: 6
Cadastros válidos aprovados: 2
Cadastros recusados por inconsistência: 4

>>> LISTA DE CLIENTES VÁLIDOS ATIVOS NO SISTEMA:
 1. [PESSOA FÍSICA] Nome: Carlos Eduardo Silva | Endereço: [Avenida Paulista, nº 1578 - São Paulo/SP] | CPF: 123.456.789-01 | Nasc.: 13/08/1995
 2. [PESSOA JURÍDICA] Nome: Tech Inovação E-commerce | Endereço: [Rua das Flores, nº 500 - Curitiba/PR] | CNPJ: 12.345.678/0001-95 | Razão Social: Tech Inovação Comércio de Eletrônicos Ltda

================================================================================
                 FIM DA EXECUÇÃO - PROGRAMA FINALIZADO COM ÊXITO                
================================================================================
```

---

## 📂 6. Estrutura de Arquivos do Repositório

```text
appfull-cadastro-clientes/
├── diagramas/
│   └── diagrama_classes.drawio   # Arquivo editável da modelagem UML no Draw.io
├── src/
│   ├── Endereco.js               # Classe para dados de localização (associação)
│   ├── Pessoa.js                 # Classe base abstrata com nome e endereço
│   ├── PessoaFisica.js           # Subclasse com CPF e Data de Nascimento
│   └── PessoaJuridica.js         # Subclasse com CNPJ e Razão Social
├── index.js                      # Arquivo principal executável com os testes
├── package.json                  # Manifesto do projeto Node.js
└── README.md                     # Documentação completa e evidências da avaliação
```
