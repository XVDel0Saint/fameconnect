import type { Component } from 'vue'

export interface HeroSlide { image: string; alt: string }
export interface Exhibitor { name: string; category: string; image: string }
export interface Testimonial { quote: string; author: string; company: string; country: string; flag: string }
export interface Benefit { title: string; description: string; icon: Component }
export interface Category { title: string; description: string; image: string }
