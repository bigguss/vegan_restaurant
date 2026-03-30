import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Star, MapPin, Clock, Phone, ExternalLink } from 'lucide-react';

/**
 * Design Philosophy: Organic Minimalism with Botanical Elegance
 * - Sage green primary, warm whites, terracotta accents
 * - Playfair Display for headings, Inter for body
 * - Generous whitespace, soft shadows, gentle animations
 * - Focus on premium, authentic plant-based dining experience
 * 
 * Restaurant: Nirvana - Family-run plant-based food cafe in Riga
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');

  const menuItems = [
    {
      id: 1,
      name: 'Buddha Bowl',
      category: 'mains',
      description: 'Quinoa, roasted chickpeas, avocado, tahini drizzle, fresh vegetables',
      price: '€12',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/hero-Buddha-bowl-FzinT5wesLzSCokA38ikoq.webp',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Cashew Pasta',
      category: 'mains',
      description: 'Creamy cashew sauce, fresh basil, cherry tomatoes, pine nuts',
      price: '€14',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/menu-dish-pasta-GvgRqYGEj8SWE8Ej6ahiiz.webp',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Seasonal Salad',
      category: 'salads',
      description: 'Mixed greens, roasted beets, candied walnuts, citrus vinaigrette',
      price: '€11',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/menu-dish-salad-nDQrzBj3aAyYzotXV5woB.webp',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Chocolate Mousse',
      category: 'desserts',
      description: 'Vegan chocolate mousse with fresh berries and mint',
      price: '€8',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/menu-dish-dessert-caFtUe8qeDoqknTXaLeH7T.webp',
      rating: 4.9,
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Ahimsa Kerp',
      rating: 5,
      text: 'This little slice of Nirvana really lives up to the name. There\'s a cozy atmosphere, chill music, great tea, awesome gluten free cakes, and rather huge portions.',
      date: '1 month ago',
      source: 'Google',
    },
    {
      id: 2,
      name: 'Madeleine Soukup',
      rating: 5,
      text: 'This place is AMAZING, words cannot describe how much I love it. They have three daily options for main dishes and you can also mix it, and several cake options.',
      date: '8 months ago',
      source: 'Google',
    },
    {
      id: 3,
      name: 'Aitalina Struchkova',
      rating: 5,
      text: 'I liked Nirvana before for their conscious approach towards nutrition, spiritual ambiance, and overall quality offering of food. Highly recommend!',
      date: '6 months ago',
      source: 'Google',
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
          <a href='#' className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
            <img
              src='https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/nirvana-logo-SRDMJWpBvmMeNVUz2dUWBY.webp'
              alt='Nirvana Logo'
              className='w-10 h-10'
            />
            <span className='font-serif text-xl font-bold text-foreground hidden sm:inline'>Nirvana</span>
          </a>
          
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
        title='Nirvana'
        date='Family-Run Plant-Based Cuisine'
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
                Nirvana is a family-run plant-based food café dedicated to conscious nutrition and spiritual ambiance. Located in the heart of Riga, we celebrate the incredible potential of plant-based cuisine with thoughtful preparation and premium ingredients.
              </p>
              <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>
                We serve both cooked and raw food options, offering three daily main dishes that you can customize to your preferences. Every dish is crafted with intention, respecting both your health and the environment. Our cozy atmosphere, chill music, and carefully selected teas create the perfect setting for mindful dining.
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
              Three daily options for main dishes with the flexibility to mix and customize. Explore our selection of thoughtfully prepared plant-based meals.
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

          {/* Order Online Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='mt-16 text-center'
          >
            <p className='text-muted-foreground mb-6'>Order online through our partners:</p>
            <div className='flex gap-4 justify-center flex-wrap'>
              <a
                href='https://wolt.com'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-md transition-all hover:scale-105'
              >
                Wolt <ExternalLink size={16} />
              </a>
              <a
                href='https://bolt.eu'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg hover:shadow-md transition-all hover:scale-105'
              >
                Bolt Food <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
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
                Visit <span className='text-primary'>Nirvana</span>
              </h2>
              <div className='organic-divider mb-8' />
              
              <div className='space-y-6'>
                <div className='flex gap-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <MapPin className='text-primary' size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-1'>Location</h3>
                    <p className='text-muted-foreground'>Skolas iela 22, Centra rajons, Riga, LV-1010</p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <Clock className='text-primary' size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-1'>Hours</h3>
                    <p className='text-muted-foreground'>Tue-Sun: 12:00 PM - 6:00 PM</p>
                    <p className='text-muted-foreground text-sm'>Closed Mondays</p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <Phone className='text-primary' size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-1'>Contact</h3>
                    <p className='text-muted-foreground'>+371 24 225 312</p>
                    <p className='text-muted-foreground text-sm'>
                      <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>
                        View Menu on Facebook
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 p-6 bg-white rounded-lg border border-border'>
                <p className='text-sm text-muted-foreground mb-4'>
                  <strong>Price Range:</strong> €10-15 per person
                </p>
                <p className='text-sm text-muted-foreground'>
                  <strong>Service Options:</strong> Outdoor seating, Vegan options, Wi-Fi
                </p>
              </div>

              <Button className='button-organic mt-8 w-full md:w-auto'>
                Call to Reserve
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
                  Quick Info
                </h3>
                <div className='space-y-4'>
                  <div>
                    <p className='text-sm font-semibold text-muted-foreground mb-2'>GOOGLE RATING</p>
                    <div className='flex items-center gap-2'>
                      <div className='flex gap-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} className='fill-accent text-accent' />
                        ))}
                      </div>
                      <span className='font-bold text-foreground'>4.8/5</span>
                    </div>
                    <p className='text-xs text-muted-foreground mt-1'>392 reviews</p>
                  </div>
                  
                  <div className='border-t border-border pt-4'>
                    <p className='text-sm font-semibold text-muted-foreground mb-2'>TOTAL REVIEWS</p>
                    <p className='text-2xl font-bold text-primary'>4,839+</p>
                  </div>

                  <div className='border-t border-border pt-4'>
                    <p className='text-sm font-semibold text-muted-foreground mb-2'>DESCRIPTION</p>
                    <p className='text-sm text-foreground italic'>
                      "Family run plant-based food Cafe, serves also Raw food."
                    </p>
                  </div>
                </div>
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
                    <p className='text-xs text-primary font-medium mt-1'>From {review.source}</p>
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
              <div className='flex items-center gap-2 mb-4'>
                <img
                  src='https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/nirvana-logo-SRDMJWpBvmMeNVUz2dUWBY.webp'
                  alt='Nirvana'
                  className='w-8 h-8'
                />
                <h3 className='font-serif text-lg font-bold'>Nirvana</h3>
              </div>
              <p className='text-sm opacity-80'>Family-run plant-based dining experience in Riga</p>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Hours</h4>
              <ul className='text-sm opacity-80 space-y-1'>
                <li>Tue-Sun: 12:00 PM - 6:00 PM</li>
                <li>Closed Mondays</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Contact</h4>
              <ul className='text-sm opacity-80 space-y-1'>
                <li>+371 24 225 312</li>
                <li>Skolas iela 22, Riga</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Order Online</h4>
              <ul className='text-sm opacity-80 space-y-1'>
                <li><a href='https://wolt.com' target='_blank' rel='noopener noreferrer' className='hover:opacity-100 transition'>Wolt</a></li>
                <li><a href='https://bolt.eu' target='_blank' rel='noopener noreferrer' className='hover:opacity-100 transition'>Bolt Food</a></li>
                <li><a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='hover:opacity-100 transition'>Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className='border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80'>
            <p>&copy; 2024 Nirvana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
