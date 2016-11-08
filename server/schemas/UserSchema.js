/* jshint esversion: 6 */

module.exports = (mongoose, Child) => {
    var UserSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        type: String,
        children: [String]
    });

    var User = mongoose.model('User', UserSchema);

    return User;
};