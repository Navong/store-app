// lib/data.ts
export const products = [
    {
      id: 1,
      name: "Basic T-Shirt",
      imgdata: "/api/placeholder/400/320",
      price: 29.99,
      description: "Classic cotton t-shirt with a comfortable fit"
    },
    {
      id: 2,
      name: "Denim Jeans",
      imgdata: "/api/placeholder/400/320",
      price: 79.99,
      description: "High-quality denim jeans with modern cut"
    },
    {
      id: 3,
      name: "Sneakers",
      imgdata: "/api/placeholder/400/320",
      price: 99.99,
      description: "Comfortable sneakers for everyday wear"
    },
    {
      id: 4,
      name: "Backpack",
      imgdata: "/api/placeholder/400/320",
      price: 49.99,
      description: "Spacious backpack with multiple compartments"
    },
    {
      id: 5,
      name: "Watch",
      imgdata: "/api/placeholder/400/320",
      price: 199.99,
      description: "Elegant watch with leather strap"
    },
    {
      id: 6,
      name: "Sunglasses",
      imgdata: "/api/placeholder/400/320",
      price: 159.99,
      description: "Stylish sunglasses with UV protection"
    }
  ] as const;