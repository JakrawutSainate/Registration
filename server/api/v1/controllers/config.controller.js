const Config = require('../../../models/config');

module.exports = new class ConfigController {

    // GET: Get Config by Key (Internal helper or API)
    async getConfig(req, res) {
        try {
            const { key } = req.params;
            const config = await Config.findOne({ key }) || { key, value: 0 };
            res.json(config);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // POST: Set Config
    async setConfig(req, res) {
        try {
            const { key, value } = req.body;
            const config = await Config.findOneAndUpdate(
                { key },
                { value },
                { upsert: true, new: true }
            );
            res.json(config);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
