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
                'P',
                'Mv',
                'Fm',
                'Gf',
                'Gs',
                'Rp',
                'Rc',
                'R+',
                'R-',
                'Ass',
                'Amm',
                'Esp',
                'Ag'
            ],
            players: [],
            stats: [],
            playersStats: [],
            displayedPlayers: [],
            selectedRole: 'All',
            searchedPlayer: '',
            isSortDirectionAsc: true
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
            this.stats = data;
            this.playersStats = this.players.map(player => {
                const stats = this.stats.find(ps => ps.id === player.id);
                if(!stats) {
                    return {
                        id: player.id,
                        role: player.role,
                        name: player.name,
                        team: player.team,
                        fmv: player.fmv,
                        pv: 0,
                        mv: 0,
                        fm: 0,
                        gf: 0,
                        gs: 0,
                        rp: 0,
                        rc: 0,
                        rs: 0,
                        rb: 0,
                        as: 0,
                        am: 0,
                        es: 0,
                        au: 0
                    }
                }
                return {
                    id: player.id,
                    role: player.role,
                    name: player.name,
                    team: player.team,
                    fmv: player.fmv,
                    pv: stats.pv,
                    mv: stats.mv,
                    fm: stats.fm,
                    gf: stats.gf,
                    gs: stats.gs,
                    rp: stats.rp,
                    rc: stats.rc,
                    rs: stats.rs,
                    rb: stats.rb,
                    as: stats.as,
                    am: stats.am,
                    es: stats.es,
                    au: stats.au
                };
            });
            this.displayedPlayers = this.playersStats;
        },
        onFiltersChange() {
            this.displayedPlayers = this.playersStats.filter(player => this.selectedRoles.includes(player.role) && player.name.toLowerCase().includes(this.searchedPlayer.toLowerCase()));
        },
        sort(header) {
            if(this.isSortDirectionAsc) {
                this.isSortDirectionAsc = false;
                this.displayedPlayers = this.playersStats;
                this.sortAsc(this.displayedPlayers, header);
            } else {
                this.isSortDirectionAsc = true;
                this.displayedPlayers = this.playersStats;
                this.sortDesc(this.displayedPlayers, header);
            }
        },
        sortAsc(array, key) {
            key = this.computeKey(key);
            array.sort((a, b) => {
                if(!isNaN(a[key])) {
                    return a[key] - b[key];
                }
                return a[key].localeCompare(b[key])
            });
        },
        sortDesc(array, key) {
            key = this.computeKey(key);
            array.sort((a, b) => {
                if(!isNaN(a[key])) {
                    return b[key] - a[key];
                }
                return b[key].localeCompare(a[key])
            });
        },
        computeKey(key) {
            switch (key) {
                case 'Ruolo':
                    return 'role';
                case 'Nome':
                    return 'name';
                case 'Squadra':
                    return 'team';
                case 'FMV':
                    return 'fmv';
                case 'P':
                    return 'pv';
                case 'Mv':
                    return 'mv';
                case 'Fm':
                    return 'fm';
                case 'Gf':
                    return 'gf';
                case 'Gs':
                    return 'gs';
                case 'Rp':
                    return 'rp';
                case 'Rc':
                    return 'rc';
                case 'R+':
                    return 'rs';
                case 'R-':
                    return 'rb';
                case 'Ass':
                    return 'as';
                case 'Amm':
                    return 'am';
                case 'Esp':
                    return 'es';
                case 'Ag':
                    return 'au';
            }
        }
    }, 
    computed: {
        roles() {
            return this.players.map(player => player.role).filter((value, index, self) => self.indexOf(value) === index);
        },
        selectedRoles() {
            return this.selectedRole === 'All' ? this.roles : [this.selectedRole];
        }
    },
    async created() {
        await this.fetchPlayers();
        await this.fetchPlayersStats();
        this.loaded = true;
    }
}).mount('#main-app');