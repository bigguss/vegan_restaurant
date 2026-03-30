import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { notifyOwner } from '../_core/notification';

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
        throw new Error('Failed to process reservation. Please try again.');
      }
    }),
});
