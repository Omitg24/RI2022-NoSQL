class Pokemon {

    constructor() {
        this.conectarDriver();
        var config = {
            encryption: false,
            containerId: "viz",
            neo4j: {
                serverUrl: "bolt://35.170.182.177:7687",
                serverUser: "neo4j",
                serverPassword: "boom-selections-male",
                encryption: false
            }, visConfig: {
                autoResize: true,
                edges: {
                    arrows: {
                        to: { enabled: true }
                    }
                },
                physics: {
                    forceAtlas2Based: {
                        gravitationalConstant: -26,
                        centralGravity: 0.005,
                        springLength: 230,
                        springConstant: 0.18,
                        avoidOverlap: 1.5
                    },
                    maxVelocity: 10,
                    solver: 'forceAtlas2Based',
                    timestep: 0.35,
                    stabilization: {
                        enabled: true,
                        iterations: 1000,
                        updateInterval: 25
                    }
                }
            },
            labels: {
                Pokemon: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "community"
                },
                Movimiento: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "community"
                },
                Tipo: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "community"
                },
                Region: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "community"
                },
                Entrenador: {
                    label: "nombre",
                    caption: "nombre",
                    value: "pagerank",
                    group: "community"
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
            hierarchical_sort_method: 'directed'
        }

        this.viz = new NeoVis.default(config);
    }

    async conectarDriver() {
        const driver = neo4j.driver("bolt://35.170.182.177:7687"
            , neo4j.auth.basic("neo4j", "boom-selections-male"), 
                { encrypted: 'ENCRYPTION_OFF', trust: 'TRUST_SYSTEM_CA_SIGNED_CERTIFICATES' })
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
        $("#resultado").text("");
    }

    convertirResultado(result) {
        var str = "";
        for (var r = 0; r < result.records.length; r++) {
            str += "Nombre: " + result.records[r]._fields[0].properties.nombre +
                ", Número: " + result.records[r]._fields[0].properties.numero + "\n";
        }
        return str;
    }

    async ejecutarConsulta(query) {
        this.limpiarResultado();
        var result = await this.session.run(query);
        var str = this.convertirResultado(result);
        $("#resultado").text(str);
        this.viz.renderWithCypher(query);
    }

    consulta1() {
        var query = 'MATCH (:Entrenador{nombre:"Knekro"})-[:ENTRENA]->(n:Pokemon)-[:TIENE_TIPO]->(:Tipo{nombre:"Electrico"}) RETURN n';
        this.ejecutarConsulta(query);
    }

    consulta2() {
        var query = 'MATCH (n:Pokemon)-[:TIENE_TIPO]->(:Tipo{nombre:"Agua"}) MERGE (:Pokemon)-[:CONOCE]->(:Movimiento{nombre:"Surf"}) RETURN DISTINCT n';
        this.ejecutarConsulta(query);
    }

    consulta3() {
        var query = 'MATCH (p:Pokemon)-[:PERTENECE]->(r:Region) WHERE r.nombre="Kanto" AND (p)-[:TIENE_TIPO]->(:Tipo{nombre:"Normal"}) AND (p)-[:EVOLUCIONA_A]->(:Pokemon) RETURN DISTINCT p';
        this.ejecutarConsulta(query);
    }

    consulta4() {
        var query = 'MATCH (n:Pokemon)-[:EVOLUCIONA_A]->(p:Pokemon),(p)-[:TIENE_TIPO]->(t:Tipo) WHERE NOT (n)-[:TIENE_TIPO]->(:Tipo{nombre:t.nombre}) RETURN DISTINCT n';
        this.ejecutarConsulta(query);
    }

    consulta5() {
        var query = 'MATCH((p:Pokemon)-[:CONOCE]->(m:Movimiento)-[:ES_DE_TIPO]-(t:Tipo)) WHERE NOT EXISTS{MATCH (pok:Pokemon)-[:TIENE_TIPO]->(tip:Tipo) WHERE p=pok AND tip=t} RETURN DISTINCT p';
        this.ejecutarConsulta(query);
    }

    consulta6() {
        this.limpiarResultado();
        var query = 'MATCH (Jolteon:Pokemon {nombre:"Jolteon"})-[*0..1]-(n) MATCH (n)-[r]->() RETURN n, r';
        this.viz.renderWithCypher(query);
    }

    async consultaG() {
        this.limpiarResultado();
        var query = $("#query").val();
        if (query.replace(/\s/g, "") == "") return;
        try {
            var result = await this.session.run(query);
            this.viz.renderWithCypher(query);
        } catch (error) {
            $("#resultado").text("ERROR: Introduce una consulta correcta");
        } finally {
            this.mostrarResultado();
        }

    }
}

var pokemon = new Pokemon()