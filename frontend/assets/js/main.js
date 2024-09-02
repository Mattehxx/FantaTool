Vue.createApp({
    name: 'main-app',
    data() {
        return {
            loaded: false,
            title: 'FantaTool',
            rolesColors: {
                'P': '#f8ab12',
                'D': '#65c723',
                'C': '#136af6',
                'A': '#f21c3c',
            },
            headers: [
                'Ruolo',
                'Nome',
                'Squadra',
                'FMV',
                'Presenze',
                'Media voto',
                'Fantamedia',
                'Gol fatti',
                'Gol subiti',
                'Rigori parati',
                'Rigori calciati',
                'Rigori segnati',
                'Rigori sbagliati',
                'Assist',
                'Ammonizioni',
                'Espulsioni',
                'Autogol'
            ],
            players: [],
            displayedPlayers: [],
            selectedRole: 'All',
            playersStats: []
        };
    },
    methods: {
        async fetchPlayers() {
            const response = await fetch('http://localhost:5000/players/quotes');
            const data = await response.json();
            this.players = data;
        },
        async fetchPlayersStats() {
            const response = await fetch('http://localhost:5000/players/stats');
            const data = await response.json();
            this.playersStats = data;
            this.displayedPlayers = this.players.map(player => {
                const stats = this.playersStats.find(ps => ps.id === player.id);
                if(!stats) {
                    return {
                        id: player.id,
                        role: player.role,
                        name: player.name,
                        team: player.team,
                        fmv: player.fmv,
                        stats: {
                            pv: '-',
                            mv: '-',
                            fm: '-',
                            gf: '-',
                            gs: '-',
                            rp: '-',
                            rc: '-',
                            rs: '-',
                            rb: '-',
                            as: '-',
                            am: '-',
                            es: '-',
                            ag: '-'
                        }
                    }
                }
                return {
                    id: player.id,
                    role: player.role,
                    name: player.name,
                    team: player.team,
                    fmv: player.fmv,
                    stats: stats
                };
            });
        },
        onRoleChange() {
            if (this.selectedRole === 'All')
                this.displayedPlayers = this.players;
            else
                this.displayedPlayers = this.players.filter(player => player.role === this.selectedRole);
        }
    },
    computed: {
        roles() {
            return this.players.map(player => player.role).filter((value, index, self) => self.indexOf(value) === index);
        }
    },
    async created() {
        await this.fetchPlayers();
        await this.fetchPlayersStats();
        this.loaded = true;
    }
}).mount('#main-app');