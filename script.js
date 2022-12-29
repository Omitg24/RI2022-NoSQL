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
                Pokemon: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "Pink"
                },
                Movimiento: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "Magenta"
                },
                Tipo: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "Red"
                },
                Region: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "Green"
                },
                Entrenador: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "Blue"
                }
            },
            relationships: {
                "EVOLUCIONA_A": {
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            label: "EVOLUCIONA_A"
                        }
                    }
                },
                "COMBATE_CONTRA": {
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            label: "COMBATE_CONTRA"
                        }
                    }
                },
                "LIDERA": {
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            label: "LIDERA"
                        }
                    }
                },
                "PERTENECE": {
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            label: "PERTENECE"
                        }
                    }
                },
                "ES_EFICAZ": {
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            label: "ES_EFICAZ"
                        }
                    }
                },
                "ES_DE_TIPO": {
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            label: "ES_DE_TIPO"
                        }
                    }
                },
                "ENTRENA": {
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            label: "ENTRENA"
                        }
                    }
                },
                "TIENE_TIPO": {
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            label: "TIENE_TIPO"
                        }
                    }
                },
                "CONOCE": {
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            label: "CONOCE"
                        }
                    }
                }
            },
            arrows: true,
            hierarchical: true,
            hierarchical_sort_method: 'directed',
            encrypted: 'ENCRYPTION_OFF',
            trust: 'TRUST_ALL_CERTIFICATES'
        }

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

    limpiarResultado() {
        $("#resultado p ").remove();
    }

    mostrarResultado() {
        this.viz.reload();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async consulta1() {
        this.limpiarResultado();
        var result = await this.session.run("MATCH (n:Entrenador{nombre:'Jincho'}) RETURN n ");
        console.log(result);
        this.viz.renderWithCypher("MATCH (n:Entrenador{nombre:'Jincho'}) RETURN n ");
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
        } catch (error) {
            $("#resultado").append("<p>ERROR: Introduce una consulta correcta</p>");
        } finally {
            this.mostrarResultado();
        }

    }
}

var pokemon = new Pokemon()