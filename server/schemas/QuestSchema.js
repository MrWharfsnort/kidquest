/* jshint esversion: 6 */

module.exports = (mongoose, LootItem) => {
    var QuestSchema = new mongoose.Schema({
        title: String,
        description: String,
        parent: String,
        isAccepted: Boolean,
        isAvailable: Boolean,
        isCompleted: Boolean,
        isVerified: Boolean,
        lootTable: [String],
        rewards: {
            xp: Number,
            credits: Number,
            strength: Number,
            wisdom: Number,
            kindness: Number,
            courage: Number,
            responsibility: Number
        }
    });

    var Quest = mongoose.model('Quest', QuestSchema);

    return Quest;
};
