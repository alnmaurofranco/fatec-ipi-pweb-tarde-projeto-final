const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: {
          type: DataTypes.STRING,
        },
        last_name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: "O Campo senha não pode estar vazio!",
            },
          },
        },
        phone: {
          type: DataTypes.NUMBER,
          defaultValue: 0,
        },
        cpf: {
          type: DataTypes.STRING,
          defaultValue: "0",
        },
        role: {
          type: DataTypes.STRING,
          defaultValue: "user",
        },
        avatar: {
          type: DataTypes.STRING,
          defaultValue: "avatar_default.jpg",
        },
        verified_email: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        password_changed_at: {
          type: DataTypes.DATE,
        },
        password_reset_token: DataTypes.STRING,
        password_reset_expires: DataTypes.DATE,
      },
      {
        sequelize,
        hooks: {
          beforeSave: async (user) => {
            if (user.password) {
              user.password = await bcrypt.hash(user.password, 12);
            }
            if (!user.changed("password") || user.isNewRecord) return true;
            user.password_changed_at = Date.now() - 1000;
          },
        },
      }
    );
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  changedPasswordAfter(JWTTimestamp) {
    if (this.password_changed_at) {
      const changedTimestamp = parseInt(this.password_changed_at / 1000, 10);
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  }
  createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.password_reset_token = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    console.log({ resetToken }, this.password_reset_token);
    this.password_reset_expires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  }
}

module.exports = User;
