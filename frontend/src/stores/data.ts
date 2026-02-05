import { defineStore } from 'pinia'
import { Factory, Sparkles, Recycle, Key } from 'lucide-vue-next'
import type { HeroSlide, Exhibitor, Testimonial, Benefit, Category } from '../types'
import furniture1 from '../assets/furniture&home.jpeg'
import fashion1 from '../assets/fashion&accessories.jpeg'
import lifestyle1 from '../assets/gifts&lifestyle.jpeg'
import furniture2 from '../assets/furniture&home2.jpeg'
import fashion2 from '../assets/fashion&accessories2.jpeg'
import lifestyle2 from '../assets/gifts&lifestyle2.jpeg'
import furniture3 from '../assets/furniture&home3.jpeg'
import fashion3 from '../assets/fashion&accessories3.jpeg'
import lifestyle3 from '../assets/gifts&lifestyle3.jpeg'
import furniturecover from '../assets/fashion&accessories3.jpeg'
import fashioncover from '../assets/fashion&accessoriescover.jpeg'
import lifestylecover from '../assets/gifts&lifestylecover.jpeg'
import hero1 from '../assets/hero1.jpeg'
import hero2 from '../assets/hero2.jpeg'
import hero3 from '../assets/hero3.jpeg'
import hero4 from '../assets/hero4.jpeg'
import hero5 from '../assets/hero5.jpeg'

export const useDataStore = defineStore('data', {
  state: () => ({
    heroSlides: [
  {
    image: hero1,
    alt: 'Philippine artisan crafting with traditional techniques'
  },
  {
    image: hero2,
    alt: 'Skilled weaver creating vibrant textiles on traditional loom'
  },
  {
    image: hero3,
    alt: 'Artisan workshop showcasing Southeast Asian craftsmanship'
  },
  {
    image: hero4,
    alt: 'Close-up of intricately woven natural materials'
  },
  {
    image: hero5,
    alt: 'Elegant handcrafted furniture in luxury interior setting'
  }
]as HeroSlide[],

    exhibitors: [
  { name: 'Master Woodcraft Studio', category: 'Furniture & Home', image: furniture1 },
  { name: 'Heritage Textile Collective', category: 'Fashion & Accessories', image: fashion1 },
  { name: 'Artisan Home Concepts', category: 'Gifts & Lifestyle', image: lifestyle1 },
  { name: 'Contemporary Weaving Co.', category: 'Furniture & Home', image: furniture2 },
  { name: 'Sustainable Fashion House', category: 'Fashion & Accessories', image: fashion2 },
  { name: 'Lifestyle Design Atelier', category: 'Gifts & Lifestyle', image: lifestyle2 },
  { name: 'Premium Furniture Collective', category: 'Furniture & Home', image: furniture3 },
  { name: 'Fashion Heritage House', category: 'Fashion & Accessories', image: fashion3 },
  { name: 'Modern Design Studio', category: 'Gifts & Lifestyle', image: lifestyle3 }
] as Exhibitor[],

    testimonials: [
  {
    quote: "Manila FAME gave us direct access to manufacturers we couldn't find elsewhere. The quality and consistency have exceeded our expectations for three consecutive seasons.",
    author: "Victoria Chen",
    company: "Luxe Import Collective",
    country: "Singapore",
    flag: "🇸🇬"
  },
  {
    quote: "We've built lasting partnerships with three exhibitors here. The transparent sourcing model and commitment to sustainable practices align perfectly with our brand values.",
    author: "James Richardson",
    company: "Ethical Interiors Ltd",
    country: "United Kingdom",
    flag: "🇬🇧"
  },
  {
    quote: "The caliber of craftsmanship and innovation we've witnessed is remarkable. This is our go-to event for discovering trending designs and verified suppliers.",
    author: "Sofia Bergström",
    company: "Nordic Design Imports",
    country: "Sweden",
    flag: "🇸🇪"
  },
  {
    quote: "Unlike other trade shows, Manila FAME offers genuine relationships with makers, not just catalog browsing. Our sourcing efficiency increased by 40% this year.",
    author: "Marcus Wilhelm",
    company: "European Lifestyle Brands",
    country: "Germany",
    flag: "🇩🇪"
  }
] as Testimonial[],

    benefits: [
  {
    title: "Source Directly from Exporters",
    description: "Engage face-to-face with verified Philippine manufacturers and artisans. Build long-term sourcing relationships without intermediaries cutting timelines and improving margins.",
    icon: Factory
  },
  {
    title: "Discover New Design Trends",
    description: "Be among the first to access collections shaped by global trends and deep cultural roots. Stay ahead of the competition with exclusive product previews.",
    icon: Sparkles
  },
  {
    title: "Sustainable & Ethical Craftsmanship",
    description: "Source responsibly made products that honor people, materials, and the environment. Partner with makers committed to fair trade and eco-conscious practices.",
    icon: Recycle
  },
  {
    title: "Exclusive Trade Access",
    description: "Gain entry to curated showcases, private previews, and industry-led conversations. Experience networking opportunities reserved for qualified international buyers.",
    icon: Key
  }
] as Benefit[],

    categories: [
  {
    title: "Furniture & Home",
    description: "Thoughtfully designed furniture and décor crafted from natural materials, blending tradition with modern living.",
    image: furniturecover
  },
  {
    title: "Fashion & Accessories",
    description: "Contemporary silhouettes and heritage techniques translated into export-ready fashion pieces.",
    image: fashioncover
  },
  {
    title: "Gifts & Lifestyle",
    description: "Distinctive products that tell authentic Filipino stories through form and function.",
    image: lifestylecover
  }
] as Category[]
  }),

  // getters: {
  //   // just for future reference, If need to filter exhibitors by category later
  //   furnitureExhibitors: (state) => state.exhibitors.filter(e => e.category === 'Furniture & Home')
  // }
})
