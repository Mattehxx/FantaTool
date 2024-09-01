Vue.createApp({
    name: 'main-app',
    data() {
        return {
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
            ],
            players: [],
            displayedPlayers: [],
            selectedRole: 'All',
        };
    },
    methods: {
        async fetchPlayers() {
            const response = await fetch('http://localhost:5000/players/quotes');
            const data = await response.json();
            this.players = data;
            this.displayedPlayers = data;
        },
        onRoleChange() {
            if (this.selectedRole === 'All')
                this.displayedPlayers = this.players;
            else
                this.displayedPlayers = this.players.filter(player => player.role === this.selectedRole);
        },
        openPlayerDetails(id) {
            const player = this.players.find(player => player.id === id);
            //open a new window with a query parameter player id
            window.open(`player-details.html?id=${player.id}`, '_blank');
        }
    },
    computed: {
        roles() {
            return this.players.map(player => player.role).filter((value, index, self) => self.indexOf(value) === index);
        }
    },
    mounted() {
        this.fetchPlayers();
    }
}).mount('#main-app');