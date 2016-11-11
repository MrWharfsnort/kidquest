/* jshint esversion: 6 */

module.exports = (mongoose, User) => {
    var ChildSchema = new mongoose.Schema({
        name: {
            first: String,
            last: String
        },
        password: String,
        parent: String,
        activeQuests: [String],
        hero: {
            name: String,
            inventory: [String],
            credits: Number,
            level: Number,
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
