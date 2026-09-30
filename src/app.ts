import * as readline from 'readline';
import { add, sub, mul, div, area, perimetro, areaC, perimetroC } from './modules/math';

// Configuração da interface de leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função utilitária para fazer perguntas no terminal usando Promises
const question = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function menu() {
  let continuar = true;

  while (continuar) {
    console.log("\n=== CALCULADORA ARITMÉTICA ===");
    console.log("1. Adição (+)");
    console.log("2. Subtração (-)");
    console.log("3. Multiplicação (*)");
    console.log("4. Divisão (/)");
    console.log("5. Area retangulo");
    console.log("6. Perimetro retangulo");
    console.log("7. Area circulo");
    console.log("8. Perimetro circulo");
    console.log("9. Sair");

    const opcao = await question("Escolha uma opção (1-9): ");

    if (opcao === "9") {
      console.log("A sair da aplicação... Até breve!");
      continuar = false;
      rl.close();
      break;
    }

    if (!["1", "2", "3", "4", "5", "6", "7", "8"].includes(opcao)) {
      console.log("Opção inválida! Tente novamente.");
      continue;
    }

    let raio = 0;
    let num1 = 0;
    let num2 = 0;

    // Pede os dois operandos ao utilizador
    if (Number(opcao) < 7) {
      const num1Input = await question("Introduza o primeiro número inteiro: ");
      const num2Input = await question("Introduza o segundo número inteiro: ");
      num1 = parseInt(num1Input, 10);
      num2 = parseInt(num2Input, 10);

      // Valida se os valores introduzidos são números válidos
      if (isNaN(num1) || !Number.isInteger(num1) || isNaN(num2) || !Number.isInteger(num2)) {
        console.log("Erro: Por favor, introduza apenas números inteiros válidos.");
        continue;
      }
    } else {
      const raioInput = await question("Introduza o raio: ");
      raio = parseInt(raioInput, 10);

      // Valida se o raio é um número válido
      if (isNaN(raio) || !Number.isInteger(raio)) {
        console.log("Erro: Por favor, introduza um raio inteiro válido.");
        continue;
      }
    }

    // Executa a operação escolhida
    try {
      let resultado: number;

      switch (opcao) {
        case "1":
          resultado = add(num1, num2);
          console.log(`\n> Resultado: ${num1} + ${num2} = ${resultado}`);
          break;
        case "2":
          resultado = sub(num1, num2);
          console.log(`\n> Resultado: ${num1} - ${num2} = ${resultado}`);
          break;
        case "3":
          resultado = mul(num1, num2);
          console.log(`\n> Resultado: ${num1} * ${num2} = ${resultado}`);
          break;
        case "4":
          resultado = div(num1, num2);
          console.log(`\n> Resultado: ${num1} / ${num2} = ${resultado}`);
          break;
        case "5":
          resultado = area(num1, num2);
          console.log(`\n> Area: ${resultado}`);
          break;
        case "6":
          resultado = perimetro(num1, num2);
          console.log(`\n> Perimetro: ${resultado}`);
          break;
        case "7":
          resultado = areaC(raio);
          console.log(`\n> Area: ${resultado}`);
          break;
        case "8":
          resultado = perimetroC(raio);
          console.log(`\n> Perimetro: ${resultado}`);
          break;
      }
    } catch (error: any) {
      // Captura a exceção de divisão por zero lançada pelo módulo math.ts
      console.log(`\nErro ao executar a operação: ${error.message}`);
    }
  }
}

// Inicia a aplicação
menu();