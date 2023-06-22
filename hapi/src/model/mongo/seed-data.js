export const seedData = {
    users: {
        _model: "User",
        homer: {
            userName: "hi123",
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "secret",
            adminrights: false,
        },
        marge: {
            userName: "hi1234",
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: "secret",
            adminrights: false,
        },
        bart: {
            userName: "hi1235",
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: "secret",
            adminrights: false,
        },
        admin: {
            userName: "admin",
            firstName: "admin",
            lastName: "admin",
            email: "admin@gmail.com",
            password: "secret",
            adminrights: true,
        },
        maggie: {
            userName: "hi1236",
            firstName: "Maggie",
            lastName: "Simpson",
            email: "maggie@simpson.com",
            password: "secret",
            adminrights: true,
        }
    },
    Placemarks: {
        _model: "Placemark",
        AllianzArena: {
            name: "Allianz Arena",
            description: "The Stadium of FC Bayern Munich",
            category: "Sport",
            location: {latitude: "48.218791",
                longitude: "11.624695"},
            createdby: "->users.admin"
        },
        SignalIdunaPark: {
            name: "Signal Iduna Park",
            description: "The stadium of Borussia Dortmund",
            category: "Sport",
            location: {latitude: "51.492668",
                longitude: "7.451767"},
            createdby: "->users.admin"
        },
        MaxMorlockStadion: {
            name: "Max-Morlock-Stadion",
            description: "The stadium of 1.FC Nürnberg",
            category: "Sport",
            location: {latitude: "49.426255",
            longitude: "11.125707"},
            createdby: "->users.admin"
        },
        RedBullArena: {
            name: "Red Bull Arena",
            description: "The stadium of RB Leibzig",
            category: "Sport",
            location: {latitude: "51.345787",
                longitude: "12.34827"},
            createdby: "->users.admin"
        },
        JahnstadionRegensburg:{
            name: "Jahnstadion Regensburg",
            description: "The stadium of SSV Jahn Regensburg",
            category: "Sport",
            location: {latitude: "48.990856",
                longitude: "12.107238"},
            createdby: "->users.admin"
        },
    }
};
