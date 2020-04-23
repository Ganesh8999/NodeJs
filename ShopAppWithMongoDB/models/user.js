const getDb = require("../util/db").getDb;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items:[]}
    this._id = id;
  }

  addProductToCart(product) {
    // const cartProduct = this.cart.items.findIndex((cp) => {
    //   return cp._id === product._id;
    // });

    const updatedCart = {
      items: [{ productId: new ObjectId(product._id), quantity: 1 }],
    };
    const db = getDb();
    return db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      {
        $set: { cart: updatedCart },
      }
    );
  }
  static save() {
    const db = getDb();
    db.collection("user").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
