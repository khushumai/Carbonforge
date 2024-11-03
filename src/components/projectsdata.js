export const projectsData = [
    {
        id: 1,
        tokenId: "0x1", // Unique blockchain identifier for NFT
        title: "Biomass Energy Project",
        basePrice: "$1000",
        image: "/images/biomass.png", // Replace with actual image path
        details: "A project focusing on converting organic materials into renewable energy to reduce carbon emissions.",
        tag: "Biomass",
        owner: "0xOwnerAddress1", // Placeholder for the owner's blockchain address
        quantity: 100,
        purchaseType: 'bidding',
        bids: [
            // Array to store bidding history for this NFT
            // Example bid:
            // { bidderId: "0xBidderAddress1", amount: 1050, timestamp: "2024-11-01T12:34:56Z" }
        ]
    },
    {
        id: 2,
        tokenId: "0x2",
        title: "Energy Efficiency Project",
        basePrice: "$850",
        image: "/images/energyefficiency.png", // Replace with actual image path
        details: "An initiative aimed at reducing energy consumption and improving efficiency in industrial processes.",
        tag: "Efficiency",
        owner: "0xOwnerAddress2",
        purchaseType: 'direct',
        quantity: 50
    },
    {
        id: 3,
        tokenId: "0x3",
        title: "Community Wind Power Project",
        basePrice: "$1200",
        image: "/images/communitywind.png", // Replace with actual image path
        details: "A community-led project that generates clean wind energy, contributing to sustainable power solutions.",
        tag: "Wind",
        owner: "0xOwnerAddress3",
        purchaseType: 'bidding',
        quantity: 250,
        bids: []
    },
    {
        id: 4,
        tokenId: "0x4",
        title: "Wetland Restoration Project",
        basePrice: "$950",
        image: "/images/wetlandresto.png", // Replace with actual image path
        details: "A conservation project that restores wetlands to improve biodiversity and carbon sequestration.",
        tag: "Restoration",
        owner: "0xOwnerAddress4",
        quantity: 300,
        purchaseType: 'direct',
    },
    {
        id: 5,
        tokenId: "0x5",
        title: "Green Building Project",
        basePrice: "$1100",
        image: "/images/greenbuilding.png", // Replace with actual image path
        details: "Focused on sustainable construction practices to minimize environmental impact and energy usage.",
        tag: "Building",
        owner: "0xOwnerAddress5",
        purchaseType: "direct", // Only direct buy
        quantity: 50
    },
    {
        id: 6,
        tokenId: "0x6",
        title: "Sustainable Agricultural Practices",
        basePrice: "$900",
        image: "/images/sustainableagri.png", // Replace with actual image path
        details: "Promotes sustainable farming techniques that reduce emissions and enhance soil health.",
        tag: "Agriculture",
        owner: "0xOwnerAddress6",
        purchaseType: "direct", // Only direct buy
        quantity: 5
    }
];
