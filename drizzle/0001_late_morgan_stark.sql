CREATE TABLE `reservations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reservationDate` date NOT NULL,
	`reservationTime` varchar(5) NOT NULL,
	`guestName` varchar(255) NOT NULL,
	`guestPhone` varchar(20) NOT NULL,
	`guestCount` int NOT NULL,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reservations_id` PRIMARY KEY(`id`)
);
