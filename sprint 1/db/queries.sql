-- US_SQL_008: Retrieve detailed booking information, including passenger names, based on the user's booking ID.
-- Note: Replace '1' with the actual booking_id you want to query.
SELECT
    b.booking_id,
    b.booking_date,
    t.train_name,
    t.train_number,
    tc.class_name,
    b.status,
    p.passenger_name,
    p.age,
    p.seat_number
FROM Bookings b
JOIN Trains t ON b.train_id = t.train_id
JOIN TrainClasses tc ON b.class_id = tc.class_id
JOIN Passengers p ON b.booking_id = p.booking_id
WHERE b.booking_id = 1;


-- US_SQL_009: Generate a report showing the occupancy status of each train.
-- This query calculates occupancy for a specific travel date.
-- Note: Replace '2024-08-01' with the desired date.
SELECT
    t.train_number,
    t.train_name,
    t.departure_time,
    t.total_capacity AS total_train_capacity,
    IFNULL(SUM(b.number_of_passengers), 0) AS booked_seats,
    (t.total_capacity - IFNULL(SUM(b.number_of_passengers), 0)) AS available_seats,
    (IFNULL(SUM(b.number_of_passengers), 0) * 100.0 / t.total_capacity) AS occupancy_percentage
FROM Trains t
LEFT JOIN Bookings b ON t.train_id = b.train_id AND DATE(t.departure_time) = '2024-08-01'
GROUP BY t.train_id
ORDER BY t.train_number;


-- US_SQL_010: List available trains between specified origin and destination stations, along with their seat availability.
-- Note: Replace 'New Delhi' and 'Mumbai' with the desired origin and destination.
-- This query shows total availability on the train, not by class. A more detailed query would be needed for class-specific availability.
SELECT
    t.train_number,
    t.train_name,
    t.origin,
    t.destination,
    t.departure_time,
    tc.class_name,
    tc.fare,
    (tc.total_seats - IFNULL(SUM(b.number_of_passengers), 0)) AS available_seats
FROM Trains t
JOIN TrainClasses tc ON t.train_id = tc.train_id
LEFT JOIN Bookings b ON tc.class_id = b.class_id AND b.status = 'CONFIRMED'
WHERE t.origin = 'New Delhi' AND t.destination = 'Mumbai'
GROUP BY t.train_id, tc.class_id
HAVING available_seats > 0
ORDER BY t.departure_time; 