class Pokemon {

    constructor() {
        this.conectarDriver();
        var config = {
            containerId: "viz",
            neo4j: {
                serverUrl: "bolt://35.170.182.177:7687",
                serverUser: "neo4j",
                serverPassword: "boom-selections-male"
            },
            labels: {
                Person: {
                    label: "name",
                    value: "pagerank",
                    group: "community"
                }
            },
            relationships: {
                INTERACTS: {
                    value: "weight"
                }
            },
            initialCypher: "MATCH (n:Person{name:'Jincho'}) RETURN n"
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

    async consulta1() {
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        console.log(result);
        this.viz.renderWithCypher("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        this.viz.reload();
    }

    async consulta2() {

        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        this.viz.renderWithCypher("MATCH (n:Person{name:'Jincho'}) RETURN n ");
        this.viz.reload();
    }

    async consulta3() {
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
    }

    async consulta4() {
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
    }

    async consulta5() {
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");

    }

    async consulta6() {
        var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
    }
}

var pokemon = new Pokemon()