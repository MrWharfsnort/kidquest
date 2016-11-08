/* jshint esversion: 6 */

module.exports = (mongoose) => {
    var LootItemSchema = new mongoose.Schema({
        item: String,
        description: String,
        xpValue: Number,
        currencyValue: Number,
        image: String
    });

    var LootItem = mongoose.model('LootItem', LootItemSchema);

    return LootItem;
};
