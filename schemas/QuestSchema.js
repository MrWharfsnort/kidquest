/* jshint esversion: 6 */

module.exports = (mongoose, User) => {
    var QuestSchema = new mongoose.Schema({
        title: String,
        description: String,
        isAccepted: Boolean,
        isCompleted: Boolean,
        lootTable: [String]
    });

    var Quest = mongoose.model('Quest', QuestSchema);

    return Quest;
};
