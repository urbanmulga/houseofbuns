export interface RestaurantConfig {
  brandName: string;
  tagline: string;
  subTagline: string;
  logo: string;
  city: string;
  location: {
    area: string;
    address: string;
    landmark: string;
    pincode: string;
    googleMapsUrl: string;
    phone: string;
    whatsapp: string;
    email: string;
    hours: string;
    days: string;
  };
  deliveryPartners: {
    zomatoUrl: string;
    swiggyUrl: string;
  };
  social: {
    instagram: string;
    twitter: string;
  };
  features: string[];
}

export const RESTAURANT_CONFIG: RestaurantConfig = {
  brandName: "HOUSE OF BUNS",
  tagline: "GOOD BUNS. GREAT TIMES.",
  subTagline: "AMAZING TASTE. MADE FOR YOU.",
  logo: "/images/brand-logo.png",
  city: "Indore",
  location: {
    area: "Vijay Nagar",
    address: "Plot 14, Scheme No. 54, PU-4 Commercial, Near Vijay Nagar Square",
    landmark: "Behind C21 Mall / Near Orbit Mall",
    pincode: "452010",
    googleMapsUrl: "https://maps.google.com/?q=Vijay+Nagar+Indore+House+Of+Buns",
    phone: "+91 98260 12345",
    whatsapp: "https://wa.me/919826012345?text=Hi%20House%20of%20Buns%2C%20I%20would%20like%20to%20place%20an%20order!",
    email: "bonjour@houseofbuns.in",
    hours: "11:00 AM – 11:30 PM",
    days: "Monday – Sunday (7 Days Open)",
  },
  deliveryPartners: {
    zomatoUrl: "https://www.zomato.com/indore/house-of-buns-vijay-nagar",
    swiggyUrl: "https://www.swiggy.com/restaurants/house-of-buns-vijay-nagar-indore",
  },
  social: {
    instagram: "https://instagram.com/houseofbuns.indore",
    twitter: "https://x.com/houseofbuns",
  },
  features: [
    "Handcrafted In-House Brioche Buns",
    "Smashed Patty Crust Precision",
    "Single Flagship Outlet in Indore",
    "Zero Frozen Patties Ever",
  ],
};
