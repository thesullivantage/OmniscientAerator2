module.exports = function (sequelize, DataTypes) {
    var SubType = sequelize.define("SubType", {
        subType: DataTypes.TEXT,
        type: DataTypes.TEXT,
        description: DataTypes.TEXT,
        country: DataTypes.TEXT
    });

    // SubType.sync();

    // DATA FOR THE MODEL
    var subTypeData = [
        {
            subType: "Sauvignon Blanc",
            type: "Dry White",
            description: "bright, crisp, refreshing",
            country: "France"
        },
        {
            subType: "Pinot Grigio",
            type: "Dry White",
            description: "zesty, heat, summer",
            country: "Austria"
        },
        {
            subType: "Albariño",
            type: "Dry White",
            description: "mountain, romance, king",
            location: "Spain "
        },
        {
            subType: "Gewürztraminer",
            type: "Sweet White",
            description: "zesty, heat, summer",
            country: "Austria"
        },
        {
            subType: "Malvasia",
            type: "Sweet White",
            description: "zesty, heat, summer",
            country: "Austria"
        },
        {
            subType: "Moscato",
            type: "Sweet White",
            description: "zesty, heat, summer",
            country: "Austria"
        },
        {
            subType: "Riesling",
            type: "Sweet White",
            description: "medieval, estate, villa ",
            country: "Germany"
        },
        {
            subType: "Chardonnay",
            type: "Rich White",
            description: "sensual, estate, villa",
            country: ""
        },
        {
            subType: "Viognier",
            type: "Rich White",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Champagne",
            type: "Sparkling",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Prosecco",
            type: "Sparkling",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Cava",
            type: "Sparkling",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Pinot Noir",
            type: "Light Red",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Tempranillo",
            type: "Medium Red",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Sangiovese",
            type: "Medium Red",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Zinfandel",
            type: "Medium Red",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Grenache",
            type: "Medium Red",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Merlot",
            type: "Medium Red",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Cabernet Sauvignon",
            type: "Bold Red",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Monastrell",
            type: "Bold Red",
            description: "mountain, romance, king",
            country: ""
        },
        {
            subType: "Malbec",
            type: "Bold Red",
            description: "adventure, quest, hero",
            country: "Argentina"
        },
        {
            subType: "Syrah",
            type: "Bold Red",
            description: "adventure, quest, hero",
            country: ""
        },
        {
            subType: "Late Harvest",
            type: "Dessert",
            description: "adventure, quest, hero",
            country: ""
        },
        {
            subType: "Ice Wine",
            type: "Dessert",
            description: "adventure, quest, hero",
            country: ""
        },
        {
            subType: "Sherry",
            type: "Dessert",
            description: "adventure, quest, hero",
            country: ""
        },
        {
            subType: "Port",
            type: "Dessert",
            description: "adventure, quest, hero",
            country: ""
        }
    ];

    // CHECK TO SEE IF TABLE HAS BEEN SEEDED
    SubType.findOne({ where: { type: "Sweet White" } }).then(function (data) {
        // If no matches found seed the table
        if (!data) {
            console.log("Seeding SubType Table");
            SubType.bulkCreate(subTypeData, { returning: true });
            // Otherwise leave the table alone
        } else {
            console.log("Table Previously Seeded");
        }
    });

    SubType.sync();

    return SubType;
};
