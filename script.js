class Pokemon {

    constructor() {
        this.conectarDriver();
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
        try {
            var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
            console.log(result);
        } finally {
            await this.session.close();
        }
    }

    async consulta2() {
        try {
            var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        } finally {
            await this.session.close();
        }
    }

    async consulta3() {
        try {
            var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        } finally {
            await this.session.close();
        }
    }

    async consulta4() {
        try {
            var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        } finally {
            await this.session.close();
        }
    }

    async consulta5() {
        try {
            var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        } finally {
            await this.session.close();
        }
    }

    async consulta6() {
        try {
            var result = await this.session.run("MATCH (n:Person{name:'Foyone'}) RETURN n ");
        } finally {
            await this.session.close();
        }
    }
}

var pokemon = new Pokemon()