import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface ReservationData {
  date: string;
  time: string;
  name: string;
  phone: string;
  guests: number;
}

export default function ReservationSystem() {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key);
  const utils = trpc.useUtils();
  const createReservation = trpc.reservations.create.useMutation({
    onSuccess: () => {
      // Invalidate availability query to refetch updated data
      if (selectedDate) {
        utils.reservations.getAvailability.invalidate({ date: selectedDate });
      }
    },
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { data: availability = {} } = trpc.reservations.getAvailability.useQuery(
    { date: selectedDate || '' },
    { enabled: !!selectedDate }
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<ReservationData>({
    date: '',
    time: '',
    name: '',
    phone: '',
    guests: 2,
  });
  const [submitted, setSubmitted] = useState(false);

  // Generate time slots (75 minutes each, from 12:00 to 21:00)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 12; hour < 21; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 75) {
        if (hour === 20 && minutes > 0) break; // Don't go past 20:00
        const time = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getAvailabilityStatus = (time: string) => {
    const booked = (availability as Record<string, number>)[time] || 0;
    const available = 20 - booked;

    if (available <= 0) return { status: 'full', color: 'bg-red-500', label: 'Full' };
    if (available <= 5) return { status: 'orange', color: 'bg-orange-500', label: `${available} left` };
    if (available <= 10) return { status: 'yellow', color: 'bg-yellow-500', label: `${available} left` };
    return { status: 'available', color: 'bg-green-500', label: `${available} left` };
  };

  // Generate calendar days for current month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (day: number | null) => {
    if (!day) return;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setFormData({ ...formData, date: dateStr });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData({ ...formData, time });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone) {
      toast.error(language === 'lv' ? 'Lūdzu, aizpildiet visus laukus' : 'Please fill in all fields');
      return;
    }

    try {
      const result = await createReservation.mutateAsync({
        date: selectedDate,
        time: selectedTime,
        name: formData.name,
        phone: formData.phone,
        guests: Number(formData.guests),
      });

      toast.success(result.message);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({ date: '', time: '', name: '', phone: '', guests: 2 });
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit reservation';
      toast.error(errorMessage);
      console.error('Reservation error:', error);
    }
  };

  const monthNames = language === 'lv'
    ? ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = language === 'lv'
    ? ['Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena', 'Svētdiena']
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const shortDayNames = language === 'lv'
    ? ['P', 'O', 'T', 'C', 'Pk', 'S', 'Sv']
    : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <section id='reservations' className='py-20 md:py-32 bg-secondary/30'>
      <div className='container mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl md:text-5xl font-serif font-bold text-foreground mb-4'>
            {language === 'lv' ? 'Rezervējiet Galdu' : 'Make a Reservation'}
          </h2>
          <div className='w-16 h-1 bg-primary mx-auto rounded-full' />
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8'>
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className='p-6 bg-card'>
              <div className='flex items-center justify-between mb-6'>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className='p-2 hover:bg-secondary rounded-lg transition'
                >
                  <ChevronLeft className='w-5 h-5' />
                </button>
                <h3 className='font-serif font-bold text-lg'>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className='p-2 hover:bg-secondary rounded-lg transition'
                >
                  <ChevronRight className='w-5 h-5' />
                </button>
              </div>

              {/* Day names */}
              <div className='grid grid-cols-7 gap-2 mb-4'>
                {shortDayNames.map((day) => (
                  <div key={day} className='text-center text-sm font-semibold text-muted-foreground'>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className='grid grid-cols-7 gap-2'>
                {calendarDays.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDateSelect(day)}
                    disabled={!day}
                    className={`p-2 rounded-lg text-sm font-medium transition ${
                      !day
                        ? 'text-muted-foreground/30 cursor-default'
                        : selectedDate === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Time Slots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className='p-6 bg-card'>
              <h3 className='font-serif font-bold text-lg mb-4 flex items-center gap-2'>
                <Clock className='w-5 h-5 text-primary' />
                {language === 'lv' ? 'Laiks' : 'Time'}
              </h3>
              <div className='grid grid-cols-2 gap-3 max-h-96 overflow-y-auto'>
                {timeSlots.map((time) => {
                  const status = getAvailabilityStatus(time);
                  const isDisabled = status.status === 'full';
                  return (
                    <button
                      key={time}
                      onClick={() => !isDisabled && handleTimeSelect(time)}
                      disabled={isDisabled}
                      className={`p-3 rounded-lg text-sm font-medium transition ${
                        isDisabled
                          ? 'bg-red-100 text-red-700 cursor-not-allowed opacity-50'
                          : selectedTime === time
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80 text-foreground'
                      }`}
                    >
                      <div className='flex flex-col gap-1'>
                        <span>{time}</span>
                        <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                          <div
                            className={`h-full ${status.color}`}
                            style={{ width: `${Math.min((((availability as Record<string, number>)[time] || 0) / 20) * 100, 100)}%` }}
                          />
                        </div>
                        <span className='text-xs opacity-75'>{status.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className='text-xs text-muted-foreground mt-4'>
                {language === 'lv' ? 'Katrs laika slots ir 75 minūtes' : 'Each time slot is 75 minutes'}
              </p>
            </Card>
          </motion.div>

          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className='p-6 bg-card'>
              <h3 className='font-serif font-bold text-lg mb-4 flex items-center gap-2'>
                <Users className='w-5 h-5 text-primary' />
                {language === 'lv' ? 'Jūsu Informācija' : 'Your Information'}
              </h3>

              {submitted ? (
                <div className='text-center py-8'>
                  <div className='text-4xl mb-4'>✓</div>
                  <p className='text-primary font-semibold'>
                    {language === 'lv' ? 'Rezervācija saņemta!' : 'Reservation received!'}
                  </p>
                  <p className='text-sm text-muted-foreground mt-2'>
                    {language === 'lv' ? 'Mēs jums drīz piezvanīsim' : 'We will call you soon'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      {language === 'lv' ? 'Vārds' : 'Name'}
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder={language === 'lv' ? 'Jūsu vārds' : 'Your name'}
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      {language === 'lv' ? 'Tālrunis' : 'Phone'}
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder={language === 'lv' ? '+371 XX XXX XXX' : '+371 XX XXX XXX'}
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      {language === 'lv' ? 'Viesi' : 'Guests'}
                    </label>
                    <select
                      name='guests'
                      value={formData.guests}
                      onChange={handleFormChange}
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {language === 'lv' ? (num === 1 ? 'viesis' : 'viesi') : (num === 1 ? 'guest' : 'guests')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='pt-4'>
                  <Button
                    type='submit'
                    className='w-full button-organic'
                    disabled={!selectedDate || !selectedTime || createReservation.isPending}
                  >
                    {createReservation.isPending ? (language === 'lv' ? 'Sūta...' : 'Submitting...') : (language === 'lv' ? 'Rezervēt' : 'Reserve')}
                  </Button>
                  </div>

                  {selectedDate && selectedTime && (
                    <div className='p-3 bg-primary/10 rounded-lg text-sm'>
                      <p className='text-foreground font-medium'>
                        {language === 'lv' ? 'Izvēlētais laiks:' : 'Selected time:'}
                      </p>
                      <p className='text-muted-foreground'>
                        {selectedDate} {language === 'lv' ? 'plkst.' : 'at'} {selectedTime}
                      </p>
                    </div>
                  )}
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
