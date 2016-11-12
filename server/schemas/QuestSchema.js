/* jshint esversion: 6 */

module.exports = (mongoose, LootItem) => {
    var QuestSchema = new mongoose.Schema({
        title: String,
        description: String,
        parent: String,
        isAccepted: Boolean,
        isCompleted: Boolean,
        lootTable: [String]
    });

    var Quest = mongoose.model('Quest', QuestSchema);

    return Quest;
};
