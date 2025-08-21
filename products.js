const productsData = [ 
    { 
        id: 1, 
        name: "Nike Air Max 270", 
        brand: "nike", 
        logo: "images/logos/nike.png", 
        category: "deportivos", 
        description: "Zapatillas deportivas con tecnología Air Max.", 
        image: { 
            blue: "images/nike-air-max-blue.jpg", 
            black: "images/nike-air-max-black.jpg", 
            white: "images/nike-air-max-white.jpg" 
        }, 
        colors: ["blue", "black", "white"], 
        sizes: [39, 40, 41, 42, 43, 44], 
        rating: 4.5, 
        colorPricing: { 
            blue: { price: 129.99, badge: "sale" }, 
            black: { price: 139.99, badge: "new" }, 
            white: { price: 124.99 } 
        }, 
        inStock: true 
    }, 
    { 
        id: 2, 
        name: "Adidas Ultraboost 22", 
        brand: "adidas", 
        logo: "images/logos/adidas.png", 
        category: "deportivos", 
        description: "Zapatillas de running con tecnología BOOST.", 
        image: { 
            white: "images/adidas-ultraboost-white.jpg", 
            black: "images/adidas-ultraboost-black.jpg", 
            blue: "images/adidas-ultraboost-blue.jpg" 
        }, 
        price: 149.99, 
        colors: ["white", "black", "blue"], 
        sizes: [40, 41, 42, 43, 44, 45], 
        rating: 4.8, 
        badge: "new", 
        inStock: true 
    }, 
    { 
        id: 3, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 
    { 
        id: 4, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    },
        { 
        id: 5, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    },  
        { 
        id: 6, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 
        { 
        id: 7, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 
        { 
        id: 8, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 
        { 
        id: 9, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 

        { 
        id: 10, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 


        { 
        id: 11, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 


        { 
        id: 12, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 


        { 
        id: 13, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 

        { 
        id: 14, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 


        { 
        id: 15, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 

        { 
        id: 16, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 


        { 
        id: 17, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 



        { 
        id: 18, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 



        { 
        id: 19, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 




        { 
        id: 20, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 


        { 
        id: 21, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 


        { 
        id: 22, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 


        { 
        id: 23, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 


        { 
        id: 24, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 

        { 
        id: 25, 
        name: "Puma RS-X (Muchos Colores)", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    }, 
       { 
        id: 25, 
        name: "Picatchu", 
        brand: "puma", 
        logo: "images/logos/puma.png", 
        category: "casual", 
        description: "Zapatillas retro con gran variedad de acabados.", 
        image: { 
            yellow: "images/puma-rsx-yellow.jpg", pink: "images/puma-rsx-pink.jpg", green: "images/puma-rsx-green.jpg", teal: "images/puma-rsx-teal.jpg", orange: "images/puma-rsx-orange.jpg", brown: "images/puma-rsx-brown.jpg", grey: "images/puma-rsx-grey.jpg", cyan: "images/puma-rsx-cyan.jpg", lime: "images/puma-rsx-lime.jpg", indigo: "images/puma-rsx-indigo.jpg" 
        }, 
        price: 89.99, 
        colors: ["yellow", "pink", "green", "teal", "orange", "brown", "grey", "cyan", "lime", "indigo"], 
        sizes: ["S", "M", "L"], 
        rating: 4.2, 
        inStock: true 
    },
        { 
        id: 2, 
        name: "zooAdidas Ultraboost 22", 
        brand: "adidas", 
        logo: "images/logos/adidas.png", 
        category: "deportivos", 
        description: "Zapatillas de running con tecnología BOOST.", 
        image: { 
            white: "images/adidas-ultraboost-white.jpg", 
            black: "images/adidas-ultraboost-black.jpg", 
            blue: "images/adidas-ultraboost-blue.jpg" 
        }, 
        price: 149.99, 
        colors: ["white", "black", "blue"], 
        sizes: [40, 41, 42, 43, 44, 45], 
        rating: 4.8, 
        badge: "new", 
        inStock: true 
    }, 


































































































    { 
        id: 11111111111, 
        name: "Adidas Gazelle", 
        brand: "adidas", 
        logo: "images/logos/adidas.png", 
        category: "casual", 
        description: "Zapatillas retro con diseño limpio y premium.", 
        image: { 
            blue: "images/adidas-gazelle-blue.jpg", 
            pink: "images/adidas-gazelle-pink.jpg", 
            black: "images/adidas-gazelle-black.jpg" 
        }, 
        price: 89.99, 
        colors: ["blue", "pink", "black"], 
        sizes: [38, 39, 40, 41, 42], 
        rating: 4.3, 
        inStock: true 
    } 
];