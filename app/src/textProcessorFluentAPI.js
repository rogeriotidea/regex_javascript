// O objetivo do Fluent API é executar tarefas
// como um pipleline, step by step,
// e no fim chama o build. Muito similar ao padrao Builder
// a diferença que aqui é sobre processos, o Builder sobre construcao 
// de objetos

class TextProcessorFluentAPI {

    #content
    constructor(content) {
        this.#content = content
    }

    extractPeopleData(){

        // ?<= fala que vai extrair os dados que virao depois deste grupo
        // [contratante|contratada]  ou um ou o outro e tem a flag no fim da empressao para pegar case insentitive
        // :\s{1} vai procurar o caracteres literal do dois pontos seguido de um espaco
        // tudo acima cima fica dentro de um paranteses para falar "vamos pegar dai para frente"
        // (?!s) negative look around, vai ignorar os contratante do fim do documento (que tem so espaco a frente deles)
        // .*\n pega qualquer coisa ate o primeiro \n
        // .*? non greety? esse ? faz com que ele pare na primeira recorrencia, assim evita ficar em loop
        // $ informar que acaba no fim da linha
        // g -> global
        // m -> multiline
        // i -> case insensitive

        const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
        // faz o match para encontrar a string inteira e coloca no array os resultados.
        const onlyPerson = this.#content.match(matchPerson)   
        //console.log('onlyPerson', onlyPerson)
        this.#content = onlyPerson
        return this 
    } 
    
    build(){
        return this.#content
    }

}

module.exports = TextProcessorFluentAPI