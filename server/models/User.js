import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    username: { type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'please enter a valid email']
    },
    hash: { type: String },
    expiryTime: { type: Date }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, callBack) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
export default User;

