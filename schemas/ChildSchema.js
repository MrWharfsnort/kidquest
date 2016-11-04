/* jshint esversion: 6 */

module.exports = (mongoose) => {
    var ChildSchema = new mongoose.Schema({
        name: String,
        parent: String,
        activeQuests: [String],
        hero: {
            name: String,
            inventory: [String],
            credits: Number,
            xp: Number,
            strength: Number,
            wisdom: Number,
            kindness: Number,
            courage: Number,
            responsibility: Number
        }
    });

    var Child = mongoose.model('Child', ChildSchema);

    return Child;
};
