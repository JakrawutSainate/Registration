const User = require('../../../models/user');
const Config = require('../../../models/config');

module.exports = new class UserController {

    // GET: List all users
    // GET: List all users
    async getAllUsers(req, res) {
        try {
            const { search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

            // Build Filter
            const filter = {};
            if (search) {
                const searchRegex = new RegExp(search, 'i');
                filter.$or = [
                    { firstName: searchRegex },
                    { lastName: searchRegex },
                    { phone: searchRegex }
                ];
            }

            // Build Sort
            const sort = {};
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

            const users = await User.find(filter).sort(sort);
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // POST: Register User (Check seats first)
    async registerUser(req, res) {
        try {
            // 1. Get Total Seats
            const seatConfig = await Config.findOne({ key: 'total_seats' });
            const totalSeats = seatConfig ? seatConfig.value : 0;

            // 2. Get Current Count
            const usedSeats = await User.countDocuments();

            // 3. Check Availability
            if (usedSeats >= totalSeats) {
                return res.status(400).json({ error: "Registration Full" });
            }

            // 4. Create User
            const { firstName, lastName, phone } = req.body;
            const newUser = await User.create({ firstName, lastName, phone });

            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // GET: Dashboard Stats
    async getStats(req, res) {
        try {
            const seatConfig = await Config.findOne({ key: 'total_seats' });
            const totalSeats = seatConfig ? seatConfig.value : 0;
            const usedSeats = await User.countDocuments();

            res.json({
                totalSeats,
                usedSeats,
                remainingSeats: Math.max(0, totalSeats - usedSeats)
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
