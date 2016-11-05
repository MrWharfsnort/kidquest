/* jshint esversion: 6 */

module.exports = (mongoose, User) => {
    var ChildSchema = new mongoose.Schema({
        name: String,
        password: String,
        parent: String,
        activeQuests: [String],
        hero: {
            name: String,
            avatar: String,
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

    ChildSchema.methods.findById = function(child) {
        return this.model('Child').find({ _id: this._id }, child);
    };

    return Child;
};
