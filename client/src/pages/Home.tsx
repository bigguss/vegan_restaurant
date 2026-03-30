import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Star, MapPin, Clock, Phone } from 'lucide-react';

/**
 * Design Philosophy: Organic Minimalism with Botanical Elegance
 * - Sage green primary, warm whites, terracotta accents
 * - Playfair Display for headings, Inter for body
 * - Generous whitespace, soft shadows, gentle animations
 * - Focus on premium, authentic plant-based dining experience
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');

  const menuItems = [
    {
      id: 1,
      name: 'Buddha Bowl',
      category: 'mains',
      description: 'Quinoa, roasted chickpeas, avocado, tahini drizzle, fresh vegetables',
      price: '$16',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/hero-Buddha-bowl-FzinT5wesLzSCokA38ikoq.webp',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Cashew Pasta',
      category: 'mains',
      description: 'Creamy cashew sauce, fresh basil, cherry tomatoes, pine nuts',
      price: '$18',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/menu-dish-pasta-GvgRqYGEj8SWE8Ej6ahiiz.webp',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Seasonal Salad',
      category: 'salads',
      description: 'Mixed greens, roasted beets, candied walnuts, citrus vinaigrette',
      price: '$14',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/menu-dish-salad-nDQrzBj3aAyYzotXV5woB.webp',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Chocolate Mousse',
      category: 'desserts',
      description: 'Vegan chocolate mousse with fresh berries and mint',
      price: '$9',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/menu-dish-dessert-caFtUe8qeDoqknTXaLeH7T.webp',
      rating: 4.9,
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      text: 'Absolutely incredible! The food is fresh, creative, and so flavorful. Best vegan restaurant in the city.',
      date: '2 weeks ago',
    },
    {
      id: 2,
      name: 'James L.',
      rating: 5,
      text: 'Finally found a place where vegan food is taken seriously. Every dish is a masterpiece.',
      date: '1 month ago',
    },
    {
      id: 3,
      name: 'Emma T.',
      rating: 4,
      text: 'Beautiful ambiance, friendly staff, and delicious food. Highly recommend for any occasion.',
      date: '3 weeks ago',
    },
  ];

  const filteredMenu = activeTab === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-border'>
        <div className='container mx-auto flex justify-between items-center h-16'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center'>
              <span className='text-primary-foreground text-lg font-serif font-bold'>V</span>
            </div>
            <span className='font-serif text-xl font-bold text-foreground'>Verdant</span>
          </div>
          
          <div className='hidden md:flex gap-8'>
            <a href='#story' className='text-sm font-medium text-foreground hover:text-primary transition-colors'>Our Story</a>
            <a href='#menu' className='text-sm font-medium text-foreground hover:text-primary transition-colors'>Menu</a>
            <a href='#reservations' className='text-sm font-medium text-foreground hover:text-primary transition-colors'>Reservations</a>
            <a href='#reviews' className='text-sm font-medium text-foreground hover:text-primary transition-colors'>Reviews</a>
          </div>

          <Button variant='outline' size='sm' className='hidden md:inline-flex'>
            Reserve
          </Button>
        </div>
      </nav>

      {/* Hero Section with Scroll Expansion */}
      <ScrollExpandMedia
        mediaType='image'
        mediaSrc='https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/hero-Buddha-bowl-FzinT5wesLzSCokA38ikoq.webp'
        bgImageSrc='https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/hero-background-botanical-Nxkzgd7zyE826NnJzdhNA4.webp'
        title='Verdant Dining'
        date='Premium Plant-Based Cuisine'
        scrollToExpand='Scroll to explore'
      />

      {/* Our Story Section */}
      <section id='story' className='py-20 md:py-32 bg-background'>
        <div className='container mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className='text-4xl md:text-5xl font-serif font-bold text-foreground mb-6'>
                Our <span className='text-primary'>Story</span>
              </h2>
              <div className='organic-divider mb-8' />
              <p className='text-lg text-muted-foreground mb-4 leading-relaxed'>
                At Verdant, we believe that plant-based cuisine deserves the same respect and creativity as any fine dining experience. Founded in 2020, our restaurant celebrates the incredible flavors and textures that nature provides.
              </p>
              <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>
                Every dish is crafted with intention, sourcing the freshest organic ingredients from local farmers. We're not just serving food—we're sharing a philosophy of sustainability, health, and culinary excellence.
              </p>
              <Button className='button-organic'>Learn More</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='relative'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-3xl' />
              <img
                src='https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/hero-background-botanical-Nxkzgd7zyE826NnJzdhNA4.webp'
                alt='Our Story'
                className='relative rounded-2xl shadow-lg w-full'
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id='menu' className='py-20 md:py-32 bg-white'>
        <div className='container mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl md:text-5xl font-serif font-bold text-foreground mb-4'>
              Our Menu
            </h2>
            <div className='organic-divider mb-8 max-w-xs mx-auto' />
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Carefully curated dishes that celebrate plant-based ingredients with culinary artistry
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className='flex justify-center gap-4 mb-12 flex-wrap'>
            {['all', 'mains', 'salads', 'desserts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-foreground hover:bg-secondary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className='grid md:grid-cols-2 gap-8'>
            {filteredMenu.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className='card-hover overflow-hidden bg-white border border-border'>
                  <div className='relative h-64 overflow-hidden'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                  <div className='p-6'>
                    <div className='flex justify-between items-start mb-3'>
                      <h3 className='text-xl font-serif font-semibold text-foreground'>
                        {item.name}
                      </h3>
                      <span className='text-lg font-semibold text-primary'>
                        {item.price}
                      </span>
                    </div>
                    <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
                      {item.description}
                    </p>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(item.rating) ? 'fill-accent text-accent' : 'text-muted'}
                        />
                      ))}
                      <span className='text-sm text-muted-foreground ml-2'>
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservations Section */}
      <section id='reservations' className='py-20 md:py-32 bg-background'>
        <div className='container mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className='text-4xl md:text-5xl font-serif font-bold text-foreground mb-6'>
                Make a <span className='text-primary'>Reservation</span>
              </h2>
              <div className='organic-divider mb-8' />
              
              <div className='space-y-6'>
                <div className='flex gap-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <MapPin className='text-primary' size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-1'>Location</h3>
                    <p className='text-muted-foreground'>123 Green Street, Botanical District</p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <Clock className='text-primary' size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-1'>Hours</h3>
                    <p className='text-muted-foreground'>Tue-Thu: 5pm-10pm</p>
                    <p className='text-muted-foreground'>Fri-Sat: 5pm-11pm</p>
                    <p className='text-muted-foreground'>Sun: 5pm-9pm</p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <Phone className='text-primary' size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-1'>Contact</h3>
                    <p className='text-muted-foreground'>(555) 123-4567</p>
                    <p className='text-muted-foreground'>hello@verdantdining.com</p>
                  </div>
                </div>
              </div>

              <Button className='button-organic mt-8 w-full md:w-auto'>
                Book Your Table
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='relative'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl blur-3xl' />
              <Card className='relative bg-white border border-border p-8'>
                <h3 className='text-2xl font-serif font-semibold text-foreground mb-6'>
                  Quick Reservation
                </h3>
                <form className='space-y-4'>
                  <input
                    type='text'
                    placeholder='Your Name'
                    className='w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <input
                    type='email'
                    placeholder='Email Address'
                    className='w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <input
                    type='tel'
                    placeholder='Phone Number'
                    className='w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <input
                    type='date'
                    className='w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <select className='w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'>
                    <option>Number of Guests</option>
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                  <Button className='button-organic w-full'>
                    Reserve Now
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id='reviews' className='py-20 md:py-32 bg-white'>
        <div className='container mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl md:text-5xl font-serif font-bold text-foreground mb-4'>
              Guest Reviews
            </h2>
            <div className='organic-divider mb-8 max-w-xs mx-auto' />
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Hear from our community of plant-based food enthusiasts
            </p>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-8'>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className='card-hover bg-white border border-border p-8'>
                  <div className='flex gap-1 mb-4'>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} className='fill-accent text-accent' />
                    ))}
                  </div>
                  <p className='text-foreground mb-6 leading-relaxed italic'>
                    "{review.text}"
                  </p>
                  <div className='border-t border-border pt-4'>
                    <p className='font-semibold text-foreground'>{review.name}</p>
                    <p className='text-sm text-muted-foreground'>{review.date}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-foreground text-primary-foreground py-12'>
        <div className='container mx-auto'>
          <div className='grid md:grid-cols-4 gap-8 mb-8'>
            <div>
              <h3 className='font-serif text-lg font-bold mb-4'>Verdant</h3>
              <p className='text-sm opacity-80'>Premium plant-based dining experience</p>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Hours</h4>
              <ul className='text-sm opacity-80 space-y-1'>
                <li>Tue-Thu: 5pm-10pm</li>
                <li>Fri-Sat: 5pm-11pm</li>
                <li>Sun: 5pm-9pm</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Contact</h4>
              <ul className='text-sm opacity-80 space-y-1'>
                <li>(555) 123-4567</li>
                <li>hello@verdantdining.com</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Follow</h4>
              <ul className='text-sm opacity-80 space-y-1'>
                <li><a href='#' className='hover:opacity-100 transition'>Instagram</a></li>
                <li><a href='#' className='hover:opacity-100 transition'>Facebook</a></li>
                <li><a href='#' className='hover:opacity-100 transition'>Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className='border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80'>
            <p>&copy; 2024 Verdant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
