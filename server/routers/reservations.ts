import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { notifyOwner } from '../_core/notification';
import { createReservation, getAvailabilityForDate } from '../db';

const reservationSchema = z.object({
  date: z.string().describe('Reservation date in YYYY-MM-DD format'),
  time: z.string().describe('Reservation time in HH:MM format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(5, 'Phone number must be valid'),
  guests: z.number().min(1).max(8, 'Guests must be between 1 and 8'),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const reservationsRouter = router({
  create: publicProcedure
    .input(reservationSchema)
    .mutation(async ({ input }) => {
      try {
        // Check availability first
        const availability = await getAvailabilityForDate(input.date);
        const bookedGuests = availability[input.time] || 0;
        const totalGuests = bookedGuests + input.guests;

        if (totalGuests > 20) {
          throw new Error('This time slot is fully booked. Please select another time.');
        }

        // Save reservation to database
        // Parse the date string and create a UTC date to avoid timezone issues
        const [year, month, day] = input.date.split('-').map(Number);
        const utcDate = new Date(Date.UTC(year, month - 1, day));
        
        await createReservation({
          reservationDate: utcDate,
          reservationTime: input.time,
          guestName: input.name,
          guestPhone: input.phone,
          guestCount: input.guests,
          status: 'pending',
        });

        // Format the reservation details for notification
        const reservationDetails = `
Date: ${input.date}
Time: ${input.time}
Guest Name: ${input.name}
Phone: ${input.phone}
Number of Guests: ${input.guests}
        `.trim();

        // Send notification to owner
        const notified = await notifyOwner({
          title: '🍽️ New Reservation Request from Nirvana Website',
          content: `A new reservation has been submitted:\n\n${reservationDetails}`,
        });

        if (!notified) {
          console.warn('[Reservations] Failed to notify owner, but reservation was recorded');
        }

        return {
          success: true,
          message: 'Reservation submitted successfully. We will contact you shortly.',
          reservation: {
            date: input.date,
            time: input.time,
            name: input.name,
            guests: input.guests,
          },
        };
      } catch (error) {
        console.error('[Reservations] Error processing reservation:', error);
        throw error instanceof Error ? error : new Error('Failed to process reservation. Please try again.');
      }
    }),

  getAvailability: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ input }) => {
      try {
        const availability = await getAvailabilityForDate(input.date);
        return availability;
      } catch (error) {
        console.error('[Reservations] Error fetching availability:', error);
        return {};
      }
    }),
});
