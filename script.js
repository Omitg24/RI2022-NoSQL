class Pokemon {

    constructor() {
        this.conectarDriver();
        var config = {
            containerId: "viz",
            neo4j: {
                serverUrl: "bolt+s://35.170.182.177:7687",
                serverUser: "neo4j",
                serverPassword: "boom-selections-male",
                encrypted: "ENCRYPTION_ON"
            },
            labels: {
                "Pokemon": {
                    label: "nombre",
                    value: "pagerank",
                    group: "community"
                }, 
                "Movimiento": {
                    label: "nombre",
                    value: "pagerank",
                    group: "community"
                }, 
                "Tipo": {
                    label: "nombre",
                    value: "pagerank",
                    group: "community"
                }, 
                "Region": {
                    label: "nombre",
                    value: "pagerank",
                    group: "community"
                }, 
                "Entrenador": {
                    label: "nombre",
                    value: "pagerank",
                    group: "community"
                }
            },
            relationships: {
                "EVOLUCIONA_A":{
                    label: true
                },
                "COMBATE_CONTRA":{
                    label: true
                },
                "LIDERA":{
                    label: true
                },
                "PERTENECE":{
                    label: true
                },
                "ES_EFICAZ":{
                    label: true
                },
                "ES_DE_TIPO":{
                    label: true
                },
                "ENTRENA":{
                    label: true
                },
                "TIENE_TIPO":{
                    label: true
                },
                "CONOCE":{
                    label: true
                }        
            }
        };

        this.viz = new NeoVis.default(config);
    }

    async conectarDriver() {
        const driver = neo4j.driver("bolt://35.170.182.177:7687"
            , neo4j.auth.basic("neo4j", "boom-selections-male"))
        try {
            await driver.verifyConnectivity();
            console.log('Driver created');
        } catch (error) {
            console.log(`connectivity verification failed. ${error}`);
        } finally {
            this.session = driver.session();
        }
    }

    limpiarResultado(){
        $("#resultado p ").remove();
    }

    mostrarResultado(){
        this.viz.reload();
        this.viz.stabilize();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async consulta1() {
        this.limpiarResultado();
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        this.viz.renderWithCypher("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        this.mostrarResultado();
    }

    async consulta2() {
        this.limpiarResultado();
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        this.viz.renderWithCypher("MATCH (n:Person{name:'Jincho'}) RETURN n ");
        this.mostrarResultado();
    }

    async consulta3() {
        this.limpiarResultado();
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        this.mostrarResultado();
    }

    async consulta4() {
        this.limpiarResultado();
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        this.mostrarResultado();
    }

    async consulta5() {
        this.limpiarResultado();
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        this.mostrarResultado();
    }

    async consulta6() {
        this.limpiarResultado();
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        this.mostrarResultado();
    }

    async consultaG() {
        this.limpiarResultado();
        var query = $("#query").val();
        if (query.replace(/\s/g, "") == "") return;
        try {
            var result = await this.session.run(query);
            this.viz.renderWithCypher(query);
        }catch(error){
            $("#resultado").append("<p>ERROR: Introduce una consulta correcta</p>");
        }finally{
            this.mostrarResultado();
        }

    }
}

var pokemon = new Pokemon()