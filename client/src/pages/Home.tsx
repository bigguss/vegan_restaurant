import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Star, MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getTranslation } from '@/lib/translations';

/**
 * Design Philosophy: Organic Minimalism with Botanical Elegance
 * - Sage green primary, warm whites, terracotta accents
 * - Playfair Display for headings, Inter for body
 * - Generous whitespace, soft shadows, gentle animations
 * - Focus on premium, authentic plant-based dining experience
 * 
 * Restaurant: Nirvana - Family-run plant-based food cafe in Riga
 * Language Support: Latvian (default) and English
 */

export default function Home() {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key);
  
  const [activeTab, setActiveTab] = useState('all');

  const menuItems = [
    {
      id: 1,
      nameKey: 'buddhaBowl' as const,
      descKey: 'buddhaBowlDesc' as const,
      category: 'mains',
      price: '€12',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/hero-Buddha-bowl-FzinT5wesLzSCokA38ikoq.webp',
      rating: 4.8,
    },
    {
      id: 2,
      nameKey: 'cashewPasta' as const,
      descKey: 'cashewPastaDesc' as const,
      category: 'mains',
      price: '€14',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/menu-dish-pasta-GvgRqYGEj8SWE8Ej6ahiiz.webp',
      rating: 4.9,
    },
    {
      id: 3,
      nameKey: 'seasonalSalad' as const,
      descKey: 'seasonalSaladDesc' as const,
      category: 'salads',
      price: '€11',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/menu-dish-salad-nDQrzBj3aAyYzotXV5woB.webp',
      rating: 4.7,
    },
    {
      id: 4,
      nameKey: 'chocolateMousse' as const,
      descKey: 'chocolateMousseDesc' as const,
      category: 'desserts',
      price: '€8',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/menu-dish-dessert-caFtUe8qeDoqknTXaLeH7T.webp',
      rating: 4.9,
    },
  ];

  const reviews = [
    {
      id: 1,
      nameKey: 'ahimsaKerp' as const,
      rating: 5,
      textKey: 'review1' as const,
      dateKey: 'oneMonthAgo' as const,
      source: 'Google',
    },
    {
      id: 2,
      nameKey: 'madeleineSoukup' as const,
      rating: 5,
      textKey: 'review2' as const,
      dateKey: 'eightMonthsAgo' as const,
      source: 'Google',
    },
    {
      id: 3,
      nameKey: 'aitalinaSruchkova' as const,
      rating: 5,
      textKey: 'review3' as const,
      dateKey: 'sixMonthsAgo' as const,
      source: 'Google',
    },
  ];

  const filteredMenu = activeTab === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  const categoryLabels = {
    all: t('all'),
    mains: t('mains'),
    salads: t('salads'),
    desserts: t('desserts'),
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-border'>
        <div className='container mx-auto flex justify-between items-center h-16'>
          <a href='#' className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
            <img
              src='https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/nirvana-logo-original_97edb355.png'
              alt='Nirvana Logo'
              className='w-10 h-10'
            />
            <span className='font-serif text-xl font-bold text-foreground hidden sm:inline'>{t('nirvana')}</span>
          </a>
          
          <div className='hidden md:flex gap-8'>
            <a href='#story' className='text-sm font-medium text-foreground hover:text-primary transition-colors'>{t('ourStory')}</a>
            <a href='#menu' className='text-sm font-medium text-foreground hover:text-primary transition-colors'>{t('menu')}</a>
            <a href='#reservations' className='text-sm font-medium text-foreground hover:text-primary transition-colors'>{t('reservations')}</a>
            <a href='#reviews' className='text-sm font-medium text-foreground hover:text-primary transition-colors'>{t('reviews')}</a>
          </div>

          <div className='flex items-center gap-3'>
            <LanguageSwitcher />
            <Button variant='outline' size='sm' className='hidden md:inline-flex'>
              {t('reserve')}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Scroll Expansion */}
      <ScrollExpandMedia
        mediaType='image'
        mediaSrc='https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/vegan-sushi-hero_7c2cd026.png'
        bgImageSrc='https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/hero-background-botanical-Nxkzgd7zyE826NnJzdhNA4.webp'
        title={t('nirvana')}
        date={t('familyRunPlantBased')}
        scrollToExpand={t('scrollToExplore')}
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
                {t('ourStoryTitle')} <span className='text-primary'>Story</span>
              </h2>
              <div className='organic-divider mb-8' />
              <p className='text-lg text-muted-foreground mb-4 leading-relaxed'>
                {t('ourStoryDescription')}
              </p>
              <p className='text-lg text-muted-foreground mb-6 leading-relaxed'>
                {t('ourStoryDescription2')}
              </p>
              <Button className='button-organic'>{t('learnMore')}</Button>
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
              {t('ourMenu')}
            </h2>
            <div className='organic-divider mb-8 max-w-xs mx-auto' />
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              {t('ourMenuDescription')}
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className='flex justify-center gap-4 mb-12 flex-wrap'>
            {(['all', 'mains', 'salads', 'desserts'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-foreground hover:bg-secondary'
                }`}
              >
                {categoryLabels[tab]}
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
                      alt={t(item.nameKey)}
                      className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                  <div className='p-6'>
                    <div className='flex justify-between items-start mb-3'>
                      <h3 className='text-xl font-serif font-semibold text-foreground'>
                        {t(item.nameKey)}
                      </h3>
                      <span className='text-lg font-semibold text-primary'>
                        {item.price}
                      </span>
                    </div>
                    <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
                      {t(item.descKey)}
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
            <p className='text-muted-foreground mb-6'>{t('orderOnlinePartners')}</p>
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
                {t('visitNirvana')}
              </h2>
              <div className='organic-divider mb-8' />
              
              <div className='space-y-6'>
                <div className='flex gap-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <MapPin className='text-primary' size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-1'>{t('location')}</h3>
                    <p className='text-muted-foreground'>{t('locationAddress')}</p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <Clock className='text-primary' size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-1'>{t('hours')}</h3>
                    <p className='text-muted-foreground'>{t('hoursTime')}</p>
                    <p className='text-muted-foreground text-sm'>{t('hoursClosed')}</p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <Phone className='text-primary' size={24} />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-1'>{t('contact')}</h3>
                    <p className='text-muted-foreground'>+371 24 225 312</p>
                    <p className='text-muted-foreground text-sm'>
                      <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>
                        {t('viewMenuOnFacebook')}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 p-6 bg-white rounded-lg border border-border'>
                <p className='text-sm text-muted-foreground mb-4'>
                  <strong>{t('priceRange')}:</strong> {t('priceRangeValue')}
                </p>
                <p className='text-sm text-muted-foreground'>
                  <strong>{t('serviceOptions')}:</strong> {t('serviceOptionsValue')}
                </p>
              </div>

              <Button className='button-organic mt-8 w-full md:w-auto'>
                {t('callToReserve')}
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
                  {t('quickInfo')}
                </h3>
                <div className='space-y-4'>
                  <div>
                    <p className='text-sm font-semibold text-muted-foreground mb-2'>{t('googleRating')}</p>
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
                    <p className='text-sm font-semibold text-muted-foreground mb-2'>{t('totalReviews')}</p>
                    <p className='text-2xl font-bold text-primary'>4,839+</p>
                  </div>

                  <div className='border-t border-border pt-4'>
                    <p className='text-sm font-semibold text-muted-foreground mb-2'>{t('description')}</p>
                    <p className='text-sm text-foreground italic'>
                      {t('descriptionText')}
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
              {t('guestReviews')}
            </h2>
            <div className='organic-divider mb-8 max-w-xs mx-auto' />
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              {t('guestReviewsDescription')}
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
                    "{t(review.textKey)}"
                  </p>
                  <div className='border-t border-border pt-4'>
                    <p className='font-semibold text-foreground'>{t(review.nameKey)}</p>
                    <p className='text-sm text-muted-foreground'>{t(review.dateKey)}</p>
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
                  src='https://d2xsxph8kpxj0f.cloudfront.net/310519663494463894/8wScqXQdf8HxcGQYC3hf4A/nirvana-logo-original_97edb355.png'
                  alt='Nirvana'
                  className='w-8 h-8'
                />
                <h3 className='font-serif text-lg font-bold'>{t('nirvana')}</h3>
              </div>
              <p className='text-sm opacity-80'>{t('familyRunDesc')}</p>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>{t('hours')}</h4>
              <ul className='text-sm opacity-80 space-y-1'>
                <li>{t('hoursTime')}</li>
                <li>{t('hoursClosed')}</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>{t('contact')}</h4>
              <ul className='text-sm opacity-80 space-y-1'>
                <li>+371 24 225 312</li>
                <li>{t('locationAddress')}</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>{t('orderOnline')}</h4>
              <ul className='text-sm opacity-80 space-y-1'>
                <li><a href='https://wolt.com' target='_blank' rel='noopener noreferrer' className='hover:opacity-100 transition'>Wolt</a></li>
                <li><a href='https://bolt.eu' target='_blank' rel='noopener noreferrer' className='hover:opacity-100 transition'>Bolt Food</a></li>
                <li><a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='hover:opacity-100 transition'>Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className='border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80'>
            <p>{t('allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
