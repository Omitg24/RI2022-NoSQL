class Pokemon{

    constructor(){
        const neo4j = require('neo4j-driver');

        const driver = neo4j.driver("neo4j+s://cf153a5b.databases.neo4j.io:7687"
            , neo4j.auth.basic("neo4j", "K8knVxOnUgtrInA8M7mJ0P8Joq9iMOocDKGgRLrX-Bc"))
        this.session = driver.session()
    }
    
    dibujarGrafo(){
        try {
            result =  this.session.run(
              'CREATE (a:Person {name: $name}) RETURN a',
              { name: personName }
            )
          
             singleRecord = result.records[0]
             node = singleRecord.get(0)
          
            console.log(node.properties.name)
          } finally {
            this.session.close()
          }
    }

    consulta1(){
        this.dibujarGrafo();
    }
    consulta2(){
        this.dibujarGrafo();
    }
    consulta3(){
        this.dibujarGrafo();
    }
    consulta4(){
        this.dibujarGrafo();
    }
    consulta5(){
        this.dibujarGrafo();
    }
    consulta6(){
        this.dibujarGrafo();
    }
}

var pokemon = new Pokemon()